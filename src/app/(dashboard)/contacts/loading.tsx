export default function ContactsLoading() {
  return (
    <div
      className="animate-pulse space-y-4 sm:space-y-6"
      role="status"
      aria-label="Loading contacts"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="h-4 w-48 rounded bg-muted" />
        <div className="h-11 w-32 rounded-lg bg-muted" />
      </div>

      <div className="space-y-3">
        <div className="h-11 rounded-xl border bg-card" />
        <div className="flex gap-2 overflow-hidden">
          {[56, 64, 96, 96, 96].map((w, i) => (
            <div
              key={i}
              style={{ width: w }}
              className="h-10 shrink-0 rounded-full border bg-card"
            />
          ))}
        </div>
      </div>

      <div className="divide-y overflow-hidden rounded-xl border bg-card">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <div className="size-11 shrink-0 rounded-full bg-muted" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3.5 w-2/5 rounded bg-muted" />
              <div className="h-3 w-3/5 rounded bg-muted" />
            </div>
            <div className="h-6 w-16 shrink-0 rounded-full bg-muted" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
