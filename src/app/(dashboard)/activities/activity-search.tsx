"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function buildActivitySearchUrl(
  pathname: string,
  currentSearchParams: string | URLSearchParams,
  searchQuery: string,
): string {
  const params = new URLSearchParams(currentSearchParams.toString());
  const search = searchQuery.trim();

  if (search) {
    params.set("search", search);
  } else {
    params.delete("search");
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function ActivitySearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const [value, setValue] = useState(currentSearch);

  const applySearch = useCallback(
    (searchQuery: string) => {
      const nextUrl = buildActivitySearchUrl(
        pathname,
        searchParams,
        searchQuery,
      );
      const currentQuery = searchParams.toString();
      const currentUrl = currentQuery
        ? `${pathname}?${currentQuery}`
        : pathname;

      if (nextUrl !== currentUrl) {
        router.replace(nextUrl);
      }
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      applySearch(value);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, applySearch]);

  return (
    <div className="flex gap-2">
      <input
        type="search"
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value;
          setValue(nextValue);

          if (!nextValue) {
            applySearch("");
          }
        }}
        placeholder="Search..."
        aria-label="Search activities or contacts"
        className="h-11 min-w-0 flex-1 rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:text-sm"
      />
    </div>
  );
}
