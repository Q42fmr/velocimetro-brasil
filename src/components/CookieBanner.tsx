"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_KEY } from "@/lib/storageKeys";
import styles from "./CookieBanner.module.css";

/** Aviso de cookies/armazenamento local. Some após "Entendi" (preferência salva localmente). */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function accept() {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {
      /* sem armazenamento: o aviso volta na próxima visita */
    }
    setVisible(false);
  }

  return (
    <div className={styles.banner} role="region" aria-label="Aviso de cookies">
      <p className={styles.text}>
        Usamos armazenamento local e cookies estritamente necessários para guardar suas preferências de acessibilidade e o
        histórico dos seus testes de velocidade neste dispositivo. Saiba mais na{" "}
        <Link href="/politica-de-cookies/">Política de Cookies</Link>.
      </p>
      <button type="button" className="btn" onClick={accept}>
        Entendi
      </button>
    </div>
  );
}
