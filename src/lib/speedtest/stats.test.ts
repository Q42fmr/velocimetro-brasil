import { describe, expect, it } from "vitest";
import { median, jitter, toMbps, ThroughputMeter } from "./stats";

describe("median", () => {
  it("returns middle value for odd count and mean of two middles for even", () => {
    expect(median([30, 10, 20])).toBe(20);
    expect(median([10, 20, 30, 40])).toBe(25);
  });
  it("is 0 for empty input", () => {
    expect(median([])).toBe(0);
  });
});

describe("jitter", () => {
  it("is the mean absolute difference between consecutive samples", () => {
    // |12-10| + |9-12| + |15-9| = 2 + 3 + 6 = 11 → /3
    expect(jitter([10, 12, 9, 15])).toBeCloseTo(11 / 3, 10);
  });
  it("is 0 with fewer than two samples", () => {
    expect(jitter([])).toBe(0);
    expect(jitter([42])).toBe(0);
  });
});

describe("toMbps", () => {
  it("converts bytes over milliseconds to megabits per second", () => {
    // 1 250 000 bytes in 1 s = 10 000 000 bits/s = 10 Mbps
    expect(toMbps(1_250_000, 1000)).toBe(10);
  });
  it("guards against zero or negative duration", () => {
    expect(toMbps(1000, 0)).toBe(0);
    expect(toMbps(1000, -5)).toBe(0);
  });
});

describe("ThroughputMeter", () => {
  function meterWithRamp() {
    // t=0 start; 1 MB/s during warm-up, then 10 MB/s steady (bytes cumulative).
    const m = new ThroughputMeter(0);
    m.addBytes(500, 500_000);
    m.addBytes(1000, 500_000);
    m.addBytes(1500, 500_000); // end of warm-up: 1.5 MB total at 1.5 s
    for (let t = 2000; t <= 5000; t += 500) m.addBytes(t, 5_000_000); // 10 MB/s
    return m;
  }

  it("instant speed uses only the trailing window", () => {
    const m = meterWithRamp();
    // last 1 s (t 4000→5000): 10 MB → 80 Mbps
    expect(m.instant(5000, 1000)).toBeCloseTo(80, 6);
  });

  it("average skips the warm-up window", () => {
    const m = meterWithRamp();
    // from 1.5 s to 5 s: 35 MB over 3.5 s = 10 MB/s = 80 Mbps
    expect(m.average(1500)).toBeCloseTo(80, 6);
    // without skipping: 36.5 MB over 5 s = 58.4 Mbps
    expect(m.average(0)).toBeCloseTo(58.4, 6);
  });

  it("falls back to the full span when the test is shorter than the warm-up", () => {
    const m = new ThroughputMeter(0);
    m.addBytes(200, 250_000);
    m.addBytes(400, 250_000);
    expect(m.average(1500)).toBeCloseTo(toMbps(500_000, 400), 6);
  });

  it("returns 0 before any data", () => {
    const m = new ThroughputMeter(0);
    expect(m.instant(100, 1000)).toBe(0);
    expect(m.average(0)).toBe(0);
    expect(m.totalBytes).toBe(0);
  });
});
