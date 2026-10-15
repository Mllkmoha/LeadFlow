"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function ContactsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`/contacts?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        placeholder="Search contacts..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(event) => updateFilter("search", event.target.value)}
        className="h-10 flex-1 rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />

      <select
        defaultValue={searchParams.get("status") ?? ""}
        onChange={(event) => updateFilter("status", event.target.value)}
        className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
      >
        <option value="">All statuses</option>
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="INTERESTED">Interested</option>
        <option value="CONVERTED">Converted</option>
      </select>
    </div>
  );
}