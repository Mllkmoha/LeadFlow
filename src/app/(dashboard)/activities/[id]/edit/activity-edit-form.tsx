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

type Activity = {
  type: "CALL" | "EMAIL" | "MEETING" | "TASK";
  title: string;
  content: string | null;
  contactId: string;
  dueDate: string | null;
};

type FormData = {
  type: Activity["type"];
  title: string;
  content: string;
  contactId: string;
  dueDate: string;
};

type ApiError = {
  error?: string;
};

export function ActivityEditForm({ id }: { id: string }) {
  const router = useRouter();

  const [editedFormData, setEditedFormData] = useState<FormData | null>(null);

  const activityQuery = useQuery({
    queryKey: ["activity", id],
    queryFn: async (): Promise<Activity> => {
      const response = await fetch(`/api/activities/${id}`);

      if (!response.ok) {
        const data: ApiError = await response.json();
        throw new Error(data.error ?? "Failed to load activity.");
      }

      return response.json();
    },
  });

  const formData: FormData =
    editedFormData ??
    (activityQuery.data
      ? {
          type: activityQuery.data.type,
          title: activityQuery.data.title,
          content: activityQuery.data.content ?? "",
          contactId: activityQuery.data.contactId,
          dueDate: activityQuery.data.dueDate
            ? activityQuery.data.dueDate.slice(0, 10)
            : "",
        }
      : {
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

  const updateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`/api/activities/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          content: data.content || undefined,
          dueDate: data.dueDate,
        }),
      });

      const result: ApiError = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to update activity.");
      }

      return result;
    },
    onSuccess: () => {
      router.replace("/activities");
      router.refresh();
    },
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setEditedFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateMutation.mutate(formData);
  }

  if (activityQuery.isLoading || contactsQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading activity...</p>;
  }

  const error =
    activityQuery.error?.message ??
    contactsQuery.error?.message ??
    updateMutation.error?.message;

  if (activityQuery.isError || contactsQuery.isError) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

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
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
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
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
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
          disabled={contacts.length === 0}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm disabled:opacity-50"
        >
          <option value="">Select a contact</option>
          {contacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.firstName} {contact.lastName}
              {contact.company ? ` · ${contact.company}` : ""}
            </option>
          ))}
        </select>
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
          className="w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm"
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
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
        />
      </div>

      {updateMutation.isError && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {updateMutation.error.message}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={updateMutation.isPending}
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={updateMutation.isPending || contacts.length === 0}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {updateMutation.isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
