"use client";

import { useEffect, useId, useState } from "react";
import { site } from "@/config/site";
import { LogoMark } from "@/components/Logo";
import styles from "./Header.module.css";

/** Arquivo da página atual ("faq.html"; "" = home). Só no cliente: funciona em servidor, subpasta ou file://. */
function currentFile(): string {
  const last = window.location.pathname.split("/").pop() ?? "";
  return last === "index.html" ? "" : last;
}

export function Header() {
  const [current, setCurrent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navId = useId();

  useEffect(() => setCurrent(currentFile()), []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="index.html" className={styles.brand} aria-label={`${site.name} — página inicial`}>
          <LogoMark />
          <span className={styles.brandText}>
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={navId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span className={styles.burger} aria-hidden="true" data-open={open} />
        </button>

        <nav id={navId} className={styles.nav} data-open={open} aria-label="Principal">
          <ul>
            {site.nav.map((item) => {
              const file = item.href === "index.html" ? "" : item.href;
              const active = current !== null && current === file;
              return (
                <li key={item.href}>
                  <a href={item.href} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
