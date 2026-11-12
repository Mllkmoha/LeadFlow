export default function PipelineLoading() {
  return (
    <div
      className="animate-pulse space-y-4 sm:space-y-6"
      role="status"
      aria-label="Loading pipeline"
    >
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl border bg-muted-foreground/5" />
        ))}
      </div>

      <div className="-mx-4 flex gap-3 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 xl:mx-0 xl:grid xl:grid-cols-4 xl:gap-4 xl:px-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-[85%] shrink-0 space-y-3 rounded-xl border border-t-4 bg-muted-foreground/5 p-4 sm:w-[48%] lg:w-[32%] xl:w-auto xl:shrink"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-muted-foreground/15" />
              <div className="h-6 w-7 rounded-full bg-muted-foreground/15" />
            </div>
            <div className="h-3 w-36 rounded bg-muted-foreground/15" />
            <div className="h-28 rounded-xl bg-muted-foreground/15" />
          </div>
        ))}
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
