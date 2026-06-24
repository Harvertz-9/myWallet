import { describe, expect, test } from "vitest";
import { formatRupiah } from "@/utils/currencyFormatter";
import { formatDate, formatDateTime } from "@/utils/dateFormatter";

describe("currencyFormatter", () => {
  test("formats number to Rupiah without decimals and spacing", () => {
    expect(formatRupiah(100000)).toBe("Rp100.000");
    expect(formatRupiah(0)).toBe("Rp0");
  });

  test("handles NaN gracefully", () => {
    expect(formatRupiah(NaN)).toBe("Rp0");
  });
});

describe("dateFormatter", () => {
  test("formats YYYY-MM-DD date string to Indonesian long date format", () => {
    expect(formatDate("2026-06-24")).toBe("24 Juni 2026");
  });

  test("returns empty string when input is empty", () => {
    expect(formatDate("")).toBe("");
  });
});

