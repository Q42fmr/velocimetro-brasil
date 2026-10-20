import { site } from "@/config/site";
import styles from "./LeadForm.module.css";

/**
 * Formulário de contato da home — o ÚNICO do site.
 * A tag <form> é propositalmente "nua" (sem action/method/handlers): o envio nativo
 * vai por GET para a própria index.php, onde o bloco PHP lê `name`/`email`/…,
 * dispara os pixels configurados e redireciona para thank-you.html.
 */
export function LeadForm() {
  return (
    <section className="section section--alt" id="contacts" aria-labelledby="contato-titulo">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h2 id="contato-titulo" className="section__title">
              Fale conosco
            </h2>
            <p className="section__lead">
              Dúvida sobre o teste de velocidade, resultado inesperado ou sugestão? Preencha o formulário — respondemos
              pelo e-mail informado em dias úteis.
            </p>
            <address className={styles.requisites}>
              <span>{site.legal.razaoSocial}</span>
              <span>CNPJ: {site.legal.cnpj}</span>
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              <span>Atendimento: segunda a sexta, das 9h às 18h (horário de Brasília)</span>
            </address>
          </div>

          <form id="lead" className={styles.form}>
            <div className={styles.row}>
              <div className="field">
                <label className="field__label" htmlFor="lead-name">
                  Nome
                </label>
                <input className="input" id="lead-name" name="name" type="text" required autoComplete="given-name" />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="lead-lastname">
                  Sobrenome <span className="field__hint">(opcional)</span>
                </label>
                <input className="input" id="lead-lastname" name="lastname" type="text" autoComplete="family-name" />
              </div>
            </div>
            <div className={styles.row}>
              <div className="field">
                <label className="field__label" htmlFor="lead-email">
                  E-mail
                </label>
                <input className="input" id="lead-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="lead-phone">
                  Telefone <span className="field__hint">(opcional)</span>
                </label>
                <input className="input" id="lead-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="lead-message">
                Mensagem <span className="field__hint">(opcional)</span>
              </label>
              <textarea className="textarea" id="lead-message" name="message" maxLength={2000} />
            </div>
            <button type="submit" className="btn btn--lg">
              Enviar mensagem
            </button>
            <p className={styles.consent}>
              Ao enviar, você concorda com a <a href="politica-de-privacidade.html">Política de Privacidade</a> e os{" "}
              <a href="termos-de-uso.html">Termos de Uso</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
