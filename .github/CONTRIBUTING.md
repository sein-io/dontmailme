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

| Path | What it is |
|------|------------|
| `index.html`, `gmail.html`, `outlook.html`, … | The static site pages |
| `styles.css`, `calculator.js` | Shared styles and the impact calculator |
| `gmail.gs`, `outlook.ps1` | The canonical raw scripts served to users and AI agents |
| `*.md`, `llms.txt`, `llms-full.txt`, `AGENTS.md` | Machine-readable twins for AI agents |
| `docs/STRATEGY.md` | The product/positioning blueprint |

> **Important:** `gmail.html` contains an in-page generator that injects a user's safe-sender list into the Gmail script. If you change the unsubscribe logic, update **both** the generator in `gmail.html` and the raw `gmail.gs`, and keep them in sync.

## Running locally

It's a static site — no build step:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Clean URLs (e.g. `/gmail`) are handled by `_redirects` on Cloudflare Pages / Netlify; locally, use the `.html` paths.

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
