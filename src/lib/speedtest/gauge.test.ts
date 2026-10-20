import { describe, expect, it } from "vitest";
import { GAUGE_STOPS, valueToFraction } from "./gauge";

describe("valueToFraction (non-linear gauge scale)", () => {
  it("maps stops to evenly spaced fractions", () => {
    const n = GAUGE_STOPS.length - 1;
    GAUGE_STOPS.forEach((stop, i) => expect(valueToFraction(stop)).toBeCloseTo(i / n, 10));
  });
  it("interpolates linearly between stops", () => {
    // between 50 (index 4) and 100 (index 5): 75 is halfway → 4.5/8
    expect(valueToFraction(75)).toBeCloseTo(4.5 / 8, 10);
  });
  it("clamps outside the range", () => {
    expect(valueToFraction(-3)).toBe(0);
    expect(valueToFraction(5000)).toBe(1);
    expect(valueToFraction(Number.NaN)).toBe(0);
  });
});
