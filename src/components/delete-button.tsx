"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

type DeleteButtonProps = {
  onDelete: () => void | Promise<void>;
  confirmMessage: string;
  isDeleting?: boolean;
  disabled?: boolean;
  label?: string;
  deletingLabel?: string;
  stopPropagation?: boolean;
};

export function DeleteButton({
  onDelete,
  confirmMessage,
  isDeleting = false,
  disabled = false,
  label = "Delete",
  deletingLabel = "Deleting...",
  stopPropagation = false,
}: DeleteButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  function stopEvent(event: React.MouseEvent<HTMLButtonElement>) {
    if (stopPropagation) {
      event.stopPropagation();
    }
  }

  async function handleConfirm() {
    if (disabled || isDeleting) return;

    setIsConfirming(false);
    await onDelete();
  }

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          stopEvent(event);
          if (!disabled && !isDeleting) setIsConfirming(true);
        }}
        disabled={disabled || isDeleting}
        className="inline-flex h-9 items-center justify-center rounded-lg border border-destructive/40 px-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isDeleting ? deletingLabel : label}
      </button>

      {isConfirming && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsConfirming(false);
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-2xl sm:p-7"
          >
            <button
              type="button"
              aria-label="Close confirmation"
              onClick={(event) => {
                stopEvent(event);
                setIsConfirming(false);
              }}
              className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="size-6" />
            </div>

            <h2
              id="delete-dialog-title"
              className="text-xl font-semibold tracking-tight"
            >
              Delete this item?
            </h2>

            <p
              id="delete-dialog-description"
              className="mt-3 text-sm leading-6 text-muted-foreground"
            >
              {confirmMessage}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              This action may not be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={(event) => {
                  stopEvent(event);
                  setIsConfirming(false);
                }}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={(event) => {
                  stopEvent(event);
                  void handleConfirm();
                }}
                disabled={disabled || isDeleting}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-destructive px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <AlertTriangle className="size-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
