"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const statuses = [
  { value: "", label: "All" },
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "INTERESTED", label: "Interested" },
  { value: "CONVERTED", label: "Converted" },
];

export function ContactsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status") ?? "";

  function updateFilter(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    const query = params.toString();
    router.replace(query ? `/contacts?${query}` : "/contacts");
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id="contact-search"
          name="search"
          type="search"
          aria-label="Search contacts"
          placeholder="Search contacts..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(event) => updateFilter("search", event.target.value)}
          className="h-11 w-full rounded-xl border bg-background pl-9 pr-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-10 sm:text-sm"
        />
      </div>

      <div
        role="group"
        aria-label="Filter by status"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {statuses.map((status) => {
          const active = activeStatus === status.value;

          return (
            <button
              key={status.value}
              type="button"
              aria-pressed={active}
              onClick={() => updateFilter("status", status.value)}
              className={`inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {status.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
