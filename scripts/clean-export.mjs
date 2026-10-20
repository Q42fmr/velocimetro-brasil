/**
 * Limpa `out/` após `next build`, deixando só o que o site usa:
 *   *.html, _next/static/chunks referenciados pelo HTML, icon.svg, og.png, robots.txt, sitemap.xml, .nojekyll.
 *
 * Removido (artefatos da navegação client-side do App Router, que o site não usa — links são <a> comuns):
 *   - payloads RSC: *.txt e pastas <rota>/__next.*
 *   - _not-found.* (o 404.html é a mesma página)
 *   - manifests _next/static/<buildId>/ e chunks não referenciados por nenhuma página
 */
import { readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const CHUNKS = join(OUT, "_next", "static", "chunks");
const KEEP_ROOT_FILES = new Set(["robots.txt", "sitemap.xml", "icon.svg", "og.png", ".nojekyll", "404.html"]);

const removed = [];
function rm(path) {
  rmSync(path, { recursive: true, force: true });
  removed.push(relative(OUT, path).replace(/\\/g, "/"));
}

// 1. Raiz: mantém *.html (exceto _not-found) e os arquivos fixos; apaga o resto (txt, pastas de rota).
for (const name of readdirSync(OUT)) {
  if (name === "_next" || KEEP_ROOT_FILES.has(name)) continue;
  const path = join(OUT, name);
  if (statSync(path).isDirectory() || !name.endsWith(".html") || name.startsWith("_not-found")) rm(path);
}

// 2. Chunks referenciados por alguma página (src/href e caminhos dentro do payload inline).
const html = readdirSync(OUT)
  .filter((n) => n.endsWith(".html"))
  .map((n) => readFileSync(join(OUT, n), "utf8"))
  .join("\n");
const referenced = new Set([...html.matchAll(/static\/chunks\/([A-Za-z0-9_.-]+\.(?:js|css))/g)].map((m) => m[1]));
for (const name of readdirSync(CHUNKS)) {
  if (!referenced.has(name)) rm(join(CHUNKS, name));
}

// 3. Dentro de _next: só `static/chunks` fica.
for (const name of readdirSync(join(OUT, "_next"))) {
  if (name !== "static") rm(join(OUT, "_next", name));
}
for (const name of readdirSync(join(OUT, "_next", "static"))) {
  if (name !== "chunks") rm(join(OUT, "_next", "static", name));
}

console.log(`clean-export: ${removed.length} itens removidos de out/`);
for (const r of removed) console.log(`  - ${r}`);
