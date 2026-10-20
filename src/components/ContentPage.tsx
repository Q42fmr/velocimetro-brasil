import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

interface Props {
  title: string;
  lead?: string;
  crumbs: Crumb[];
  children: ReactNode;
  /** Largura total (sem `.prose`) — para páginas com grids. */
  wide?: boolean;
}

/** Cabeçalho padrão das páginas internas: trilha, H1, lead e corpo. */
export function ContentPage({ title, lead, crumbs, children, wide }: Props) {
  return (
    <div className="container">
      <Breadcrumbs items={crumbs} />
      <header className="page-head">
        <h1 className="page-head__title">{title}</h1>
        {lead ? <p className="page-head__lead">{lead}</p> : null}
      </header>
      <div className={wide ? undefined : "prose"} style={{ paddingBottom: "3rem" }}>
        {children}
      </div>
    </div>
  );
}
