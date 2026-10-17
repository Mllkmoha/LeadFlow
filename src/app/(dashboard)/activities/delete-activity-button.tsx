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
        throw new Error("Failed to delete activity");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting activity:", error);
      window.alert("Failed to delete activity. Please try again.");
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg border border-destructive/50 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
