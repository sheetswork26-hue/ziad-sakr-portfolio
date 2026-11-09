# Ziad Sakr — Portfolio

Astro static site. Mobile-first, n8n-inspired palette, falcon (Sakr) logo.

## Run locally
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Edit content
| What | Where |
|---|---|
| Name, links, WhatsApp, stats, form key | `src/site.ts` |
| Projects (one Markdown file each) | `src/content/projects/*.md` |
| Workflow shown on a project page (sanitized, no credentials!) | `public/workflows/*.json` |
| Colors | tokens at the top of `src/styles/global.css` |
| Photo / logo / share image | `public/me.webp`, `public/favicon.svg`, `public/og.jpg` |

### Add a project
1. Copy any file in `src/content/projects/` and edit the front-matter (title, metrics, flow…).
2. Export the workflow from n8n, **remove credentials/IDs/phone numbers**, save it to `public/workflows/` and set `workflow:` in the file.
3. Commit & push — the site rebuilds automatically.

## Contact form
Sends to your inbox via **Web3Forms** (free, 250 messages/month). Key is in `src/site.ts` (`web3formsKey`).
After deploying, open the form in the Web3Forms dashboard and change the website URL from `localhost` to your domain.

## Deploy (free) — Cloudflare Pages
1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.
3. Build command `npm run build`, output directory `dist`.
4. Set your real URL in `astro.config.mjs` → `site:` (used for SEO + the LinkedIn/WhatsApp share image), commit.
5. Optional: add a custom domain in Cloudflare Pages.

## Archive
- `src/pages/_intro-*.astro` — earlier intro designs (the `_` prefix keeps them out of the published site).
- `design-archive/` — original photo and before/after color comparison.
