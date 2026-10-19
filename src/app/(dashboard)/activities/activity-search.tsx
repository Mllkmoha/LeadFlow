"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ActivitySearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const [value, setValue] = useState(currentSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const search = value.trim();

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      const query = params.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;

      if (
        nextUrl !== `${pathname}?${searchParams.toString()}` &&
        !(nextUrl === pathname && searchParams.size === 0)
      ) {
        router.replace(nextUrl);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, pathname, router, searchParams]);

  return (
    <div className="flex gap-2">
      <input
        type="search"
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value;
          setValue(nextValue);

          if (!nextValue) {
            router.replace(pathname);
          }
        }}
        placeholder="Search activities or contacts..."
        aria-label="Search activities or contacts"
        className="min-w-0 flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}
