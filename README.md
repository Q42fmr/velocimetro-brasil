# Velocímetro Brasil — teste de velocidade de internet

Статический сайт (pt-BR) с реальным чекером скорости: download, upload, ping, jitter.
Next.js 16 (App Router, `output: "export"`), React 19, TypeScript, CSS Modules. Бэкенда нет.

## Команды

| Команда | Что делает |
|---|---|
| `npm install` | зависимости |
| `npm run dev` | дев-сервер `http://localhost:3000` |
| `npm run build` | сборка → папка `out/` (готовый статический сайт, `index.html`) |
| `npm run build:php` | то же, но главная — `index.php` с PHP-трекингом (см. ниже); для PHP-хостинга |
| `npm run preview` | отдать `out/` локально на `http://localhost:8080` (только статический вариант) |
| `npm test` | юнит-тесты чистой математики (Vitest) |
| `npm run typecheck` | `tsc --noEmit` |

## Деплой

Папка `out/` самодостаточна: все ссылки и ассеты относительные (`./_next/…`, `faq.html`), страницы — плоские
файлы в корне. Её можно:

- залить в корень или **любую подпапку** любого хостинга (nginx, Apache, IIS, shared-хостинг, S3, Netlify, Vercel,
  Cloudflare Pages, GitHub Pages) — без настройки base path и rewrites;
- открыть прямо с диска (`out/index.html`) — всё работает, кроме блока «Provedor / IP» (Cloudflare не отвечает на
  `/meta` с origin `null`; на любом http(s)-адресе блок появляется).

Страницы: `index.html`, `faq.html`, `glossario.html`, `fale-conosco.html`, `politica-de-privacidade.html`,
`termos-de-uso.html`, `politica-de-cookies.html`, `404.html`. Опционально для «красивых» URL без `.html`:
nginx `try_files $uri $uri.html $uri/ =404;` (`serve`, GitHub Pages, Netlify делают это сами).

`npm run build` после `next build` запускает `scripts/clean-export.mjs`: из `out/` удаляются служебные файлы Next
(RSC-payload'ы `*.txt`, папки `<маршрут>/__next.*`, `_not-found.*`, манифесты и чанки, на которые не ссылается ни одна
страница). Остаётся только то, что сайт реально загружает: 8 html, `_next/static/chunks/`, `icon.svg`, `og.png`,
`robots.txt`, `sitemap.xml`, `.nojekyll` (~1 МБ).

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

`site.url` — канонический домен, единственное абсолютное значение: попадает только в `canonical`, OG, `sitemap.xml`,
`robots.txt`, JSON-LD (по спецификации они обязаны быть абсолютными). На сборке переопределяется через
`NEXT_PUBLIC_SITE_URL` (так делает workflow GitHub Pages). Если домена ещё нет — ничего менять не нужно, сайт работает.

## PHP-вариант (index.php + трекинг)

`npm run build:php` = статическая сборка + `scripts/php-index.mjs`: главная превращается в `index.php` с тремя
PHP-блоками из кита `Whites_maker/spec_footer` (файлы `scripts/php/*.php` — скопированы дословно, **не править**):
перед `<!DOCTYPE>`, перед `</head>`, сразу после `<body>`. `index.html` удаляется, все ссылки на главную
переписываются на `index.php`. Остальные страницы — обычные `.html`.

Как работает: на главной одна «голая» `<form id="lead">` (без `action`/`method`/JS) с полями `name`, `lastname`,
`email`, `phone`, `message`. Отправка — нативный GET на ту же `index.php`; PHP-блок видит `?name`/`?email`,
вызывает настроенные пиксели и через 500 мс редиректит на `/thank-you.html` (страница есть, `noindex`).
Страница `fale-conosco.html` формы не содержит — ведёт на `index.php#contacts`.

Настройка — переменные окружения (`.env` в `landings/`, читается через Dotenv при `$isDev = false`):
`GA4_MEASUREMENT_ID`, `GOOGLE_CONVERSION_LABEL`, `BING_PIXEL_ID`, `FB_PIXEL_ID`, `FB_EVENT_NAME`,
`WHITE_FORM_RETURN_PAGE` (по умолчанию `thank-you`). Пока `$isDev = true`, пиксели выключены, редирект работает.
Хостингу нужен PHP ≥ 8.0 (`str_ends_with`). Политики конфиденциальности/cookies уже описывают эти пиксели.

## Сервер измерения

По умолчанию `https://speed.cloudflare.com` (`site.speedtest.baseUrl`). Свой сервер должен отдавать с CORS `*`:

- `GET /__down?bytes=N` → N байт, `Cache-Control: no-store`;
- `POST /__up` → `200` (тело отбрасывается);
- опционально `GET /meta` → JSON `{clientIp, asn, asOrganization, city, region, country, colo:{iata,city,cca2}}`
  и заголовок `Server-Timing: cfSpeedEdge;dur=…` (вычитается из пинга).

Длительность фаз, число потоков и размер блоков — там же в `site.speedtest`.
Один прогон теста скачивает/отправляет ~150–300 МБ.

## Хранилище в браузере

Только `localStorage`, без сторонних cookies/аналитики: `vb:font-scale`, `vb:contrast`, `vb:cookie-consent`, `vb:history` (последние 20 результатов). Всё перечислено в `politica-de-cookies.html`.
