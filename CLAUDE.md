# Project notes for Claude

Ziad Sakr's portfolio — Astro static site, live at https://ziad-sakr-portfolio.pages.dev (Cloudflare Pages project `ziad-sakr-portfolio`). Private repo: github.com/sheetswork26-hue/ziad-sakr-portfolio. Full human guide (Arabic): `EDIT-GUIDE.md`.

## Working with Ziad
- Reply in Egyptian Arabic. He wants everything **mobile-first** — test at 375px before saying done.
- For any **visual/design change**, show a preview/options first and apply only after he approves.
- Don't add Upwork / n8n Creators links (he doesn't have them yet). Never invent metrics — numbers come from his real projects.

## Where things live
- Personal data, links, stats, Web3Forms key: `src/site.ts`
- Projects: `src/content/projects/*.md` (schema in `src/content.config.ts`); sanitized workflows in `public/workflows/` (strip credentials/IDs/phones)
- Colors: tokens at top of `src/styles/global.css` (n8n palette; `--accent-strong` for white-text buttons, WCAG AA)
- Home: `src/pages/index.astro` (services, process, contact form) · Hero: `src/components/IntroHero3.astro` · Intro animation: `src/components/AutomationStory.astro` (once per tab via sessionStorage; `/?intro` forces it)
- Logo: `src/components/Logo.astro` + `public/favicon.svg` (falcon in an n8n trigger node)
- Share image: `node scripts/make-og.mjs` → `public/og.jpg`
- `src/pages/_intro-*.astro` and `IntroHero1/2`, `BeforeAfterScene`, `HeroGraph` = archived designs, not published.

## Commands
- Dev: `npm run dev` · Build: `npm run build` (expect 5 pages)
- Deploy: `npx wrangler pages deploy dist --project-name ziad-sakr-portfolio --branch main` — run in an **interactive terminal tab** (non-interactive shells fail wrangler auth).
- Commit with git after changes and `git push`.
