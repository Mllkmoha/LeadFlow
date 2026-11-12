export default function DashboardLoading() {
  return (
    <div
      className="animate-pulse space-y-4 sm:space-y-6"
      role="status"
      aria-label="Loading dashboard"
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl border bg-muted-foreground/5" />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`h-28 rounded-xl border bg-muted-foreground/5 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
          />
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="h-56 rounded-xl border bg-muted-foreground/5" />
        <div className="h-56 rounded-xl border bg-muted-foreground/5" />
      </div>

      <div className="h-64 rounded-xl border bg-muted-foreground/5" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
