"use client";

import { useLinkStatus } from "next/link";

export function NavPending({ className = "ml-auto" }: { className?: string }) {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden="true"
      className={`size-2 rounded-full bg-primary transition-opacity ${className} ${
        pending ? "animate-pulse opacity-100" : "opacity-0"
      }`}
    />
  );
}