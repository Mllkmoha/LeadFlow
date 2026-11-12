import Link from "next/link";

type ActivityFilter =
  | "ALL"
  | "PENDING"
  | "COMPLETED"
  | "OVERDUE"
  | "TODAY"
  | "UPCOMING";

type ActivityFiltersProps = {
  value: ActivityFilter;
};

const filters: { label: string; value: ActivityFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Overdue", value: "OVERDUE" },
  { label: "Due Today", value: "TODAY" },
  { label: "Upcoming", value: "UPCOMING" },
  { label: "Completed", value: "COMPLETED" },
];

export function ActivityFilters({ value }: ActivityFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter activities"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {filters.map((filter) => {
        const active = value === filter.value;

        return (
          <Link
            key={filter.value}
            href={
              filter.value === "ALL"
                ? "/activities"
                : `/activities?filter=${filter.value}`
            }
            aria-current={active ? "page" : undefined}
            className={`inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
