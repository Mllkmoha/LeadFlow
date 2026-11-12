export default function ContactDetailsLoading() {
  return (
    <div
      className="mx-auto max-w-3xl animate-pulse space-y-6"
      role="status"
      aria-label="Loading contact"
    >
      <div className="h-4 w-32 rounded bg-muted-foreground/15" />

      <div className="flex items-center gap-4">
        <div className="size-16 shrink-0 rounded-full bg-muted-foreground/15 sm:size-20" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-1/2 rounded bg-muted-foreground/15" />
          <div className="h-3.5 w-2/3 rounded bg-muted-foreground/15" />
          <div className="h-5 w-16 rounded-full bg-muted-foreground/15" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="h-11 rounded-lg border bg-muted-foreground/5" />
        <div className="h-11 rounded-lg border bg-muted-foreground/5" />
      </div>

      <div className="h-72 rounded-xl border bg-muted-foreground/5" />
      <div className="h-48 rounded-xl border bg-muted-foreground/5" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}