import Link from "next/link";

type ContactsPaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  search?: string;
  status?: string;
};

export function ContactsPagination({
  page,
  totalPages,
  totalItems,
  search,
  status,
}: ContactsPaginationProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * 12 + 1;
  const end = Math.min(page * 12, totalItems);

  function getPageUrl(targetPage: number) {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (status) params.set("status", status);

    params.set("page", String(targetPage));

    return `/contacts?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Contacts pagination"
      className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>
          Showing {start}-{end} of {totalItems}
        </p>
        <p aria-live="polite">
          Page {page} of {totalPages}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Link
            href={getPageUrl(page - 1)}
            aria-label="Previous page"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted sm:flex-none"
          >
            Previous
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex min-h-11 flex-1 cursor-not-allowed items-center justify-center rounded-lg border px-4 text-sm font-medium text-muted-foreground opacity-50 sm:flex-none"
          >
            Previous
          </span>
        )}

        {page < totalPages ? (
          <Link
            href={getPageUrl(page + 1)}
            aria-label="Next page"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted sm:flex-none"
          >
            Next
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex min-h-11 flex-1 cursor-not-allowed items-center justify-center rounded-lg border px-4 text-sm font-medium text-muted-foreground opacity-50 sm:flex-none"
          >
            Next
          </span>
        )}
      </div>
    </nav>
  );
}
