# Contributing to DontMailMe

Thanks for helping make inbox-zero free, private, and open for everyone. 🌳

DontMailMe is a static website plus a set of open-source unsubscribe scripts that run **inside the user's own account** — there is no backend and no data ever reaches us. Please keep that "zero-data by design" principle intact in every contribution.

## Ways to contribute

- **Report a bug** — open an [issue](https://github.com/sein-io/dontmailme/issues/new/choose).
- **Suggest a feature** — open a feature request, or start a [Discussion](https://github.com/sein-io/dontmailme/discussions).
- **Improve a script** — Gmail (Apps Script), Outlook (PowerShell), Apple Mail (AppleScript).
- **Fix copy / docs / translations** — clarity and accuracy matter.
- **Add a mail client** — Yahoo, Proton, Fastmail, etc.

## Project layout

The site is built with [Astro](https://astro.build) (static output).

| Path | What it is |
|------|------------|
| `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/` | Astro page source |
| `src/data/providers.yaml` | The provider directory — drives `/providers` and `/api/providers.json` |
| `static/` | Copied verbatim into the build: the agent layer, fonts, images |
| `static/gmail.gs`, `static/outlook.ps1` | The canonical raw scripts served to users and AI agents |
| `static/*.md`, `static/llms.txt`, `static/llms-full.txt`, `static/AGENTS.md` | Machine-readable twins for AI agents |
| `public/` | Build output (what gets deployed) — never edit by hand; run `npm run build` |
| `docs/STRATEGY.md`, `docs/DESIGN-RULES.md` | The product blueprint &amp; design rules |

> **Important:** the Gmail page (`src/pages/gmail.astro`) renders the **canonical `static/gmail.gs`** and injects the user's safe-sender list on top of it — so there is a single source of truth. If you change the unsubscribe logic, edit **`static/gmail.gs`**; the in-page generator stays in sync automatically. To add a mail provider, edit **`src/data/providers.yaml`**.

## Running locally

```bash
npm install
npm run dev      # dev server with hot reload → http://localhost:4321
npm run build    # generate the production site into dist/
npm run preview  # serve the built dist/ exactly as it will look live
```

Clean URLs (e.g. `/gmail`) work out of the box. To deploy, upload the **contents of `public/`** to the web root.

## Guidelines

- **Keep it private by design.** No analytics, no trackers, no third-party calls that could leak user data. Scripts must run in the user's own cloud/computer.
- **Be accurate.** Cite sources for any statistic. Keep competitor claims factual and defensible.
- **Match the voice.** Calm, honest, technical-but-plain. No hype words ("revolutionary", "AI-powered", "disruptive").
- **Surgical diffs.** Touch only what your change needs.

## Pull requests

1. Fork and branch (`feat/...` or `fix/...`).
2. Make your change; test the affected page(s) in a browser.
3. Open a PR describing **what** changed and **why**. For larger changes, open an issue first.

By contributing, you agree your work is licensed under the project's [MIT License](../LICENSE).
