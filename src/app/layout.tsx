import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { AccessibilityBar } from "@/components/AccessibilityBar";
import { A11Y_CONTRAST_KEY, A11Y_FONT_KEY } from "@/lib/storageKeys";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  icons: { icon: "/icon.svg" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b57d0",
};

/* Aplica fonte/contraste salvos antes da primeira pintura (sem "flash"). */
const a11yBootScript = `(function(){try{var d=document.documentElement,f=localStorage.getItem(${JSON.stringify(A11Y_FONT_KEY)}),c=localStorage.getItem(${JSON.stringify(A11Y_CONTRAST_KEY)});if(f&&f!=="0")d.dataset.fontScale=f;if(c==="high")d.dataset.contrast="high";}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.lang}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: a11yBootScript }} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${site.url}/#organization`,
                name: site.name,
                legalName: site.legal.razaoSocial,
                taxID: site.legal.cnpj,
                url: site.url,
                email: site.contactEmail,
                logo: `${site.url}/icon.svg`,
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                name: site.name,
                url: site.url,
                inLanguage: site.lang,
                publisher: { "@id": `${site.url}/#organization` },
              },
            ],
          }}
        />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <a href="#conteudo" className="skip-link">
          Ir para o conteúdo
        </a>
        <AccessibilityBar />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
