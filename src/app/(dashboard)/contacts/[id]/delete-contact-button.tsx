"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteContactButtonProps = {
  contactId: string;
};

export function DeleteContactButton({
  contactId,
}: DeleteContactButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact.");
      }

      router.push("/contacts");
      router.refresh();
    } catch {
      window.alert("Failed to delete contact. Please try again.");
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg border border-destructive/50 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}