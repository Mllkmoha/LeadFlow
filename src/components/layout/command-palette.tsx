"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Activity,
  CornerDownLeft,
  KanbanSquare,
  LayoutDashboard,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Item = {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void;
};

type SearchResult = {
  contacts: {
    id: string;
    firstName: string;
    lastName: string;
    company: string | null;
  }[];
  activities: { id: string; title: string; completed: boolean }[];
};

export function CommandPalette() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult>({
    contacts: [],
    activities: [],
  });
  const [active, setActive] = useState(0);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults({ contacts: [], activities: [] });
    setActive(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  // Ctrl/Cmd + K
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === "Escape") close();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  // Open from header button
  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("open-command-palette", onOpen);
    return () => window.removeEventListener("open-command-palette", onOpen);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  // Debounced search
  useEffect(() => {
    const term = query.trim();

    if (term.length < 2) return;

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(term)}`,
          { signal: controller.signal },
        );
        if (response.ok) setResults(await response.json());
      } catch {
        // aborted or offline
      }
    }, 200);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const term = query.trim().toLowerCase();
  const visibleResults =
    term.length < 2 ? { contacts: [], activities: [] } : results;

  const commands: Item[] = [
    {
      id: "dash",
      label: "Go to Dashboard",
      icon: LayoutDashboard,
      run: () => go("/dashboard"),
    },
    {
      id: "contacts",
      label: "Go to Contacts",
      icon: Users,
      run: () => go("/contacts"),
    },
    {
      id: "pipeline",
      label: "Go to Pipeline",
      icon: KanbanSquare,
      run: () => go("/pipeline"),
    },
    {
      id: "activities",
      label: "Go to Activities",
      icon: Activity,
      run: () => go("/activities"),
    },
    {
      id: "settings",
      label: "Go to Settings",
      icon: Settings,
      run: () => go("/settings"),
    },
    {
      id: "new-contact",
      label: "New contact",
      icon: UserPlus,
      run: () => go("/contacts/new"),
    },
    {
      id: "new-activity",
      label: "New activity",
      icon: Plus,
      run: () => go("/activities/new"),
    },
    {
      id: "theme",
      label:
        resolvedTheme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme",
      icon: resolvedTheme === "dark" ? Sun : Moon,
      run: () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        close();
      },
    },
  ].filter((item) => !term || item.label.toLowerCase().includes(term));

  const items: Item[] = [
    ...visibleResults.contacts.map((contact) => ({
      id: `c-${contact.id}`,
      label: `${contact.firstName} ${contact.lastName}`,
      hint: contact.company ?? "Contact",
      icon: Users,
      run: () => go(`/contacts/${contact.id}`),
    })),
    ...visibleResults.activities.map((activity) => ({
      id: `a-${activity.id}`,
      label: activity.title,
      hint: activity.completed ? "Completed" : "Activity",
      icon: Activity,
      run: () => go(`/activities/${activity.id}/edit`),
    })),
    ...commands,
  ];

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, items.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      items[active]?.run();
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-2xl border bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center gap-3 border-b px-4">
          <Search
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id="command-search"
            name="command-search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Search or run a command..."
            autoComplete="off"
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">
            Esc
          </kbd>
        </div>

        <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
          {items.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </li>
          ) : (
            items.map((item, index) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={index === active}
                >
                  <button
                    type="button"
                    onClick={item.run}
                    onMouseMove={() => setActive(index)}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition-colors ${
                      index === active ? "bg-muted" : ""
                    }`}
                  >
                    <Icon
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {item.label}
                    </span>
                    {item.hint && (
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {item.hint}
                      </span>
                    )}
                    {index === active && (
                      <CornerDownLeft
                        className="hidden size-3.5 shrink-0 text-muted-foreground sm:block"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="hidden items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground sm:flex">
          <span>↑↓ to navigate · Enter to select</span>
          <span>Ctrl K to toggle</span>
        </div>
      </div>
    </div>
  );
}
