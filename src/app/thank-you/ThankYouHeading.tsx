"use client";

import { useEffect, useState } from "react";

/** "Obrigado, Maria!" quando a URL traz `?name=` (texto escapado pelo React — nunca HTML). */
export function ThankYouHeading() {
  const [name, setName] = useState("");
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("name")?.trim() ?? "";
    setName(raw.slice(0, 60));
  }, []);
  return <h1>{name ? `Obrigado, ${name}!` : "Obrigado!"}</h1>;
}
