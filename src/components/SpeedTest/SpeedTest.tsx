"use client";

import { useState } from "react";
import { formatMbps, formatMs } from "@/lib/format";
import type { Phase } from "@/lib/speedtest/types";
import { ConnectionPanel } from "./ConnectionPanel";
import { Gauge } from "./Gauge";
import { History } from "./History";
import { ResultCards } from "./ResultCards";
import { useSpeedTest } from "./useSpeedTest";
import { Verdict } from "./Verdict";
import styles from "./SpeedTest.module.css";

const PHASE_LABEL: Record<Phase, string> = {
  idle: "Pronto para medir sua velocidade",
  latency: "Medindo ping e jitter…",
  download: "Medindo velocidade de download…",
  upload: "Medindo velocidade de upload…",
  done: "Teste concluído",
  error: "Falha no teste",
  cancelled: "Teste cancelado",
};

const RUNNING: ReadonlySet<Phase> = new Set(["latency", "download", "upload"]);

export function SpeedTest() {
  const { state, history, start, cancel, clearHistory } = useSpeedTest();
  const [copied, setCopied] = useState(false);
  const running = RUNNING.has(state.phase);
  const result = state.result;

  const gauge = (() => {
    switch (state.phase) {
      case "latency":
        return { value: 0, color: "var(--color-ping)", readout: state.live > 0 ? formatMs(state.live) : "—", unit: "ms", caption: PHASE_LABEL.latency };
      case "download":
        return { value: state.live, color: "var(--color-download)", readout: formatMbps(state.live), unit: "Mbps", caption: PHASE_LABEL.download };
      case "upload":
        return { value: state.live, color: "var(--color-upload)", readout: formatMbps(state.live), unit: "Mbps", caption: PHASE_LABEL.upload };
      case "done":
        return { value: result?.download ?? 0, color: "var(--color-download)", readout: formatMbps(result?.download ?? 0), unit: "Mbps", caption: "Velocidade de download" };
      default:
        return { value: 0, color: "var(--color-download)", readout: "0", unit: "Mbps", caption: PHASE_LABEL[state.phase] };
    }
  })();

  async function copyResult() {
    if (!result) return;
    const text = `Meu teste de velocidade: download ${formatMbps(result.download)} Mbps, upload ${formatMbps(result.upload)} Mbps, ping ${formatMs(result.ping)} ms, jitter ${formatMs(result.jitter)} ms${result.connection?.isp ? ` (${result.connection.isp})` : ""} — ${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copie o resultado:", text);
    }
  }

  const announcement =
    state.phase === "done" && result
      ? `Teste concluído. Download ${formatMbps(result.download)} megabits por segundo, upload ${formatMbps(result.upload)} megabits por segundo, ping ${formatMs(result.ping)} milissegundos.`
      : state.phase === "error"
        ? `Falha no teste. ${state.error ?? ""}`
        : PHASE_LABEL[state.phase];

  return (
    <section className={styles.tester} aria-label="Medidor de velocidade">
      <div className={styles.stage}>
        <Gauge value={gauge.value} color={gauge.color} readout={gauge.readout} unit={gauge.unit} caption={gauge.caption} />

        <div className={styles.controls}>
          {running ? (
            <>
              <progress className={styles.progress} value={state.progress} max={1} aria-label={PHASE_LABEL[state.phase]} />
              <button type="button" className="btn btn--danger" onClick={cancel}>
                Cancelar
              </button>
            </>
          ) : (
            <button type="button" className="btn btn--lg" onClick={() => void start()}>
              {state.phase === "idle" ? "Iniciar teste" : "Testar novamente"}
            </button>
          )}
        </div>

        {state.phase === "error" ? (
          <p className="notice notice--error" role="alert">
            {state.error}
          </p>
        ) : null}
        {state.phase === "cancelled" ? <p className="notice notice--warning">Teste cancelado. Clique em “Testar novamente” para medir sua conexão.</p> : null}

        <ResultCards partial={state.partial} phase={state.phase} live={state.live} rated={state.phase === "done"} />
        <ConnectionPanel info={state.connection} />
      </div>

      {result ? (
        <>
          <Verdict metrics={result} />
          <div className={styles.actions}>
            <button type="button" className="btn btn--ghost" onClick={() => void copyResult()}>
              {copied ? "Resultado copiado!" : "Copiar resultado"}
            </button>
            <a className="btn btn--ghost" href="#como-funciona">
              Entender os resultados
            </a>
          </div>
        </>
      ) : null}

      <History items={history} onClear={clearHistory} />

      <div role="status" aria-live="polite" className="visually-hidden">
        {announcement}
      </div>
    </section>
  );
}
