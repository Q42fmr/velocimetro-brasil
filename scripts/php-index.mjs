/**
 * Transforma a home exportada em `index.php` com o bloco PHP de rastreamento
 * (scripts/php/*.php — copiados literalmente do kit, não editar), nos três
 * pontos exigidos: antes do DOCTYPE, antes de </head> e logo após <body>.
 *
 * Também troca `index.html` → `index.php` em todos os links do site e remove o
 * `index.html` (se os dois existirem, o servidor serve o .html e o PHP nunca roda).
 *
 * Uso: `npm run build:php` (após `next build` + clean-export).
 */
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const PHP = new URL("./php/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const block = (name) => readFileSync(join(PHP, name), "utf8").replace(/\r\n/g, "\n").replace(/\n$/, "");

const html = readFileSync(join(OUT, "index.html"), "utf8");

const doctype = html.indexOf("<!DOCTYPE html>");
const headEnd = html.indexOf("</head>");
const bodyOpen = html.indexOf("<body");
const bodyTagEnd = html.indexOf(">", bodyOpen);
if (doctype !== 0 || headEnd < 0 || bodyOpen < 0) throw new Error("index.html: DOCTYPE/head/body não encontrados");

// Sem quebras de linha ANTES de `<?php` (virariam nós de texto e quebrariam a hidratação do React);
// a quebra logo após `?>` o próprio PHP descarta.
const php =
  block("1-before-doctype.php") +
  "\n" +
  html.slice(0, headEnd) +
  block("2-before-head-end.php") +
  "\n" +
  html.slice(headEnd, bodyTagEnd + 1) +
  block("3-after-body.php") +
  "\n" +
  html.slice(bodyTagEnd + 1);

writeFileSync(join(OUT, "index.php"), php);
rmSync(join(OUT, "index.html"));

// Links internos para a home: index.html → index.php (href="index.html", href="index.html#…").
let rewritten = 0;
for (const name of readdirSync(OUT)) {
  if (!name.endsWith(".html") && name !== "index.php") continue;
  const path = join(OUT, name);
  const src = readFileSync(path, "utf8");
  const next = src.replace(/href="index\.html(#[^"]*)?"/g, (_m, hash = "") => `href="index.php${hash}"`);
  if (next !== src) {
    writeFileSync(path, next);
    rewritten++;
  }
}
console.log(`php-index: index.php gerado, index.html removido, links reescritos em ${rewritten} arquivo(s)`);
