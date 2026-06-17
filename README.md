# DontMailMe 🌳

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Website Live](https://img.shields.io/website-up-down-green-red/https/dontmailme.org.svg)](https://dontmailme.org)

**Reach inbox zero — and keep it there.** Auto-unsubscribe from newsletters you never read.

[DontMailMe.org](https://dontmailme.org) is a free, privacy-first, open-source tool that auto-unsubscribes you from newsletters using the [RFC 8058](https://www.rfc-editor.org/rfc/rfc8058.html) one-click standard. It generates a copy-paste script that runs **inside your own** Google or Microsoft account — our servers never see your email or your data (*zero-data by design*). Every cleanup prevents CO₂, and half of every pay-what-you-want donation plants a tree.

Built for **humans and their AI agents**: the same scripts are exposed as plain-text endpoints and documented in an agent runbook, so an assistant can set it up without driving a browser.

## Pages

| Page | Path |
|---|---|
| Home | `/` |
| How it works (RFC 8058) | `/how-it-works` |
| Gmail setup (automatic) | `/gmail` |
| Outlook & Apple Mail (local) | `/outlook` |
| Compare vs. other tools | `/compare` |
| FAQ | `/faq` |
| Impact & methodology | `/impact` |

## Agent & machine-readable layer

| File | Purpose |
|---|---|
| `robots.txt` | Explicitly allows AI crawlers (OpenAI, Anthropic, Perplexity, …) + sitemap |
| `sitemap.xml` | All canonical URLs |
| `llms.txt` / `llms-full.txt` | Routing index + full content for LLMs and IDE agents |
| `AGENTS.md` | Literal numbered runbook for autonomous agents |
| `gmail.gs` | Raw, ready-to-run Gmail script (edit `ALLOWED_SENDERS`, then run) |
| `outlook.ps1` | Raw PowerShell script for Outlook on Windows |
| `*.md` twins | Markdown version of each page (linked via `rel="alternate"`) |

Each HTML page also ships JSON-LD structured data (`SoftwareApplication`, `HowTo`, `FAQPage`, `Organization`, `BreadcrumbList`).

## Code reference

* `gmail.html` — the user-facing script **generator** (injects the safe-sender whitelist and custom query). A complete default script is also rendered statically into the page so it works without JavaScript.
* `gmail.gs` — the canonical raw Gmail script served at `/gmail.gs` for agents and power users (clean `ALLOWED_SENDERS = []`).
* `gworker.gs` — legacy GitHub reference; superseded by `gmail.gs` (safe to remove).
* `calculator.js` — the home-page impact calculator.
* `docs/STRATEGY.md` — the strategic blueprint (v2.0).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
