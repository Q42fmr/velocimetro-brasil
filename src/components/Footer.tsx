import { site } from "@/config/site";
import { LogoMark } from "@/components/Logo";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.brand}>
            <LogoMark size={30} />
            <strong>{site.name}</strong>
          </div>
          <p className={styles.text}>
            Teste de velocidade de internet gratuito, sem instalação e sem cadastro. Meça download, upload, ping e jitter
            da sua conexão banda larga direto no navegador.
          </p>
        </div>

        <nav aria-label="Páginas">
          <h2 className={styles.heading}>Navegação</h2>
          <ul className={styles.list}>
            {site.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Políticas">
          <h2 className={styles.heading}>Legal</h2>
          <ul className={styles.list}>
            {site.footerLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Dados da empresa</h2>
          <address className={styles.address}>
            <span>{site.legal.razaoSocial}</span>
            <span>CNPJ: {site.legal.cnpj}</span>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </address>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>
          © {year} {site.legal.razaoSocial} Todos os direitos reservados.
        </span>
        <span>Os resultados do teste de velocidade são estimativas e podem variar conforme a rede e o dispositivo.</span>
      </div>
    </footer>
  );
}
