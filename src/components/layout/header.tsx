
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const pageInfo: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Your customer relationships at a glance.",
  },
  "/contacts": {
    title: "Contacts",
    description: "Manage and grow your customer relationships.",
  },
  "/pipeline": {
    title: "Sales Pipeline",
    description: "Track contacts through your sales process.",
  },
  "/activities": {
    title: "Activities",
    description: "Keep track of your follow-ups and tasks.",
  },
  "/settings": {
    title: "Settings",
    description: "Manage your application preferences.",
  },
};

export function Header() {
  const pathname = usePathname();

  const currentPage =
    Object.entries(pageInfo)
      .filter(
        ([path]) =>
          pathname === path || pathname.startsWith(`${path}/`),
      )
      .sort(([a], [b]) => b.length - a.length)[0]?.[1] ??
    pageInfo["/dashboard"];

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="flex min-h-18 items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <div className="min-w-0">
          <nav
            aria-label="Breadcrumb"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
          >
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <ChevronRight
              className="size-3.5 opacity-60"
              aria-hidden="true"
            />
            <span className="truncate text-foreground/70">
              {currentPage.title}
            </span>
          </nav>

          <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
            {currentPage.title}
          </h1>

          <p className="mt-1 hidden text-sm leading-5 text-muted-foreground sm:block">
            {currentPage.description}
          </p>
        </div>
      </div>
    </header>
  );
}
