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
  const [isCompleted, setIsCompleted] = useState(completed);

  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  async function toggleCompletion() {
    const nextCompleted = !isCompleted;

    setIsUpdating(true);
    setError("");

    try {
      const response = await fetch(`/api/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: nextCompleted }),
      });

      const data: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to update activity.");
      }

      setIsCompleted(nextCompleted);

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update activity.",
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
        aria-label={
          isCompleted ? "Reopen activity" : "Mark activity as completed"
        }
        className="inline-flex size-11 items-center justify-center rounded-full text-emerald-600 transition-colors hover:bg-emerald-600/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-400"
      >
        {isCompleted ? (
          <CheckCircle2 className="size-7" />
        ) : (
          <Circle className="size-7" />
        )}
        <span className="sr-only">
          {isUpdating
            ? "Updating..."
            : isCompleted
              ? "Reopen"
              : "Mark completed"}
        </span>
      </button>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
