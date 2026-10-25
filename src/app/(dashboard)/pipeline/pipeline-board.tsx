"use client";

import Link from "next/link";

import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type ContactStatus = "NEW" | "CONTACTED" | "INTERESTED" | "CONVERTED";

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string | null;
  status: ContactStatus;
};

type PipelineBoardProps = {
  contacts: Contact[];
};

type UpdateStatusPayload = {
  contactId: string;
  status: ContactStatus;
};

type ApiError = {
  error?: string;
};

const columns: {
  id: ContactStatus;
  title: string;
}[] = [
  {
    id: "NEW",
    title: "New",
  },
  {
    id: "CONTACTED",
    title: "Contacted",
  },
  {
    id: "INTERESTED",
    title: "Interested",
  },
  {
    id: "CONVERTED",
    title: "Converted",
  },
];

export function PipelineBoard({ contacts }: PipelineBoardProps) {
  const [items, setItems] = useState(contacts);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const updateStatusMutation = useMutation({
    mutationFn: async ({ contactId, status }: UpdateStatusPayload) => {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data: Contact | ApiError = await response.json();

      if (!response.ok) {
        throw new Error(
          "error" in data
            ? (data.error ?? "Failed to update contact status.")
            : "Failed to update contact status.",
        );
      }

      return data as Contact;
    },

    onMutate: ({ contactId, status }) => {
      let previousStatus: ContactStatus | undefined;

      setItems((current) => {
        const contact = current.find((item) => item.id === contactId);
        previousStatus = contact?.status;

        return current.map((item) =>
          item.id === contactId ? { ...item, status } : item,
        );
      });

      return { contactId, previousStatus };
    },

    onError: (_error, _variables, context) => {
      if (!context || !context.previousStatus) return;

      setItems((current) =>
        current.map((contact) =>
          contact.id === context.contactId
            ? { ...contact, status: context.previousStatus! }
            : contact,
        ),
      );
    },

    onSuccess: (updatedContact) => {
      setItems((current) =>
        current.map((contact) =>
          contact.id === updatedContact.id
            ? {
                ...contact,
                status: updatedContact.status,
              }
            : contact,
        ),
      );
    },
  });

  function handleDragStart(event: DragStartEvent) {
    const contact = items.find((item) => item.id === String(event.active.id));

    setActiveContact(contact ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveContact(null);
    const { active, over } = event;

    if (!over || updateStatusMutation.isPending) {
      return;
    }

    const contactId = String(active.id);

    if (!columns.some((column) => column.id === over.id)) {
      return;
    }

    const newStatus = over.id as ContactStatus;

    const contact = items.find((item) => item.id === contactId);

    if (!contact || contact.status === newStatus) {
      return;
    }

    updateStatusMutation.mutate({
      contactId,
      status: newStatus,
    });
  }

  return (
    <DndContext
      id="pipeline-dnd-context"
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={() => setActiveContact(null)}
    >
      <div className="grid gap-4 lg:grid-cols-4">
        {columns.map((column) => (
          <PipelineColumn
            key={column.id}
            id={column.id}
            title={column.title}
            contacts={items.filter((contact) => contact.status === column.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeContact ? (
          <div className="rotate-2 rounded-lg border bg-background p-4 shadow-lg">
            <p className="font-medium">
              {activeContact.firstName} {activeContact.lastName}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {activeContact.email}
            </p>

            {activeContact.company && (
              <p className="mt-2 text-xs text-muted-foreground">
                {activeContact.company}
              </p>
            )}
          </div>
        ) : null}
      </DragOverlay>

      {updateStatusMutation.isPending && (
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          Saving pipeline changes...
        </p>
      )}

      {updateStatusMutation.error && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {updateStatusMutation.error.message}
        </p>
      )}
    </DndContext>
  );
}

type PipelineColumnProps = {
  id: ContactStatus;
  title: string;
  contacts: Contact[];
};

function PipelineColumn({ id, title, contacts }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-100 rounded-xl border bg-card p-4 transition-colors ${
        isOver ? "border-primary bg-muted/50" : ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>

        <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
          {contacts.length}
        </span>
      </div>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <PipelineCard key={contact.id} contact={contact} />
        ))}

        {contacts.length === 0 && (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            Drop contacts here
          </div>
        )}
      </div>
    </div>
  );
}

type PipelineCardProps = {
  contact: Contact;
};

function PipelineCard({ contact }: PipelineCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: contact.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-lg border bg-background p-4 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <Link
        href={`/contacts/${contact.id}`}
        className="block"
        onClick={(event) => {
          if (isDragging) {
            event.preventDefault();
          }
        }}
      >
        <p className="font-medium">
          {contact.firstName} {contact.lastName}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">{contact.email}</p>

        {contact.company && (
          <p className="mt-2 text-xs text-muted-foreground">
            {contact.company}
          </p>
        )}
      </Link>
    </div>
  );
}
