"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Search,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

import { signOutAction } from "@/app/actions/auth";

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
      .filter(([path]) => pathname === path || pathname.startsWith(`${path}/`))
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

            <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />

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

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
            aria-label="Search and commands"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:h-10 sm:min-w-52"
          >
            <Search className="size-4" aria-hidden="true" />

            <span className="hidden sm:inline">Search...</span>

            <kbd className="ml-auto hidden rounded border px-1.5 py-0.5 text-[10px] lg:block">
              Ctrl K
            </kbd>
          </button>

          <details className="relative">
            <summary
              aria-label="Account options"
              title="Account options"
              className="flex size-11 list-none cursor-pointer items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"
            >
              <UserRound className="size-4" aria-hidden="true" />
            </summary>

            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg">
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Settings className="size-4" aria-hidden="true" />
                Settings
              </Link>

              <div className="my-1 h-px bg-border" />

              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Sign out
                </button>
              </form>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
