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
  { label: "Newest", value: "NEWEST" },
  { label: "Oldest", value: "OLDEST" },
  { label: "Due date", value: "DUE_DATE" },
  { label: "A-Z", value: "TITLE" },
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
    <div className="flex shrink-0 items-center gap-2">
      <label htmlFor="activity-sort" className="sr-only">
        Sort by
      </label>

      <select
        id="activity-sort"
        value={value}
        onChange={(event) =>
          handleSortChange(event.target.value as ActivitySortOption)
        }
        name="sort"
        className="h-11 w-28 rounded-lg border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:w-auto sm:px-3"
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
