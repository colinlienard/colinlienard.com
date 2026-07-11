# colinlienard.com

Personal website of Colin Lienard, a French Full-Stack Engineer based in Limoges, France.

## About Colin

- Full-Stack Engineer specialized in **React & TypeScript**, with a focus on developer experience and modern web applications (+4 years of experience).
- Currently Full-Stack Engineer at **Mobsuccess** (2023–2026, Paris, remote), building web apps for advertising campaign management. Led technical migrations (CRA → Vite, JS → TS, React Router → TanStack Router, React Compiler) and performance/testing optimizations. Previously frontend apprentice at **Connivence** (2021–2022, Limoges).
- Open-source author: **sv-router** (type-safe routing for Svelte SPAs), **GitLight** (desktop GitHub/GitLab notifications), **GitHundred** (top 100 starred GitHub repos).
- Available for work (remote / Limoges). Contact: hello@colinlienard.com · cal.com/colinlienard · GitHub/LinkedIn/X/Malt: @colinlienard.

## Tech stack

- **Astro** (static site) with **Tailwind CSS** (`@tailwindcss/vite`, no config file — theme is defined in CSS).
- **TypeScript**, `pnpm` as package manager.
- Icons via **unplugin-icons** with Iconify (`heroicons`, `logos`) — imported as `virtual:icons/<set>/<name>`.
- Images via `astro:assets` (`<Image>`), optimized with `sharp`.
- SEO: `@astrojs/sitemap`, custom `Seo.astro` component.
- Linting/formatting: ESLint (flat config, `unicorn`, `simple-import-sort`) + Prettier (with astro + tailwind plugins). Tabs for indentation, single quotes.

## Structure

- `src/pages/index.astro` — French page (default). `src/pages/en/index.astro` — English page.
- `src/layouts/Layout.astro` — shared layout.
- `src/components/` — one component per section: `Hero`, `Experience`, `OpenSource`, `Stack`, `Contact`, `Nav`, `Footer`, `Seo`, `Sunlit`.
- `src/config.ts` — `CONTACT` object (all external links + email).
- `src/i18n/index.ts` — **all copy lives here.** Flat `ui` object keyed by locale (`fr`, `en`), accessed via `useTranslations(Astro.currentLocale)` → `t('some.key')`. **FR and EN must have the exact same keys** (the key type is derived from the `fr` object). French is `defaultLang`.

## Conventions

- Localize all user-facing text through `src/i18n/index.ts` — never hardcode copy in components (project/tech names like "GitHub", "React" are fine to leave inline).
- Copy style: keep the Hero `h1` as the job title (good for SEO); prefer action verbs and concrete/quantified results in experience bullets.
- Experience bullets can carry an optional `tooltip` (see `Experience.astro`): rendered as a dashed-underline trigger with a CSS hover/focus popup — used to surface metrics without cluttering the main line.

## Commands

- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm check` — `astro check` (type-check; run this after edits)
- `pnpm lint` / `pnpm lint:fix`
- `pnpm format` / `pnpm format:fix`
