# Velocímetro Brasil — teste de velocidade de internet

Статический сайт (pt-BR) с реальным чекером скорости: download, upload, ping, jitter.
Next.js 16 (App Router, `output: "export"`), React 19, TypeScript, CSS Modules. Бэкенда нет.

## Команды

| Команда | Что делает |
|---|---|
| `npm install` | зависимости |
| `npm run dev` | дев-сервер `http://localhost:3000` |
| `npm run build` | сборка → папка `out/` (готовый статический сайт) |
| `npm run preview` | отдать `out/` локально (`npx serve out`) |
| `npm test` | юнит-тесты чистой математики (Vitest) |
| `npm run typecheck` | `tsc --noEmit` |

Деплой: залить содержимое `out/` на любой статический хостинг (nginx, Netlify, Vercel, Cloudflare Pages, S3…).
Ссылки используют `trailingSlash` (`/faq/` → `out/faq/index.html`), rewrites не нужны.

## Где что менять

| Что | Файл |
|---|---|
| Название, домен, e-mail, юр. данные (Razão Social, CNPJ), ссылки меню | `src/config/site.ts` |
| Ключевые слова по страницам (meta keywords + тексты) | `src/content/keywords.ts` |
| FAQ (+ `FAQPage` JSON-LD) | `src/content/faq.ts` |
| Глоссарий (+ `DefinedTermSet` JSON-LD) | `src/content/glossary.ts` |
| Дата обновления юр. страниц | `src/content/legal.ts` |
| Тексты главной | `src/app/page.tsx` |
| Пороги оценок (Excelente/Boa/…) и вердикты по активностям | `src/lib/speedtest/verdict.ts` |
| Дизайн-токены, высокий контраст, масштаб шрифта | `src/app/globals.css` |

`site.url` — канонический домен: попадает в `canonical`, OG, `sitemap.xml`, `robots.txt`, JSON-LD.

## Форма Fale Conosco

`site.contactFormAction`:

- `""` (по умолчанию) — отправка открывает почтовый клиент (`mailto:` на `site.contactEmail`) с заполненными полями.
- URL своего скрипта — форма делает обычный `POST` с полями `nome`, `email`, `assunto`, `mensagem`
  (+ honeypot `website`, должен быть пустым). Разметка: `<form id="form-contato">` в `src/components/ContactForm.tsx`.

## Сервер измерения

По умолчанию `https://speed.cloudflare.com` (`site.speedtest.baseUrl`). Свой сервер должен отдавать с CORS `*`:

- `GET /__down?bytes=N` → N байт, `Cache-Control: no-store`;
- `POST /__up` → `200` (тело отбрасывается);
- опционально `GET /meta` → JSON `{clientIp, asn, asOrganization, city, region, country, colo:{iata,city,cca2}}`
  и заголовок `Server-Timing: cfSpeedEdge;dur=…` (вычитается из пинга).

Длительность фаз, число потоков и размер блоков — там же в `site.speedtest`.
Один прогон теста скачивает/отправляет ~150–300 МБ.

## Хранилище в браузере

Только `localStorage`, без сторонних cookies/аналитики: `vb:font-scale`, `vb:contrast`, `vb:cookie-consent`, `vb:history` (последние 20 результатов). Всё перечислено в `/politica-de-cookies/`.
