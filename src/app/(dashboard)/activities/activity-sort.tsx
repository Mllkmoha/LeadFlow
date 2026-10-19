
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ActivitySortOption = "NEWEST" | "OLDEST" | "DUE_DATE" | "TITLE";

type ActivitySortProps = {
  value: ActivitySortOption;
};

const sortOptions: {
  label: string;
  value: ActivitySortOption;
}[] = [
  { label: "Newest first", value: "NEWEST" },
  { label: "Oldest first", value: "OLDEST" },
  { label: "Due date (earliest first)", value: "DUE_DATE" },
  { label: "Title (A–Z)", value: "TITLE" },
];

export function ActivitySort({ value }: ActivitySortProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSortChange(nextSort: ActivitySortOption) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSort === "NEWEST") {
      params.delete("sort");
    } else {
      params.set("sort", nextSort);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label
        htmlFor="activity-sort"
        className="text-sm font-medium text-muted-foreground"
      >
        Sort by
      </label>

      <select
        id="activity-sort"
        value={value}
        onChange={(event) =>
          handleSortChange(event.target.value as ActivitySortOption)
        }
        className="rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
