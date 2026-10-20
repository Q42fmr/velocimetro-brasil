"use client";

import { useEffect, useState } from "react";
import { A11Y_CONTRAST_KEY, A11Y_FONT_KEY } from "@/lib/storageKeys";
import styles from "./AccessibilityBar.module.css";

const MIN_SCALE = -1;
const MAX_SCALE = 2;

function readScale(): number {
  const v = Number(document.documentElement.dataset.fontScale ?? "0");
  return Number.isFinite(v) ? v : 0;
}

/** Barra "Fonte padrão / + / − / Contraste", como nos portais públicos brasileiros. */
export function AccessibilityBar() {
  const [scale, setScale] = useState(0);
  const [highContrast, setHighContrast] = useState(false);

  // Sincroniza o estado React com o que o script inline já aplicou no <html>.
  useEffect(() => {
    setScale(readScale());
    setHighContrast(document.documentElement.dataset.contrast === "high");
  }, []);

  function applyScale(next: number) {
    const clamped = Math.max(MIN_SCALE, Math.min(MAX_SCALE, next));
    setScale(clamped);
    document.documentElement.dataset.fontScale = String(clamped);
    try {
      localStorage.setItem(A11Y_FONT_KEY, String(clamped));
    } catch {
      /* armazenamento indisponível (modo privado) — segue sem persistir */
    }
  }

  function toggleContrast() {
    const next = !highContrast;
    setHighContrast(next);
    if (next) document.documentElement.dataset.contrast = "high";
    else delete document.documentElement.dataset.contrast;
    try {
      localStorage.setItem(A11Y_CONTRAST_KEY, next ? "high" : "normal");
    } catch {
      /* idem */
    }
  }

  return (
    <div className={styles.bar} role="group" aria-label="Acessibilidade do site">
      <div className={`container ${styles.inner}`}>
        <span className={styles.label}>Acessibilidade:</span>
        <button type="button" className={styles.btn} onClick={() => applyScale(0)} disabled={scale === 0}>
          Fonte padrão
        </button>
        <button type="button" className={styles.btn} onClick={() => applyScale(scale + 1)} disabled={scale >= MAX_SCALE} aria-label="Aumentar fonte">
          A+
        </button>
        <button type="button" className={styles.btn} onClick={() => applyScale(scale - 1)} disabled={scale <= MIN_SCALE} aria-label="Diminuir fonte">
          A−
        </button>
        <button type="button" className={styles.btn} onClick={toggleContrast} aria-pressed={highContrast}>
          Alternar contraste
        </button>
      </div>
    </div>
  );
}
