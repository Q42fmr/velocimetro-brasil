"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { isAbortError, runSpeedTest, SpeedTestError } from "@/lib/speedtest/engine";
import { loadHistory, pushHistory, saveHistory } from "@/lib/speedtest/history";
import type { ConnectionInfo, Metrics, Phase, SpeedTestResult } from "@/lib/speedtest/types";

export interface SpeedTestState {
  phase: Phase;
  progress: number;
  live: number;
  partial: Partial<Metrics>;
  connection?: ConnectionInfo;
  result?: SpeedTestResult;
  error?: string;
}

const IDLE: SpeedTestState = { phase: "idle", progress: 0, live: 0, partial: {} };

export function useSpeedTest() {
  const [state, setState] = useState<SpeedTestState>(IDLE);
  const [history, setHistory] = useState<SpeedTestResult[]>([]);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    setHistory(loadHistory(localStorage));
    return () => controller.current?.abort();
  }, []);

  const start = useCallback(async () => {
    controller.current?.abort();
    const ctl = new AbortController();
    controller.current = ctl;
    setState({ ...IDLE, phase: "latency" });
    try {
      const result = await runSpeedTest(site.speedtest, (p) => setState((s) => ({ ...s, ...p })), ctl.signal);
      if (ctl.signal.aborted) return;
      setState({ phase: "done", progress: 1, live: 0, partial: result, connection: result.connection, result });
      setHistory((h) => {
        const next = pushHistory(h, result);
        saveHistory(localStorage, next);
        return next;
      });
    } catch (e) {
      if (isAbortError(e) || ctl.signal.aborted) {
        setState((s) => ({ ...s, phase: "cancelled", live: 0 }));
        return;
      }
      const message =
        e instanceof SpeedTestError
          ? e.message
          : "Ocorreu um erro inesperado durante o teste de velocidade. Tente novamente em alguns instantes.";
      setState((s) => ({ ...s, phase: "error", live: 0, error: message }));
    }
  }, []);

  const cancel = useCallback(() => controller.current?.abort(), []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory(localStorage, []);
  }, []);

  return { state, history, start, cancel, clearHistory };
}
