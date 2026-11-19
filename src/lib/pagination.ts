type PaginationResult = {
  page: number;
  totalPages: number;
  skip: number;
  take: number;
};

export function getPagination(
  totalItems: number,
  requestedPage: number,
  pageSize: number,
): PaginationResult {
  const safeTotalItems = Number.isFinite(totalItems)
    ? Math.max(0, Math.floor(totalItems))
    : 0;

  const safePageSize = Number.isFinite(pageSize)
    ? Math.max(1, Math.floor(pageSize))
    : 1;

  const totalPages = Math.max(1, Math.ceil(safeTotalItems / safePageSize));

  const safeRequestedPage = Number.isFinite(requestedPage)
    ? Math.floor(requestedPage)
    : 1;

  const page = Math.min(Math.max(1, safeRequestedPage), totalPages);

  return {
    page,
    totalPages,
    skip: (page - 1) * safePageSize,
    take: safePageSize,
  };
}
