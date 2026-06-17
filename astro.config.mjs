// @ts-check
import { defineConfig } from 'astro/config';

// dontmailme.org — static build.
//
// Folder convention (matches this repo's "public/ = publish directory"):
//   src/      → page source (Astro components)
//   static/   → static passthrough, copied verbatim (the whole agent layer: gmail.gs,
//               outlook.ps1, *.md, llms.txt, AGENTS.md, _headers, _redirects, fonts/, …)
//   public/   → BUILD OUTPUT. `npm run build` writes the finished site here; upload its
//               contents to the web root. (git-ignored.)
//
// build.format:'file' keeps clean .html paths (index.html, gmail.html …) so the existing
// _redirects rewrites and live URLs are preserved.
//
// i18n is wired from day one: English is canonical at the bare path, additional locales are
// prefixed (/de/…). Adding a language = a translation file + a per-locale page; the machine
// layer (llms.txt, AGENTS.md, scripts) stays English-canonical.
export default defineConfig({
  site: 'https://dontmailme.org',
  output: 'static',
  trailingSlash: 'never',
  publicDir: './static',
  outDir: './public',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
