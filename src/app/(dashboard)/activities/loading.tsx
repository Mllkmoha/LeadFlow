export default function ActivitiesLoading() {
  return (
    <div
      className="animate-pulse space-y-4 sm:space-y-6"
      role="status"
      aria-label="Loading activities"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="h-4 w-40 rounded bg-muted-foreground/15" />
        <div className="h-11 w-24 rounded-lg bg-muted-foreground/15" />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl border bg-muted-foreground/5" />
        ))}
      </div>

      <div className="flex gap-2 overflow-hidden">
        {[48, 80, 80, 96, 96].map((w, i) => (
          <div
            key={i}
            style={{ width: w }}
            className="h-10 shrink-0 rounded-full border bg-muted-foreground/5"
          />
        ))}
      </div>

      <div className="flex gap-2">
        <div className="h-11 flex-1 rounded-lg border bg-muted-foreground/5" />
        <div className="h-11 w-28 rounded-lg border bg-muted-foreground/5" />
      </div>

      <div className="divide-y overflow-hidden rounded-xl border border-muted-foreground/20 bg-muted-foreground/5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 px-3 py-4 sm:px-5">
            <div className="size-7 shrink-0 rounded-full bg-muted-foreground/15" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-2/5 rounded bg-muted-foreground/15" />
              <div className="h-3 w-3/5 rounded bg-muted-foreground/15" />
              <div className="h-9 w-32 rounded-lg bg-muted-foreground/15" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
