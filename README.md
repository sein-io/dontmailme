<div align="center">

<img src="docs/logo.svg" width="96" height="96" alt="DontMailMe logo">

# DontMailMe 🌳

### Auto-unsubscribe from newsletters — without handing your inbox to anyone.

[![License: MIT](https://img.shields.io/github/license/sein-io/dontmailme?color=blue)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/sein-io/dontmailme?style=social)](https://github.com/sein-io/dontmailme/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/sein-io/dontmailme?color=brightgreen)](https://github.com/sein-io/dontmailme/commits/main)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](.github/CONTRIBUTING.md)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fdontmailme.org&label=dontmailme.org)](https://dontmailme.org)
[![Made for humans & AI agents](https://img.shields.io/badge/made%20for-humans%20%26%20AI%20agents-7c3aed)](https://dontmailme.org/AGENTS.md)
[![Tracking: none](https://img.shields.io/badge/tracking-none-success)](https://dontmailme.org/privacy)
[![Standard: RFC 8058](https://img.shields.io/badge/standard-RFC%208058-informational)](https://www.rfc-editor.org/rfc/rfc8058.html)

</div>

**DontMailMe** is a free, **open-source, zero-data unsubscribe tool** — a private **[Unroll.me](#-an-open-source-unrollme--cleanfox-alternative) / Cleanfox alternative** that auto-unsubscribes you from newsletters using the official **[RFC 8058](https://www.rfc-editor.org/rfc/rfc8058.html) one-click** standard. It generates a copy-paste script that runs **inside your own Google or Microsoft account**, so our servers never see your email or your data. Built for **humans and their AI agents** (ships [`llms.txt`](https://dontmailme.org/llms.txt), [`AGENTS.md`](AGENTS.md), and raw [`gmail.gs`](gmail.gs) / [`outlook.ps1`](outlook.ps1)). Works on **Gmail, Outlook, and Apple Mail**.

> ⭐ **If you'd rather unsubscribe than be sold, give the repo a star** — it's the only "payment" that keeps this free and open. **[Star DontMailMe →](https://github.com/sein-io/dontmailme/stargazers)**

---

## ✨ Why DontMailMe

- 🔒 **Zero-data by design** — there's no server in the loop, so we *can't* see, store, or sell your email. Not a privacy *policy* — an *architecture*.
- 📖 **Open source (MIT)** — it's ~120 lines you can read before you run them. Don't trust us; verify the code.
- ✅ **Safe by standard** — uses the authenticated RFC 8058 `List-Unsubscribe-Post` header. It never clicks links in the email body, so it can't be lured to a tracking or phishing page.
- 🤖 **Built for humans *and* their AI agents** — ships machine-readable scripts so an assistant can set it up for you instead of fumbling through a web UI.
- 🆓 **Free, pay-what-you-want** — half of any donation plants a tree via One Tree Planted. The tool is 100% free either way.
- 🇪🇺 **Works everywhere, including the EU** — no GDPR geo-block.

## 🚀 Quick start

Pick your mail client — full visual guides on **[dontmailme.org](https://dontmailme.org)**.

### Gmail (automatic, ~3 min)

1. Open **[script.google.com](https://script.google.com)** → **New project**.
2. **Services (+) → Gmail API → Add**.
3. Paste the script from **[`gmail.gs`](gmail.gs)** (or the personalized version from [dontmailme.org/gmail](https://dontmailme.org/gmail)). Add any senders to keep to `ALLOWED_SENDERS`.
4. Run **`testDryRun`** and check the log — it shows exactly what *would* be unsubscribed. Nothing changes yet.
5. Run **`installTrigger`** once. Your inbox now cleans itself every 15 minutes.

> The entire thing it does to each newsletter is this one authenticated request — no body parsing, no link clicking:
>
> ```js
> // RFC 8058 one-click unsubscribe — only on the DKIM-signed header
> UrlFetchApp.fetch(postUrl, {
>   method: 'post',
>   contentType: 'application/x-www-form-urlencoded',
>   payload: 'List-Unsubscribe=One-Click'
> });
> ```

### Outlook (Windows) & Apple Mail (macOS)

Select the newsletters, then run the local script — [`outlook.ps1`](outlook.ps1) (PowerShell) or the AppleScript from [dontmailme.org/outlook](https://dontmailme.org/outlook). Nothing leaves your computer.

## 🤖 For AI agents

AI assistants increasingly handle chores like unsubscribing — today by driving fragile web UIs. DontMailMe gives them the reliable, standards-based path instead:

- **[MCP server](mcp/)** — a Model Context Protocol server so assistants can call DontMailMe as a tool. Zero-data: it serves the scripts/instructions, never your inbox.
- **[`AGENTS.md`](AGENTS.md)** — a literal, numbered runbook for the full setup.
- **[`gmail.gs`](gmail.gs)** · **[`outlook.ps1`](outlook.ps1)** — ready-to-run scripts at stable `text/plain` URLs.
- **[`llms.txt`](https://dontmailme.org/llms.txt)** / **[`llms-full.txt`](https://dontmailme.org/llms-full.txt)** — a machine-readable index of the whole project.

As far as we know, DontMailMe is the **first consumer unsubscribe tool with a documented agent surface — including a real MCP server.**

Add it to an MCP client (e.g. Claude Desktop):

```json
{ "mcpServers": { "dontmailme": { "command": "npx", "args": ["-y", "@sein-io/dontmailme-mcp"] } } }
```

## 🆚 An open-source Unroll.me / Cleanfox alternative

Most unsubscribe tools are free because *you* are the product, or paid because privacy is sold back to you. DontMailMe is neither: free, open-source, and *architecturally unable* to see your data.

| | **DontMailMe** | Unroll.me | Cleanfox | Leave Me Alone | Clean Email | Mailstrom |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Open source (auditable)** | ✅ MIT | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Inbox never leaves your own cloud** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Sells / monetizes inbox data** | ❌ | ⚠️ yes¹ | ⚠️ yes² | ❌ | ❌ | ❌ |
| **Official RFC 8058 one-click** | ✅ | n/a | n/a | n/a | n/a | n/a |
| **Available in the EU (GDPR)** | ✅ | ❌³ | ✅ | ✅ | ✅ | ✅ |
| **Agent / MCP-ready** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Plants trees + shows CO₂** | ✅ | ❌ | ✅ | opt-in | ❌ | ❌ |
| **Price** | **Free** (PWYW) | Free | Free | Paid | Paid | Paid |

<sub>¹ In 2019 Unroll.me settled U.S. FTC allegations that it deceived users while its parent monetized inbox-derived data (neither admitted nor denied). · ² Cleanfox is operated by Foxintelligence (now part of NielsenIQ), which monetizes anonymized inbox-derived data. · ³ Unroll.me geo-blocks the EU/EEA. Competitor details as publicly reported in 2026; see the full, sourced [comparison](https://dontmailme.org/compare).</sub>

## 🔍 How it works · privacy · FAQ

- **[How it works (RFC 8058)](https://dontmailme.org/how-it-works)** — the standard, why it's safer than clicking, and why agents should use it.
- **[Privacy](https://dontmailme.org/privacy)** — no cookies, no tracking, zero data access.
- **[FAQ](https://dontmailme.org/faq)** — is it safe? is it free? can it read my email? (No.)
- **[Impact & methodology](https://dontmailme.org/impact)** — the honest, sourced version of the CO₂/trees math.

## 🛠 Build &amp; deploy

The site is built with [Astro](https://astro.build) (static output). Page source lives in `src/`;
everything in `static/` is copied to the output **verbatim**. The build writes the complete,
ready-to-host site into **`public/`** — that's the folder you upload.

```bash
npm install      # once
npm run dev      # dev server with hot reload            → http://localhost:4321
npm run build    # generate the production site into     → public/
npm run preview  # serve the built public/ exactly as it goes live → http://localhost:4321
```

**Deploy:** run `npm run build`, then upload the **contents of `public/`** (the files inside it) to
the web root, so `public/index.html` is served at `https://dontmailme.org/`. `public/` already
contains the whole agent layer (`gmail.gs`, `outlook.ps1`, `*.md`, `llms.txt`, `AGENTS.md`,
`_headers`, `_redirects`, `fonts/`, …) at the same paths as before — nothing else to upload.

> ⚠️ Don't open `public/index.html` by double-clicking. Like every website, it loads its CSS from a
> root-absolute path (`/_astro/…`), which the browser can only resolve when the files are **served**
> (over HTTP), not opened as a `file://`. Run `npm run preview` to check the build locally.

## 🧩 Project layout

| Path | What it is |
|------|-----------|
| `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/` | Astro page source |
| `src/data/providers.yaml` | The provider directory — drives `/providers` and `/api/providers.json` |
| `static/` | Copied verbatim into the build: the agent layer, fonts, images |
| `static/gmail.gs`, `static/outlook.ps1` | Canonical raw scripts (served to users **and** agents) |
| `static/llms.txt`, `static/AGENTS.md`, `static/*.md` | Machine-readable twins for AI agents |
| `public/` | **Build output — this is what you upload** (git-ignored; run `npm run build`) |
| `mcp/` | MCP server (`@sein-io/dontmailme-mcp`) — stdio + Cloudflare Worker |
| `docs/STRATEGY.md`, `docs/GROWTH.md`, `docs/REDESIGN-PLAN.md`, `docs/DESIGN-RULES.md` | Blueprint, growth, redesign &amp; design rules |

## ⭐ Star history

<a href="https://star-history.com/#sein-io/dontmailme&Date">
  <img src="https://api.star-history.com/svg?repos=sein-io/dontmailme&type=Date" width="600" alt="Star history">
</a>

## 🤝 Contributing

**Most useful right now** — these are where help goes furthest:

- 📬 **Add a mail provider.** The directory is one file, [`src/data/providers.yaml`](src/data/providers.yaml). Don't know the code? File an [**Add a provider**](https://github.com/sein-io/dontmailme/issues/new?template=add_provider.yml) issue with what you know. (Most of the 19 listed providers are `planned` — an obvious, concrete backlog.)
- 🐛 **Report or fix a bug** in the Gmail / Outlook / Apple Mail scripts or the site — [**Report a bug**](https://github.com/sein-io/dontmailme/issues/new?template=bug_report.yml), or fix it and open a PR.

Also welcome: translations (a new language ≈ one file), copy, docs. See **[CONTRIBUTING](.github/CONTRIBUTING.md)** and the **[Code of Conduct](CODE_OF_CONDUCT.md)**; for ideas and questions, open a [Discussion](https://github.com/sein-io/dontmailme/discussions).

## 🌳 Support

DontMailMe is free. If it saved you time, you can **[chip in what you want](https://dontmailme.org/impact)** — half plants a tree. Or just **star the repo**; that helps more people find a private way to clean their inbox.

## 📄 License

[MIT](LICENSE) — a SEIN project · [dontmailme.org](https://dontmailme.org)
