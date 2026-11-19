import { describe, expect, it } from "vitest";
import { getPagination } from "./pagination";

describe("getPagination", () => {
  it("clamps page 0 to page 1", () => {
    expect(getPagination(57, 0, 12)).toEqual({
      page: 1,
      totalPages: 5,
      skip: 0,
      take: 12,
    });
  });

  it("clamps NaN to page 1", () => {
    expect(getPagination(57, Number.NaN, 12).page).toBe(1);
  });

  it("clamps a page beyond the last page", () => {
    expect(getPagination(57, 99, 12)).toEqual({
      page: 5,
      totalPages: 5,
      skip: 48,
      take: 12,
    });
  });

  it("handles zero items", () => {
    expect(getPagination(0, 1, 12)).toEqual({
      page: 1,
      totalPages: 1,
      skip: 0,
      take: 12,
    });
  });

  it("handles an exact multiple of page size", () => {
    expect(getPagination(24, 2, 12)).toEqual({
      page: 2,
      totalPages: 2,
      skip: 12,
      take: 12,
    });
  });

  it("handles the last partial page", () => {
    expect(getPagination(25, 3, 12)).toEqual({
      page: 3,
      totalPages: 3,
      skip: 24,
      take: 12,
    });
  });
});
