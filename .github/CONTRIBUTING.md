# Contributing to DontMailMe

Thanks for helping make inbox-zero free, private, and open for everyone. 🌳

DontMailMe is a static website plus a set of open-source unsubscribe scripts that run **inside the user's own account** — there is no backend and no data ever reaches us. Please keep that "zero-data by design" principle intact in every contribution.

## Ways to contribute

**Most wanted right now:**

- 📬 **Add a mail provider** — iCloud, Yahoo, GMX, Proton, Fastmail, and beyond. The provider
  directory is one file: [`src/data/providers.yaml`](../src/data/providers.yaml). Don't know the
  code? Just open an [**Add a provider**](https://github.com/sein-io/dontmailme/issues/new?template=add_provider.yml)
  issue with what you know — see [Adding a provider](#adding-a-provider) below.
- 🐛 **Report or fix a bug** — open a [bug report](https://github.com/sein-io/dontmailme/issues/new?template=bug_report.yml),
  or fix it and send a PR. Every page has an "Improve this page" link straight to the source.

Also welcome: improving a script (Gmail/Outlook/Apple Mail), copy/docs/**translations** (a new
language is a translation file + a page), and a [Discussion](https://github.com/sein-io/dontmailme/discussions)
for questions or ideas.

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
| `mcp/` | The MCP server (`@sein-io/dontmailme-mcp`) — stdio + Cloudflare Worker |
| `docs/STRATEGY.md`, `docs/DESIGN-RULES.md` | The product blueprint &amp; design rules |

> **Important:** the Gmail page (`src/pages/gmail.astro`) renders the **canonical `static/gmail.gs`** and injects the user's safe-sender list on top of it — so there is a single source of truth. If you change the unsubscribe logic, edit **`static/gmail.gs`**; the in-page generator stays in sync automatically. To add a mail provider, edit **`src/data/providers.yaml`**.

## Running locally

Needs Node 18+.

```bash
npm install
npm run dev      # dev server with hot reload → http://localhost:4321
npm run build    # generate the production site into public/
npm run preview  # serve the built public/ exactly as it will look live
```

Clean URLs (e.g. `/gmail`) work out of the box. To deploy, upload the **contents of `public/`** to the web root.

## Adding a provider

The directory is one file: [`src/data/providers.yaml`](../src/data/providers.yaml). Don't know the
code? File an [Add a provider](https://github.com/sein-io/dontmailme/issues/new?template=add_provider.yml)
issue. Want to PR it directly? Add an entry under `providers:`:

| Field | Values |
|------|--------|
| `name` | display name, e.g. `Yahoo Mail` |
| `slug` | url-safe id, e.g. `yahoo`, `web-de`, `mailbox-org` |
| `tier` | `A` (generic IMAP + app password) · `B` (special handling) · `C` (native track / not possible) |
| `method` | `imap-app-password` · `imap-bridge` · `gmail-apps-script` · `outlook-desktop` · `apple-mail` · `none` |
| `status` | `live` (set up today) · `planned` (covered by the upcoming IMAP tool) · `unsupported` (no path) |
| `region` | lowercase: `global`, `de`, `fr`, `ru`, … |
| `rfc8058` | `yes` · `no` · `unknown` (List-Unsubscribe-Post support) |
| `appPassword` | *(optional)* URL where the user generates an app-specific password |
| `setup` | *(optional)* internal guide path for `live` providers, e.g. `/gmail` |
| `note` | *(optional)* one honest caveat — IMAP must be enabled, paid-only, throttling, needs Bridge… |

```yaml
  - name: Yahoo Mail
    slug: yahoo
    tier: A
    method: imap-app-password
    status: planned
    region: global
    rfc8058: yes
    appPassword: https://login.yahoo.com/account/security/app-passwords
    note: Generate an app password; Yahoo throttles new IMAP connections briefly.
```

**Be honest about `status`.** Only mark a provider `live` if a setup track actually ships today.
The generic IMAP tool is still on the roadmap, so most providers are `planned` — say so.

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
