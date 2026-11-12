"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
};

type ApiError = {
  error?: string;
};

type ActivityFormData = {
  type: "CALL" | "EMAIL" | "MEETING" | "TASK";
  title: string;
  content: string;
  contactId: string;
  dueDate: string;
};

const inputClass =
  "h-11 w-full rounded-lg border bg-background px-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 sm:h-10 sm:text-sm";

const selectClass = `${inputClass} appearance-none bg-[length:1rem] bg-[position:right_0.75rem_center] bg-no-repeat pr-10 [&>option]:bg-card [&>option]:text-foreground`;

const textareaClass =
  "w-full resize-y rounded-lg border bg-background px-3 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm";

const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
};

export function ActivityForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<ActivityFormData>({
    type: "TASK",
    title: "",
    content: "",
    contactId: "",
    dueDate: "",
  });

  const contactsQuery = useQuery({
    queryKey: ["contacts"],
    queryFn: async (): Promise<Contact[]> => {
      const response = await fetch("/api/contacts");

      if (!response.ok) {
        throw new Error("Failed to load contacts.");
      }

      return response.json();
    },
  });

  const createActivityMutation = useMutation({
    mutationFn: async (activity: ActivityFormData) => {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...activity,
          content: activity.content || undefined,
          dueDate: activity.dueDate || undefined,
        }),
      });

      const data: ApiError = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to create activity.");
      }

      return data;
    },
    onSuccess: () => {
      router.push("/activities");
      router.refresh();
    },
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createActivityMutation.mutate(formData);
  }

  const error =
    createActivityMutation.error?.message ?? contactsQuery.error?.message;
  const isSubmitting = createActivityMutation.isPending;
  const contacts = contactsQuery.data ?? [];

  if (contactsQuery.isLoading) {
    return (
      <div
        className="animate-pulse space-y-5"
        role="status"
        aria-label="Loading form"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3.5 w-24 rounded bg-muted-foreground/15" />
            <div className="h-11 rounded-lg bg-muted-foreground/15" />
          </div>
        ))}
        <div className="h-11 rounded-lg bg-muted-foreground/15" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium">
          Activity type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className={selectClass}
          style={chevron}
        >
          <option value="CALL">Call</option>
          <option value="EMAIL">Email</option>
          <option value="MEETING">Meeting</option>
          <option value="TASK">Task</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={200}
          placeholder="e.g. Follow up with customer"
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contactId" className="text-sm font-medium">
          Contact
        </label>
        <select
          id="contactId"
          name="contactId"
          value={formData.contactId}
          onChange={handleChange}
          required
          disabled={contactsQuery.isLoading || contacts.length === 0}
          className={selectClass}
          style={chevron}
        >
          <option value="">
            {contactsQuery.isLoading
              ? "Loading contacts..."
              : "Select a contact"}
          </option>
          {contacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.firstName} {contact.lastName}
              {contact.company ? ` · ${contact.company}` : ""}
            </option>
          ))}
        </select>
        {!contactsQuery.isLoading &&
          !contactsQuery.isError &&
          contacts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Create a contact before adding an activity.
            </p>
          )}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Description (optional)
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={4}
          placeholder="Add notes about this activity..."
          className={textareaClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="dueDate" className="text-sm font-medium">
          Due date (optional)
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="h-11 rounded-lg border px-5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 sm:h-10"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting || contactsQuery.isLoading || contacts.length === 0
          }
          className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10"
        >
          {isSubmitting ? "Creating..." : "Create activity"}
        </button>
      </div>
    </form>
  );
}
