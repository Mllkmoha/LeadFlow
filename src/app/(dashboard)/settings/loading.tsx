export default function SettingsLoading() {
  return (
    <div
      className="mx-auto max-w-3xl animate-pulse space-y-4 sm:space-y-6"
      role="status"
      aria-label="Loading settings"
    >
      <div className="h-4 w-64 rounded bg-muted-foreground/15" />

      <div className="space-y-5 rounded-xl border bg-muted-foreground/5 p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-muted-foreground/15" />
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-muted-foreground/15" />
            <div className="h-3 w-48 rounded bg-muted-foreground/15" />
          </div>
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3.5 w-24 rounded bg-muted-foreground/15" />
            <div className="h-11 rounded-lg bg-muted-foreground/15" />
          </div>
        ))}
        <div className="h-11 rounded-lg bg-muted-foreground/15" />
      </div>

      <div className="space-y-4 rounded-xl border bg-muted-foreground/5 p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-muted-foreground/15" />
          <div className="h-4 w-28 rounded bg-muted-foreground/15" />
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-muted-foreground/15" />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
