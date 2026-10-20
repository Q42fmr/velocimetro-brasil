"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { site } from "@/config/site";
import { LogoMark } from "@/components/Logo";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navId = useId();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label={`${site.name} — página inicial`} onClick={() => setOpen(false)}>
          <LogoMark />
          <span className={styles.brandText}>
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>

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
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.replace(/\/$/, ""));
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
