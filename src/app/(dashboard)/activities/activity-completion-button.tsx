
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";

type ActivityCompletionButtonProps = {
  activityId: string;
  completed: boolean;
};

export function ActivityCompletionButton({
  activityId,
  completed,
}: ActivityCompletionButtonProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  async function toggleCompletion() {
    setIsUpdating(true);
    setError("");

    try {
      const response = await fetch(`/api/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });

      const data: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to update activity.");
      }

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update activity.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={toggleCompletion}
        disabled={isUpdating}
        aria-label={completed ? "Reopen activity" : "Mark activity as completed"}
        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        {completed ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <Circle className="size-4" />
        )}
        {isUpdating
          ? "Updating..."
          : completed
            ? "Reopen"
            : "Mark completed"}
      </button>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
