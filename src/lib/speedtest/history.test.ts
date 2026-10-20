import { describe, expect, it } from "vitest";
import { HISTORY_MAX, loadHistory, pushHistory, saveHistory } from "./history";
import type { SpeedTestResult } from "./types";

function result(n: number): SpeedTestResult {
  return { id: `r${n}`, timestamp: n, ping: 10, jitter: 1, download: 100, upload: 50 };
}

function memoryStorage(initial: Record<string, string> = {}): Storage {
  const data: Record<string, string> = { ...initial };
  return {
    get length() {
      return Object.keys(data).length;
    },
    clear: () => {
      for (const k of Object.keys(data)) delete data[k];
    },
    getItem: (k) => data[k] ?? null,
    key: (i) => Object.keys(data)[i] ?? null,
    removeItem: (k) => {
      delete data[k];
    },
    setItem: (k, v) => {
      data[k] = String(v);
    },
  };
}

describe("pushHistory", () => {
  it("prepends the newest result and keeps at most HISTORY_MAX entries", () => {
    let list: SpeedTestResult[] = [];
    for (let i = 1; i <= HISTORY_MAX + 5; i++) list = pushHistory(list, result(i));
    expect(list).toHaveLength(HISTORY_MAX);
    expect(list[0]?.id).toBe(`r${HISTORY_MAX + 5}`);
    expect(list[HISTORY_MAX - 1]?.id).toBe("r6");
  });
  it("does not mutate the input array", () => {
    const original = [result(1)];
    pushHistory(original, result(2));
    expect(original).toHaveLength(1);
  });
});

describe("loadHistory / saveHistory", () => {
  it("round-trips through storage", () => {
    const s = memoryStorage();
    saveHistory(s, [result(2), result(1)]);
    expect(loadHistory(s).map((r) => r.id)).toEqual(["r2", "r1"]);
  });
  it("returns [] for missing or corrupt data", () => {
    expect(loadHistory(memoryStorage())).toEqual([]);
    expect(loadHistory(memoryStorage({ "vb:history": "{not json" }))).toEqual([]);
    expect(loadHistory(memoryStorage({ "vb:history": '{"a":1}' }))).toEqual([]);
  });
  it("drops entries that are not valid results", () => {
    const s = memoryStorage({
      "vb:history": JSON.stringify([result(1), { id: "x" }, null, { ...result(2), download: "fast" }]),
    });
    expect(loadHistory(s).map((r) => r.id)).toEqual(["r1"]);
  });
});
