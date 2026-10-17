"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/delete-button";

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
    <DeleteButton
      confirmMessage="Are you sure you want to delete this activity?"
      isDeleting={isDeleting}
      onDelete={handleDelete}
      stopPropagation
    />
  );
}
