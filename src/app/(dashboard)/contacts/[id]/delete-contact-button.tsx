"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/delete-button";

type DeleteContactButtonProps = {
  contactId: string;
};

export function DeleteContactButton({
  contactId,
}: DeleteContactButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (isDeleting) return;


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
    <DeleteButton
      confirmMessage="Are you sure you want to delete this contact?"
      isDeleting={isDeleting}
      onDelete={handleDelete}
    />
  );
}
