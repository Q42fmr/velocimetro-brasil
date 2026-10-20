"use client";

import { useState, type FormEvent } from "react";

import { site } from "@/config/site";
import styles from "./ContactForm.module.css";

const ASSUNTOS = [
  "Dúvida sobre o teste de velocidade",
  "Resultado inesperado",
  "Sugestão",
  "Problema técnico no site",
  "Privacidade e dados pessoais (LGPD)",
  "Outro assunto",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const usesMailto = site.contactFormAction === "";
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!usesMailto) {
      // Deixa o envio nativo (action/method) acontecer; apenas bloqueia o honeypot.
      const form = event.currentTarget;
      const honeypot = form.elements.namedItem("website");
      if (honeypot instanceof HTMLInputElement && honeypot.value !== "") {
        event.preventDefault();
      }
      return;
    }

    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const honeypot = form.elements.namedItem("website");
    if (honeypot instanceof HTMLInputElement && honeypot.value !== "") {
      return;
    }

    const nome = (form.elements.namedItem("nome") as HTMLInputElement | null)?.value ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value ?? "";
    const assunto = (form.elements.namedItem("assunto") as HTMLSelectElement | null)?.value ?? "";
    const mensagem = (form.elements.namedItem("mensagem") as HTMLTextAreaElement | null)?.value ?? "";

    const subject = encodeURIComponent(`[Site] ${assunto}`);
    const body = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`);
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;

    setStatus("sent");
  }

  return (
    <div>
      <form
        id="form-contato"
        className={styles.form}
        noValidate={false}
        action={usesMailto ? undefined : site.contactFormAction}
        method={usesMailto ? undefined : "post"}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <div className="field">
            <label className="field__label" htmlFor="nome">
              Nome
            </label>
            <input
              className="input"
              id="nome"
              name="nome"
              type="text"
              autoComplete="name"
              required
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="assunto">
            Assunto
          </label>
          <select className="select" id="assunto" name="assunto" required defaultValue="">
            <option value="" disabled>
              Selecione um assunto
            </option>
            {ASSUNTOS.map((assunto) => (
              <option key={assunto} value={assunto}>
                {assunto}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="mensagem">
            Mensagem
          </label>
          <textarea
            className="textarea"
            id="mensagem"
            name="mensagem"
            required
            minLength={10}
            maxLength={2000}
            aria-describedby="mensagem-hint"
          />
          <span className="field__hint" id="mensagem-hint">
            Entre 10 e 2000 caracteres.
          </span>
        </div>

        <div className="field">
          <label className={styles.honeypot} htmlFor="website">
            Não preencha este campo
          </label>
          <input
            className={styles.honeypot}
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
        </div>

        <label className="checkbox">
          <input type="checkbox" name="consentimento" required />
          <span>
            Li e concordo com a{" "}
            <a href="politica-de-privacidade.html" >Política de Privacidade</a>.
          </span>
        </label>

        <button type="submit" className="btn btn--lg">
          Enviar mensagem
        </button>

        {status === "sent" ? (
          <p className="notice" role="status">
            Seu aplicativo de e-mail foi aberto com a mensagem preenchida. Se não abriu, escreva
            diretamente para {site.contactEmail}.
          </p>
        ) : null}
      </form>

      <aside className={styles.aside}>
        <h2>Outras formas de contato</h2>
        <address>
          E-mail:{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          <br />
          {site.legal.razaoSocial}
          <br />
          CNPJ: {site.legal.cnpj}
        </address>
      </aside>
    </div>
  );
}
