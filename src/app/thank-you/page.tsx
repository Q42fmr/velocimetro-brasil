import type { Metadata } from "next";
import { site } from "@/config/site";
import { ThankYouHeading } from "./ThankYouHeading";
import styles from "./page.module.css";

/** Única página com noindex: destino do redirecionamento após o envio do formulário (bloco PHP da home). */
export const metadata: Metadata = {
  title: "Mensagem enviada",
  description: "Recebemos sua mensagem. Nossa equipe responde em dias úteis pelo e-mail informado.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <svg className={styles.icon} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <circle cx="32" cy="32" r="30" fill="var(--color-primary-soft)" stroke="var(--color-primary)" strokeWidth="3" />
          <path d="M20 33l8 8 16-18" fill="none" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <ThankYouHeading />
        <p className={styles.text}>
          Recebemos sua mensagem. Nossa equipe responde pelo e-mail informado em dias úteis, de segunda a sexta, das 9h
          às 18h (horário de Brasília).
        </p>
        <ol className={styles.steps}>
          <li>Conferimos sua dúvida ou sugestão sobre o teste de velocidade.</li>
          <li>Se precisarmos de mais detalhes (operadora, plano, resultado), escrevemos para você.</li>
          <li>Você recebe a resposta no e-mail informado.</li>
        </ol>
        <p>
          <a href="index.html" className="btn btn--lg">
            Voltar ao teste de velocidade
          </a>
        </p>
        <p className={styles.muted}>
          Contato direto: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
      </div>
    </div>
  );
}
