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
  description: string;
  accent: string;
  badge: string;
}[] = [
  {
    id: "NEW",
    title: "New",
    description: "Recently added contacts",
    accent: "border-t-sky-500",
    badge: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  {
    id: "CONTACTED",
    title: "Contacted",
    description: "Initial contact made",
    accent: "border-t-amber-500",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  {
    id: "INTERESTED",
    title: "Interested",
    description: "Potential opportunities",
    accent: "border-t-violet-500",
    badge: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  },
  {
    id: "CONVERTED",
    title: "Converted",
    description: "Successfully converted",
    accent: "border-t-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
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

  const totalContacts = items.length;

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
            description={column.description}
            accent={column.accent}
            badge={column.badge}
            contacts={items.filter((contact) => contact.status === column.id)}
            totalContacts={totalContacts}
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
  description: string;
  accent: string;
  badge: string;
  contacts: Contact[];
  totalContacts: number;
};

function PipelineColumn({
  id,
  title,
  description,
  accent,
  badge,
  contacts,
  totalContacts,
}: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const percentage =
    contacts.length === 0
      ? 0
      : Math.round((contacts.length / totalContacts) * 100);

  return (
    <div
      ref={setNodeRef}
      className={`min-h-100 rounded-xl border border-t-4 bg-card p-4 transition-colors ${accent} ${
        isOver ? "bg-muted/60 ring-2 ring-primary/20" : ""
      }`}
    >
      <div className="mb-4 border-b pb-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold tracking-tight">{title}</h2>

          <span
            className={`inline-flex min-w-7 items-center justify-center rounded-full px-2 py-1 text-xs font-semibold ${badge}`}
          >
            {contacts.length}
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">{description}</p>

        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>Pipeline share</span>
            <span>{percentage}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <PipelineCard key={contact.id} contact={contact} />
        ))}

        {contacts.length === 0 && (
          <div
            className={`rounded-lg border border-dashed p-5 text-center transition-colors ${
              isOver
                ? "border-primary bg-primary/5"
                : "border-border/70 bg-muted/20"
            }`}
          >
            <p className="text-sm font-medium text-muted-foreground">
              {isOver ? "Drop contact here" : "No contacts yet"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isOver
                ? "Release to move this contact"
                : "Contacts in this stage will appear here."}
            </p>
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
    useDraggable({ id: contact.id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const initials =
    `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`group rounded-xl border bg-background p-3.5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md ${
        isDragging
          ? "z-10 cursor-grabbing opacity-40"
          : "cursor-grab active:cursor-grabbing"
      }`}
    >
      <Link
        href={`/contacts/${contact.id}`}
        className="block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={(event) => {
          if (isDragging) event.preventDefault();
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-semibold tracking-tight group-hover:text-primary">
                {contact.firstName} {contact.lastName}
              </p>

              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
               {columns.find((column) => column.id === contact.status)?.title} 
              </span>
            </div>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {contact.email}
            </p>
          </div>
        </div>

        {contact.company && (
          <div className="mt-3 border-t pt-2.5">
            <p className="truncate text-xs text-muted-foreground">
              {contact.company}
            </p>
          </div>
        )}
      </Link>
    </div>
  );
}
