import { describe, expect, it } from "vitest";
import { buildActivitySearchUrl } from "./activity-search";

describe("buildActivitySearchUrl", () => {
  const pathname = "/activities";

  it("preserves active filter and sort when clearing search input", () => {
    const currentParams = new URLSearchParams(
      "filter=OVERDUE&sort=DUE_DATE&search=meeting",
    );

    const result = buildActivitySearchUrl(pathname, currentParams, "");
    expect(result).toBe("/activities?filter=OVERDUE&sort=DUE_DATE");
  });

  it("preserves active filter, sort, type, and pagination when clearing search", () => {
    const currentParams = new URLSearchParams(
      "filter=COMPLETED&sort=TITLE&type=CALL&page=2&search=followup",
    );

    const result = buildActivitySearchUrl(pathname, currentParams, "");
    expect(result).toBe(
      "/activities?filter=COMPLETED&sort=TITLE&type=CALL&page=2",
    );
  });

  it("returns base pathname when clearing search and no other parameters exist", () => {
    const currentParams = new URLSearchParams("search=test");

    const result = buildActivitySearchUrl(pathname, currentParams, "");
    expect(result).toBe("/activities");
  });

  it("removes search parameter when search input is empty string or only whitespace", () => {
    const currentParams = new URLSearchParams(
      "filter=TODAY&search=demo",
    );

    const resultWhitespace = buildActivitySearchUrl(
      pathname,
      currentParams,
      "   ",
    );
    expect(resultWhitespace).toBe("/activities?filter=TODAY");
  });

  it("updates search query while preserving existing filters and sort order", () => {
    const currentParams = new URLSearchParams(
      "filter=UPCOMING&sort=NEWEST",
    );

    const result = buildActivitySearchUrl(
      pathname,
      currentParams,
      "urgent task",
    );
    expect(result).toBe(
      "/activities?filter=UPCOMING&sort=NEWEST&search=urgent+task",
    );
  });

  it("replaces existing search value with new query while preserving other filters", () => {
    const currentParams = new URLSearchParams(
      "filter=PENDING&search=oldQuery",
    );

    const result = buildActivitySearchUrl(
      pathname,
      currentParams,
      "newQuery",
    );
    expect(result).toBe("/activities?filter=PENDING&search=newQuery");
  });
});
