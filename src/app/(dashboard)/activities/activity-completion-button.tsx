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
          completed ? "Reopen activity" : "Mark activity as completed"
        }
        className="inline-flex h-9 items-center justify-center rounded-lg border border-emerald-600/30 bg-emerald-600/10 px-3 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-400"
      >
        {completed ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <Circle className="size-4" />
        )}
        {isUpdating ? "Updating..." : completed ? "Reopen" : "Mark completed"}
      </button>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
