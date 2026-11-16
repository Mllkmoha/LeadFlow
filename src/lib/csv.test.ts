import { describe, expect, it } from "vitest";
import { csvCell, toCsv } from "./csv";

describe("csvCell", () => {
  it("wraps plain text in quotes", () => {
    expect(csvCell("Daniel")).toBe('"Daniel"');
  });

  it("escapes double quotes", () => {
    expect(csvCell('say "hi"')).toBe('"say ""hi"""');
  });

  it("renders null and undefined as empty", () => {
    expect(csvCell(null)).toBe('""');
    expect(csvCell(undefined)).toBe('""');
  });

  it("neutralizes spreadsheet formulas", () => {
    expect(csvCell('=HYPERLINK("http://evil")')).toBe(
      '"\'=HYPERLINK(""http://evil"")"',
    );
    expect(csvCell("@SUM(A1)")).toBe('"\'@SUM(A1)"');
    expect(csvCell("-2+3")).toBe('"\'-2+3"');
  });

  it("neutralizes international phone numbers starting with plus", () => {
  expect(csvCell("+49 151 23456789")).toBe("\"'+49 151 23456789\"");
});

  it("keeps German characters", () => {
    expect(csvCell("Güden")).toBe('"Güden"');
  });
});

describe("toCsv", () => {
  it("joins headers and rows with CRLF", () => {
    expect(toCsv(["A", "B"], [["1", "2"]])).toBe('"A","B"\r\n"1","2"');
  });
});
