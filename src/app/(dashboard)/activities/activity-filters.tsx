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
  { label: "Completed", value: "COMPLETED" },
  { label: "Overdue", value: "OVERDUE" },
  { label: "Due Today", value: "TODAY" },
{ label: "Upcoming", value: "UPCOMING" },
];

export function ActivityFilters({ value }: ActivityFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <a
          key={filter.value}
          href={
            filter.value === "ALL"
              ? "/activities"
              : `/activities?filter=${filter.value}`
          }
          aria-current={value === filter.value ? "page" : undefined}
          className={
            value === filter.value
              ? "rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              : "rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
          }
        >
          {filter.label}
        </a>
      ))}
    </div>
  );
}
