"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteButton } from "@/components/delete-button";

interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesSectionProps {
  contactId: string;
}

interface ApiError {
  error?: string;
}

export function NotesSection({ contactId }: NotesSectionProps) {
  const queryClient = useQueryClient();

  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const notesQuery = useQuery<Note[], Error>({
    queryKey: ["notes", contactId],
    queryFn: async () => {
      const response = await fetch(`/api/contacts/${contactId}/notes`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to fetch notes.");
      }

      return data;
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: async (noteContent: string) => {
      const response = await fetch(`/api/contacts/${contactId}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: noteContent,
        }),
      });

      const data: Note | ApiError = await response.json();

      if (!response.ok) {
        throw new Error(
          "error" in data
            ? (data.error ?? "Failed to create note.")
            : "Failed to create note.",
        );
      }

      return data as Note;
    },

    onSuccess: () => {
      setContent("");

      queryClient.invalidateQueries({
        queryKey: ["notes", contactId],
      });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({
      noteId,
      content,
    }: {
      noteId: string;
      content: string;
    }) => {
      const response = await fetch(
        `/api/contacts/${contactId}/notes/${noteId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        },
      );

      const data: Note | ApiError = await response.json();

      if (!response.ok) {
        throw new Error(
          "error" in data
            ? (data.error ?? "Failed to update note.")
            : "Failed to update note.",
        );
      }

      return data as Note;
    },

    onSuccess: () => {
      setEditingNoteId(null);
      setEditingContent("");

      queryClient.invalidateQueries({
        queryKey: ["notes", contactId],
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId: string) => {
      const response = await fetch(
        `/api/contacts/${contactId}/notes/${noteId}`,
        {
          method: "DELETE",
        },
      );

      const data: { message?: string; error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to delete note.");
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", contactId],
      });
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    createNoteMutation.mutate(trimmedContent);
  }

  function handleEdit(note: Note) {
    setEditingNoteId(note.id);
    setEditingContent(note.content);
  }

  function handleCancelEdit() {
    setEditingNoteId(null);
    setEditingContent("");
  }

  function handleUpdate(noteId: string) {
    const trimmedContent = editingContent.trim();

    if (!trimmedContent) {
      return;
    }

    updateNoteMutation.mutate({
      noteId,
      content: trimmedContent,
    });
  }

  function handleDelete(noteId: string) {
  deleteNoteMutation.mutate(noteId);
  }

  const notes = notesQuery.data ?? [];

  const isUpdating =
    updateNoteMutation.isPending &&
    updateNoteMutation.variables?.noteId === editingNoteId;

  const isDeleting = (noteId: string) =>
    deleteNoteMutation.isPending && deleteNoteMutation.variables === noteId;

  const error =
    notesQuery.error?.message ??
    createNoteMutation.error?.message ??
    updateNoteMutation.error?.message ??
    deleteNoteMutation.error?.message ??
    "";

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b px-6 py-4">
        <h2 className="font-semibold">Notes</h2>
      </div>

      <div className="space-y-6 p-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write a note..."
            rows={3}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />

          <div className="flex items-center justify-between gap-3">
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : (
              <span />
            )}

            <button
              type="submit"
              disabled={createNoteMutation.isPending || !content.trim()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createNoteMutation.isPending ? "Adding..." : "Add Note"}
            </button>
          </div>
        </form>

        {notesQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notes yet.</p>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="rounded-lg border p-4">
                {editingNoteId === note.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editingContent}
                      onChange={(event) =>
                        setEditingContent(event.target.value)
                      }
                      rows={3}
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdate(note.id)}
                        disabled={isUpdating || !editingContent.trim()}
                        className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isUpdating ? "Saving..." : "Save"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={isUpdating}
                        className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="whitespace-pre-wrap text-sm">
                      {note.content}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(note)}
                        disabled={deleteNoteMutation.isPending}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <DeleteButton
                        confirmMessage="Are you sure you want to delete this note?"
                        onDelete={() => handleDelete(note.id)}
                        isDeleting={isDeleting(note.id)}
                        disabled={
                          deleteNoteMutation.isPending &&
                          !isDeleting(note.id)
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
