
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
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
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
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
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
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        >
          <option value="">
            {contactsQuery.isLoading ? "Loading contacts..." : "Select a contact"}
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
          className="w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
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
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            contactsQuery.isLoading ||
            contacts.length === 0
          }
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create activity"}
        </button>
      </div>
    </form>
  );
}
