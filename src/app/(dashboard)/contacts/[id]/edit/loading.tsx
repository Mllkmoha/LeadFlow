export default function EditContactLoading() {
  return (
    <div
      className="mx-auto max-w-3xl animate-pulse space-y-6"
      role="status"
      aria-label="Loading form"
    >
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-7 w-48 rounded bg-muted" />
        <div className="h-4 w-64 rounded bg-muted" />
      </div>

      <div className="space-y-5 rounded-xl border bg-card p-4 sm:p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3.5 w-20 rounded bg-muted" />
            <div className="h-11 rounded-lg bg-muted" />
          </div>
        ))}
        <div className="h-11 rounded-lg bg-muted" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
