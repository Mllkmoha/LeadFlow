"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

type DeleteActivityButtonProps = {
  activityId: string;
};

export function DeleteActivityButton({
  activityId,
}: DeleteActivityButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (isDeleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/activities/${activityId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result: { error?: string } = await response
          .json()
          .catch(() => ({}));

        throw new Error(result.error ?? `Delete failed (${response.status})`);
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting activity:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete activity. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex h-9 items-center justify-center rounded-lg border border-red-600/30 bg-red-600/5 px-3 text-sm font-medium text-red-700 transition-colors hover:border-red-600/50 hover:bg-red-600/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
