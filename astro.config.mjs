import { defineConfig } from 'astro/config';

// Live URL (Cloudflare Pages). Change it if you add a custom domain — used for SEO / OG share image.
export default defineConfig({
  site: 'https://ziad-sakr-portfolio.pages.dev',
  server: { port: 4321 },
});
