import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <h1>Página não encontrada</h1>
      <p className="section__lead" style={{ margin: "0 auto 1.5rem" }}>
        O endereço que você acessou não existe ou foi movido. Que tal fazer um teste de velocidade?
      </p>
      <Link href="/" className="btn">
        Ir para o teste de velocidade
      </Link>
    </div>
  );
}
