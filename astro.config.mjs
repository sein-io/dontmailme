// @ts-check
import { defineConfig } from 'astro/config';

// dontmailme.org — static build.
// Output: dist/ (manual upload to the web root). public/ is copied verbatim, so the
// whole agent layer (gmail.gs, outlook.ps1, *.md, llms.txt, AGENTS.md, _headers,
// _redirects, robots.txt, sitemap.xml, fonts/) ships byte-for-byte at its current URLs.
//
// build.format:'file' keeps clean .html paths (index.html, gmail.html …) so the existing
// _redirects rewrites and live URLs are preserved during the incremental migration.
//
// i18n is wired from day one: English is canonical at the bare path, additional locales are
// prefixed (/de/…). Adding a language = a translation file + a per-locale page; the machine
// layer (llms.txt, AGENTS.md, scripts) stays English-canonical.
export default defineConfig({
  site: 'https://dontmailme.org',
  output: 'static',
  trailingSlash: 'never',
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
