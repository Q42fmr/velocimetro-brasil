import { describe, expect, it } from "vitest";
import { rateDownload, rateUpload, ratePing, rateJitter, activityVerdicts } from "./verdict";

describe("ratings", () => {
  it("rates download by thresholds 100/25/10 Mbps", () => {
    expect(rateDownload(100)).toBe("excelente");
    expect(rateDownload(99.9)).toBe("boa");
    expect(rateDownload(25)).toBe("boa");
    expect(rateDownload(24)).toBe("regular");
    expect(rateDownload(10)).toBe("regular");
    expect(rateDownload(9.9)).toBe("ruim");
  });
  it("rates upload by thresholds 50/10/3 Mbps", () => {
    expect(rateUpload(50)).toBe("excelente");
    expect(rateUpload(10)).toBe("boa");
    expect(rateUpload(3)).toBe("regular");
    expect(rateUpload(2.9)).toBe("ruim");
  });
  it("rates ping by thresholds 20/50/100 ms (lower is better)", () => {
    expect(ratePing(20)).toBe("excelente");
    expect(ratePing(20.1)).toBe("boa");
    expect(ratePing(50)).toBe("boa");
    expect(ratePing(100)).toBe("regular");
    expect(ratePing(101)).toBe("ruim");
  });
  it("rates jitter by thresholds 5/15/30 ms", () => {
    expect(rateJitter(5)).toBe("excelente");
    expect(rateJitter(15)).toBe("boa");
    expect(rateJitter(30)).toBe("regular");
    expect(rateJitter(31)).toBe("ruim");
  });
});

describe("activityVerdicts", () => {
  it("fibre-class connection gets the best labels", () => {
    const v = activityVerdicts({ download: 300, upload: 150, ping: 8, jitter: 1 });
    expect(v.streaming.label).toBe("4K");
    expect(v.jogos.ok).toBe(true);
    expect(v.videochamada.ok).toBe(true);
    expect(v.navegacao.ok).toBe(true);
  });
  it("high ping kills gaming even with high bandwidth", () => {
    const v = activityVerdicts({ download: 300, upload: 150, ping: 180, jitter: 2 });
    expect(v.jogos.ok).toBe(false);
  });
  it("low upload degrades video calls", () => {
    const v = activityVerdicts({ download: 50, upload: 1, ping: 30, jitter: 3 });
    expect(v.videochamada.ok).toBe(false);
  });
  it("streaming tiers follow download", () => {
    expect(activityVerdicts({ download: 25, upload: 5, ping: 30, jitter: 3 }).streaming.label).toBe("4K");
    expect(activityVerdicts({ download: 8, upload: 5, ping: 30, jitter: 3 }).streaming.label).toBe("Full HD");
    expect(activityVerdicts({ download: 3, upload: 5, ping: 30, jitter: 3 }).streaming.label).toBe("HD");
    expect(activityVerdicts({ download: 1, upload: 5, ping: 30, jitter: 3 }).streaming.ok).toBe(false);
  });
});
