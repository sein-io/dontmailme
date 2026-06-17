# DontMailMe — Redesign & Expansion Plan (research-grounded, 2026-06-17)

> Status: PLAN — pending owner decisions (see §9). Internal doc, not deployed.

The codebase confirms the deliverables' load-bearing claims: `gmail.gs:19` is exactly `const ALLOWED_SENDERS = [];`, `mcp/src/tools.ts` hard-codes `SITE + /gmail.gs|/outlook.ps1|/gmail.md|/outlook.md|/compare.md`, and the site deploys 13 HTML pages + .md twins + agent files from repo root. I have everything I need.

Below is the consolidated plan, returned as Markdown.

---

# DontMailMe — Redesign & Expansion Plan

*Lead product designer + engineer synthesis of 5 research deliverables. This is a PLAN to review, not code. Opinionated, with trade-offs and conflicts resolved.*

---

## 0. The one-sentence thesis

DontMailMe is the **only** auto-unsubscribe tool that is simultaneously *open-source*, *zero-data* (runs in your own account, no server exists to leak), and *agent-ready* (MCP + raw scripts). Every competitor breaks at least one of those. The redesign's job is to make that triple obvious in under 5 seconds, scale provider coverage via a single data file, and ship it accessible + multilingual on a static-first Astro build — without breaking the existing agent layer or MCP.

---

## 1. What competitors do better + our sharpest takeaways

**What they do better than us today:**

- **Leave Me Alone** — fastest "what's in it for me." Verb-first headline + concrete mechanism ("unsubscribe with a single click") + hard de-risk ("10 free, no credit card") all in the first viewport. Our current hero leads with mechanics ("Copy-paste one free script… RFC 8058…") — too slow.
- **Clean.email** — best-in-class privacy *concreteness* (OAuth2, encrypted tokens, 45-day retention, headers-only, third-party audits) and a real product-completion feature: it **blocks senders who ignore unsubscribe requests**. RFC 8058 one-click only works when senders comply; we have no fallback for the ones who don't.
- **Inbox Zero** — the dangerous one: open-source (AGPL-3.0, ~11.3k stars), ships an MCP server already, self-hostable, leads social proof with GitHub stars. "We have an MCP" is *not* a differentiator anymore.
- **Actor DO** — best visual identity (dark Swiss-minimalist, generous whitespace, one embedded demo) and a quantified ROI hook ("save 4 hours/week").
- **Cleanfox** — proves the eco angle *works* but is fatally compromised ("free because it monetizes anonymized data"). Validates eco-as-trojan-horse and confirms eco must **not** lead.

**Our 5 sharpest takeaways:**

1. **Beat Leave Me Alone on speed-to-clarity, then go further on de-risking.** They say "10 free, no card." We can say "**no sign-up at all** — copy the script, run it in your own account." Zero-account is a friction-killer the paid tools structurally cannot match.
2. **Make the architecture the privacy proof, not a claim.** "We don't store data" is now table stakes (Actor DO, LMA, Clean.email all say it). Our structurally unique line: *"There is no server. The code runs in your account. Here's the source"* — with `gmail.gs` / `outlook.ps1` linked above the fold. This converts a crowded claim into an auditable fact.
3. **Reframe the agent story.** Not "we also have an MCP." Instead: *"a single-purpose, zero-data unsubscribe tool an agent runs **inside your own account** — no broker between the agent and your inbox."* Inbox Zero's MCP still OAuths your mailbox into their server; ours doesn't.
4. **Close the completion gap.** Add at minimum an auto-filter/auto-trash fallback for senders with no working RFC 8058 unsubscribe. Without it we feel half-done next to Clean.email's blocker.
5. **Claim the two uncontested lanes:** real WCAG 2.2 AA accessibility + serious i18n (DE/FR/ES/RU for the German/French/Russian-heavy provider list). No competitor surfaces WCAG or broad localization (Cleanfox FR is the lone exception).

---

## 2. Positioning & one-screen value proposition

**Lead with productivity / peace-of-mind. Zero-data is the *proof*, not the pitch. Eco is a trojan horse — secondary section, never the headline.**

The new homepage first viewport:

- **Headline (outcome, verb-first):**
  *"Unsubscribe from everything you never read — inside your own inbox."*
- **Subhead (the zero-data + free + open line):**
  *"Free, open-source, zero-data. The code runs in your account — we have no server, so nothing ever leaves it."*
- **Primary CTA (one, persistent):** *"Clean my inbox"* → scrolls to the 3-step / provider picker.
- **Secondary, quiet link:** *"Read the source →"* (`gmail.gs`).
- **Trust motif near hero:** a lock / eye-off icon + a slim proof strip: *live GitHub star count · "open-source & auditable" · "no account, no card" · RFC 8058 badge*. **Do not invent usage numbers** (Clean.email's "5B emails" / Fokus's "99.99%") we can't back.

**Copy guardrails:** never open with eco (Cleanfox → "gimmick"); never bury the benefit under mechanism (Fokus's mistake); RFC 8058 / "copy-paste a script" demoted to trust copy. Name the anti-pattern without naming brands: *"Free email tools usually sell your inbox. We have nothing to sell, because nothing leaves your account."*

---

## 3. Information architecture / sitemap

Keep the *learned* landing skeleton (hero → 3-step → provider strip → proof → FAQ → footer) but **compress it** — we have no pricing table to fill, so reach "works with Gmail/Outlook/iCloud/Yahoo…" and "read the source" faster than anyone.

```
/  (home)            hero · 3-step how-it-works · provider strip · zero-data bento · eco tile · agent tile · proof · FAQ teaser
/how-it-works        RFC 8058 explained, the "no server" architecture diagram
/providers           the directory (generated from providers.yaml), filter by tier A/B/C + language
/providers/<slug>    per-provider page: method, app-password deep-link, script, status badge, gotchas
/compare             vs Leave Me Alone / Clean.email / Inbox Zero / Cleanfox / Unroll.me
/impact              eco calculator (the trojan horse lives here, not the homepage hero)
/developers (/api)   MCP + static data API + raw scripts + "build on this"  ← first-class, new
/contribute          add-a-provider / add-a-translation / improve-this-page (prefilled GitHub deep-links)
/faq
/privacy /imprint    (legal — keep)
/community           OPTIONAL: only place giscus is allowed, if at all; otherwise just link to GitHub Discussions
```

- **Agent layer** stays at canonical root paths byte-for-byte: `/llms.txt`, `/llms-full.txt`, `/AGENTS.md`, `/gmail.gs`, `/outlook.ps1`, `/gmail.md`, `/outlook.md`, `/compare.md`, etc. (MCP hard-codes these — see §8).
- **SEO landing pages** we already have (`free-gmail-storage`, `gmail-manage-subscriptions`) keep their URLs.
- **Nav:** slim sticky header = brand + one persistent CTA. Secondary links (How it works, Providers, Compare, Developers, GitHub, Contribute, language switcher) collapse into a mobile drawer + footer. Keep GitHub/Contribute/API reachable (the "open" mandate) but not competing with the conversion path.

---

## 4. Design direction (2026, elegant-minimal-with-accents, fast, accessible)

**Recommendation: KEEP the identity, evolve the system.** Green + Instrument Serif (display) + Inter Tight (body) is on-trend (serif-display + grotesque-body is still the 2026 "trust/editorial" winner) and already differentiates us. Do not trend-chase into mono-brutalism or neon. *Optional* evolution: swap body to a variable grotesque (Geist / Hanken / Bricolage) for tighter rhythm and lower page weight — but this is a nice-to-have, not required.

- **Layout:** **bento grid** for the value section (the 2026 default; ~23% better scroll depth). One dominant tile = the "zero-data / runs in your own account" claim; supporting tiles = open-source-auditable, multi-provider, plants-trees (eco), agent/MCP/API. Collapses to one column on mobile (mobile-first is the mandate).
- **Color:** ONE deliberate green accent on a near-neutral base, used sparingly (CTA, links, one hero accent word, eco motif). The green doubles as the eco signal. Resist dopamine/neon maximalism — it reads "consumer toy," not "safe with my email."
  - **CRITICAL contrast fix (do at baseline):** dark-mode primary buttons must use **dark text (`#0f1117`) on the mint `#2DD4A4` fill** — white text on mint is **1.90:1, fails badly**. Keep light-mode `#0A7D5C` (5.12:1 passes) but **never lighten it**. Darken `--text-muted` for small captions to clear 4.5:1 at rendered size. (Alternates with more headroom if wanted: `#0A6B4F` 6.50:1, `#047857` 5.48:1.)
- **Dark mode:** upgrade from the current partial `prefers-color-scheme` override to a **full semantic token system** (bg/surface/border/text/accent/accent-hover + state tokens) **plus a persisted manual toggle** (localStorage, default = system).
- **Motion:** purposeful micro-interactions only — hover/focus transitions, one or two scroll-reveal fades, optionally **one sub-5s looped hero demo** of newsletters being auto-unsubscribed. **Ban** 3D/WebGL (800KB–2MB JS, kills mobile Lighthouse), kinetic headline type (breaks SRs + crawlers + CLS), parallax, glassmorphism (15–30% FPS drops on mid-tier Android — which matters for the EU/global audience). **Wrap all non-essential motion in `@media (prefers-reduced-motion: reduce)`** — currently absent entirely.
- **Reference register:** Actor DO's visual calm (whitespace, one demo, deliberate accent) + Leave Me Alone's copy speed. Never let the design slow the "what's in it for me."

---

## 5. Provider expansion strategy

**The core approach: a single cross-platform local CLI (Python over `imaplib` + `requests`, single-file, auditable on GitHub) that connects over IMAP, reads `List-Unsubscribe` / `List-Unsubscribe-Post`, and sends the RFC 8058 one-click HTTPS POST. Nothing touches a DontMailMe server — zero-data preserved, and *stronger* than the cloud Apps Script.** Reuse the `gmail.gs` logic verbatim: parse `<https://…>`, require `List-Unsubscribe-Post=One-Click` **OR** SPF/DKIM=pass, POST `List-Unsubscribe=One-Click`, never follow cross-host redirects, trash on success.

**Keep the three existing native tracks** (Gmail Apps Script = cloud/automatic, Outlook desktop COM/PowerShell, Apple Mail AppleScript). They sidestep the two providers where app-password IMAP is dead or fragile. The CLI *adds* ~20 providers; it does not replace these.

**Tiered list (publish on-site with honest status badges):**

- **Tier A — works now (generic IMAP + app-password):** yahoo, aol, verizon (AOL infra), icloud, yandex, mail.ru, gmx.net, web.de, mail.com, posteo.de, mailbox.org, startmail, runbox, hushmail, gandi, namecheap, ionos.de, strato.de, t-online.de, orange.fr, freenet.de, fastmail (paid only).
- **Tier B — special handling:** gmail (Apps Script today, OAuth roadmap), proton.me (Bridge + paid only), qq.com (authorization code, slow activation).
- **Tier C — be upfront we can't:** outlook.com/hotmail/live via IMAP (OAuth2-only since 16 Sep 2024 → use the desktop track instead), hey.com (no IMAP), tuta (no IMAP by design), free Proton, free Lycos.

**Phase-1 providers (recommended):** ship the CLI with **iCloud, Yahoo, GMX, Web.de, Posteo, Mailbox.org** — covers the highest-volume Tier-A consumer providers + the German webmail market that maps to our phase-1 languages. (Gmail/Outlook/Apple Mail already covered by native tracks.)

**Per-provider UX model:** one universal app-password explainer ("turn on 2FA → generate an app password → paste it") + a per-provider deep-link to where the toggle lives. Do **not** write 25 separate copy-paste guides — the IMAP settings + POST logic are identical; only the hostname and the app-password URL vary. Bake gotchas into the CLI as friendly errors: Yahoo connection throttling, Runbox short-username, GMX/Web.de IMAP auto-disable detection, t-online dedicated mail password, iCloud no-POP/unrecoverable password, QQ activation lag.

**Strategic note — design for OAuth as the future default.** Basic-auth/app-password IMAP is on a slow decay curve (Microsoft removed it Sep 2024; Google eliminated Basic Auth Mar 2025; free-tier IMAP being paywalled). Plan a local OAuth-device-flow variant (token stays on the user's machine — still zero-data) for Gmail/Outlook/Yahoo so the tool survives the deprecations. This is roadmap, not P0.

---

## 6. Accessibility & i18n plan

**Stance: build to WCAG 2.2 AA from day one** even though the EAA/BFSG almost certainly does **not** legally apply (free, non-commercial, donation-funded, no consumer contract, microenterprise — three independent reasons we're out of mandatory scope). We build accessible anyway because it removes legal ambiguity, fits the disability-inclusion brand, and is cheap on a static site. **Re-check scope if SEIN ever monetizes** (paid plans / hosted MCP / B2B → scope can flip; BFSG fines €10k–100k). Publish a short "why we're accessible anyway" statement (good GEO/PR).

**A11y baseline (cheap, high-impact):** skip-to-content link (none today), semantic landmarks + single `<h1>` + no heading-skips, global `prefers-reduced-motion` guard gating all animation, 24×24px minimum tap targets (audit badge pills / nav / footer / copy button), keep the existing focus-visible rings at ≥3:1, plus the dark-mode button contrast fix from §4. Make the calculator and copy-button SR-aware: wrap live results in `<output>`/`aria-live="polite"`, add `aria-describedby` on sliders, announce "Copied" via aria-live with a real `aria-label`. Keep the native `<input type=range>` (already satisfies 2.5.7 + keyboard). Note new 2.2 criteria that bite: 2.4.11 (sticky header must not obscure focus), 2.5.7 (custom sliders), 2.5.8 (target size).

**i18n URL/hreflang strategy:** subdirectories (`/de/`, `/fr/`) — inherit root authority, trivial on Cloudflare Pages. Keep English at the bare path (`/gmail`), prefix others (`/de/gmail`). Each localized page: translated `<title>`/`<meta>`/og, self-canonical, full `hreflang` set + `hreflang="x-default"`, lowercase hyphenated codes (`de`, `fr`, `pt-br` — never underscores), visible header language switcher labeled in the native language ("Deutsch", not "German"), detect-but-don't-silently-redirect, persist choice. Keep hreflang in `sitemap.xml`; don't break `_redirects`/`_headers`. Write **all** CSS with logical properties (`margin-inline-start`, `inset-inline`, `text-align:start`) from day one so RTL (Arabic/Hebrew) is a translation-only add later — the current `styles.css` uses physical padding, and the rebuild is the cheap moment to convert.

**Language priority (tied to provider markets):** launch **EN + DE** (German webmail — gmx, web.de, t-online, posteo, mailbox.org, freenet, ionos, strato — is a large under-served market; Leave Me Alone is English-only → real differentiator), then **FR + ES**, then RU/ZH/KO/JA. Arabic/RTL later.

**Translation workflow that doesn't break the agent layer:** strings in `/i18n/{lang}.json`, community translators open PRs against the JSON (fits the contribute culture; graduate to Crowdin only if volume warrants). **No client-side runtime i18n** (bad SEO, adds JS). **Keep the machine layer English-canonical:** one root `/llms.txt` + `/AGENTS.md` with language-tagged links to localized *human* guides — do **not** maintain N full `llms.txt` copies (combinatorial bloat) and do **not** translate runnable scripts/comments (risk, zero agent benefit).

---

## 7. Openness + API/MCP/plugin

**Contribute-from-the-site (zero backend, the highest-leverage openness move):** prefilled GitHub deep-links as buttons — "Add/fix a provider," "Add a translation," and a per-page "Improve this page" edit-on-GitHub link (`github.com/sein-io/dontmailme/edit/main/<path>`). These route into the existing `.github/ISSUE_TEMPLATE/` + `PULL_REQUEST_TEMPLATE.md` (already present, just not surfaced).

**Provider list = one structured data file (`providers.yaml`)** {name, domain, method, RFC-8058 support, status tier, docs locale, flags}. It drives both the on-site `/providers` directory (via content collections) **and** a published `/api/providers.json`. "Expand to top-50" becomes a crowdsourced PR flow with a single source of truth.

**The honest API:** with zero server-side inbox access, the only honest "API" is a **static content/data API** — versioned JSON (`/api/providers.json`, `/api/impact.json`, `/api/compare.json`) + the raw scripts, documented for agents. Feed the MCP from these instead of scraping `.md`. **Do NOT promise a server-side unsubscribe API** — it would break zero-data, our core moat. The existing MCP (`mcp/src/tools.ts`) is already correctly a stateless advisor (fetches public files + pure math mirroring `calculator.js`); keep that model.

**MCP culture:** **publish `mcp/server.json` to the official MCP Registry** (registry.modelcontextprotocol.io — stable since Oct 2025; our `server.json` already matches the schema: `io.github.sein-io/dontmailme`). Near-free discovery win. Skip the still-unshipped `.well-known/mcp.json` standard for now. Surface the MCP/API/agent story as a first-class bento tile + the `/developers` page.

**Discussion:** **link** to GitHub Discussions + prefilled issues rather than embedding giscus on core pages — giscus adds third-party JS + GitHub OAuth that violates the zero-JS/zero-data/no-third-party guardrails in `CONTRIBUTING.md`. Confine any embed to an optional `/community` section if used at all.

**Browser extension:** the *only* client-side way to act on mail while staying zero-data — but a large scope jump (new codebase, per-provider DOM, store review). **Do NOT commit to it in this redesign.** List it as a clearly-scoped future RFC the community could pick up; be explicit on-site about the limit so we don't over-promise. Keep MCP + CLI + scripts + data API as the agent/plugin surface.

---

## 8. Tech stack decision + migration + deploy hygiene

**Decision: Astro, `output: 'static'`, deploy on the existing Cloudflare Pages.** Eleventy is the only credible runner-up (also zero-JS, great a11y track record) but lacks first-class i18n — and i18n is a hard requirement that would otherwise need a bolt-on (Rosey). Vanilla doesn't scale: 13 pages already duplicate nav/head/footer, and i18n would multiply that to 13×N hand-maintained copies. Astro gives zero-JS-by-default + components + content collections + native i18n routing (`prefixDefaultLocale:false`, `fallbackType:'rewrite'` so partial translations don't 404) + built-in Sharp image optimization. Islands for the few interactive bits (calculator, theme toggle, provider picker, language switcher).

**Deploy hygiene — the direct answer to the owner's "separate internal files" question:** set Cloudflare Pages **Build output directory = `dist`**. Cloudflare deploys *only* that folder, so `docs/`, `mcp/`, `.github/`, `README.md`, `LICENSE` are excluded **by construction**. This makes Finder tags obsolete and is independent of the framework choice. (Today the site deploys from repo root, which is exactly why internal files leak.)

**Migration approach (protect SEO + agent layer + MCP):**

1. Scaffold Astro, `output:'static'`, CF output dir = `dist`.
2. Move agent/static files into Astro's `public/` **unchanged** — served byte-for-byte at identical URLs: `gmail.gs`, `outlook.ps1`, `gworker.gs`, `llms.txt`, `llms-full.txt`, `AGENTS.md`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.jpg`, `glama.json`, `_redirects`, `_headers`, `fonts/`.
3. Convert the 13 HTML pages to a shared `<Layout>` + content collections, **keeping clean-URL paths** and matching the live site's `trailingSlash` to avoid SEO regressions.
4. **Author content once (markdown), generate HTML + the `.md` twin + `llms-full.txt` from the same source** — ends today's hand-maintained HTML/`.md` drift.
5. **Load-bearing contracts that must NOT change** (verified in the repo): `gmail.gs` line 19 is exactly `const ALLOWED_SENDERS = [];` — the MCP string-replaces this exact line, and `CONTRIBUTING.md` requires `gmail.html` ↔ `gmail.gs` stay in sync. Re-implement the `gmail.html` in-page safe-sender generator as an Astro island, preserving that exact line. `mcp/src/tools.ts` hard-codes `SITE + /gmail.gs|/outlook.ps1|/gmail.md|/outlook.md|/compare.md` and mirrors `calculator.js` constants — keep those exact paths and keep the calculator math in lockstep.
6. Leave `mcp/` untouched (separate Worker). After deploy, **diff the published file list against current live URLs** and run `mcp/test/smoke.mjs` to confirm fetched paths still 200.

Cost: ~1–2 days. Biggest risks: URL/path preservation, the `gmail.html` generator, and `.md`-twin drift (step 4 eliminates the last).

---

## 9. Phased roadmap + key decisions to confirm

**P0 (foundation + the wins that need no new feature):**
- Astro migration with `dist` output dir (fixes deploy hygiene immediately).
- New hero + bento value section + compressed IA + slim sticky nav.
- WCAG 2.2 AA baseline (skip link, landmarks, reduced-motion guard, dark-mode button contrast fix, SR-aware calculator/copy).
- Semantic dark-mode tokens + manual toggle.
- `providers.yaml` → `/providers` directory + `/api/providers.json`.
- Contribute-from-site (prefilled GitHub deep-links, edit-this-page).
- Publish MCP to the official Registry.
- EN + DE i18n scaffolding (logical-property CSS, hreflang, switcher).

**P1 (the feature + reach catch-up):**
- The generic IMAP CLI (phase-1 providers: iCloud, Yahoo, GMX, Web.de, Posteo, Mailbox.org) with gotcha guard-rails.
- The RFC-8058 fallback (auto-filter/auto-trash for non-compliant senders) — closes the Clean.email completion gap.
- FR + ES translations.
- `/developers` page + static data API documented for agents.

**P2 (longevity + stretch):**
- Local OAuth-device-flow variant for Gmail/Outlook/Yahoo (survive Basic-auth deprecation).
- RU/ZH and additional Tier-A providers via community PRs.
- Browser-extension RFC (community-led).
- RTL/Arabic (translation-only, since CSS is already logical).

**KEY DECISIONS the owner must confirm before building:**

1. **Stack:** Astro static on Cloudflare Pages, `dist` output dir? *(My recommendation: yes.)*
2. **Design identity:** keep green + Instrument Serif + Inter Tight, evolve the system (tokens, bento, dark toggle)? Or swap body to a variable grotesque (Geist/Hanken/Bricolage)? *(My recommendation: keep, optional body swap.)*
3. **Phase-1 providers** for the new IMAP CLI: confirm iCloud + Yahoo + GMX + Web.de + Posteo + Mailbox.org (German-market-weighted)? Or a different first six?
4. **Phase-1 languages:** confirm EN + DE first, then FR + ES? *(Tied to the provider market and the differentiation lane.)*
5. **Scope confirm:** ship the RFC-8058 *fallback* (auto-trash non-compliant senders) in P1 — yes/no? And explicitly **defer** the browser extension to a community RFC?

**Unresolved conflicts I resolved:**
- *"We have an MCP" as a moat* (implied by current `mcp.html`) vs. Inbox Zero already shipping one → **resolved:** reframe to "no broker between agent and inbox," lead the narrower-but-sharper claim.
- *`.md` twins as static files* (deploy deliverable A) vs. *drift risk* (deliverable on migration) → **resolved:** generate twins from one markdown source (step 4), don't keep them as hand-maintained statics.
- *Eco prominence* → **resolved:** eco lives on `/impact` and one bento tile, never the homepage hero (Cleanfox proves eco-led = gimmick-filed).

---

**Relevant files (absolute paths):**
- `/Users/sedat.gergin/Code/Web/dontmailme.org/gmail.gs` — line 19 `const ALLOWED_SENDERS = [];` is contractually load-bearing (MCP string-replaces it; must survive migration).
- `/Users/sedat.gergin/Code/Web/dontmailme.org/mcp/src/tools.ts` — hard-codes `SITE + /gmail.gs|/outlook.ps1|/gmail.md|/outlook.md|/compare.md` and mirrors `calculator.js` constants; preserve those exact paths and the calculator math.
- `/Users/sedat.gergin/Code/Web/dontmailme.org/calculator.js` — impact constants that must stay in lockstep with `tools.ts`.
- Agent layer to move into `public/` unchanged: `/Users/sedat.gergin/Code/Web/dontmailme.org/{llms.txt,llms-full.txt,AGENTS.md,robots.txt,sitemap.xml,favicon.svg,og-image.jpg,glama.json,_redirects,_headers,outlook.ps1,gworker.gs}` and `/fonts/`.
- `/Users/sedat.gergin/Code/Web/dontmailme.org/mcp/server.json` — already matches the MCP Registry schema; publish it.
---

## ✅ Owner decisions (2026-06-17)
1. **Stack:** Astro, `output: 'static'`, Cloudflare Pages, output dir `dist` (solves deploy hygiene by construction).
2. **Design identity:** **NEW identity** (not keep+evolve) — fresh visual language within the elegant/minimal-with-accents 2026 brief. Direction to be approved from mockups before full build.
3. **Phase-1 providers (IMAP CLI):** **global + German blend** — e.g. iCloud, Yahoo, Fastmail, Proton(Bridge) + GMX, Web.de, Posteo, Mailbox.org (Gmail/Outlook/Apple Mail already native).
4. **Languages:** author **EN first**, but build the **i18n infrastructure from day 1** (Astro native i18n; adding a language = drop in a translation file). Include **DE as a test locale** if the implementation makes it cheap. "Clever, modern" = content authored once, locale files, zero client-side runtime i18n.
5. **Scope:** RFC-8058 fallback (auto-trash non-compliant senders) → P1 (pending final confirm). Browser extension → deferred to a community RFC.

**Next gate:** approve the new visual identity direction (mockups), then build P0 on Astro.

---

## 🎨 Corrected design direction (after reviewing _template + Work/Reports)

**Build on the existing sein/UI v2.0 design system** (`_template/`), NOT bespoke mockups. It already delivers the "graphical" feel the owner wants and resolves "light=A / dark=B" cleanly as ONE coherent brand in two palettes:
- Dark-first + light + system (3-state theme toggle); icon-rail (scroll-spy on web); **Liquid-Glass Bento cards**; **mono** for numbers/tags/versions, **system-sans** for text; geometric SVG icons; `prefers-reduced-motion` + `prefers-reduced-transparency` guards already present.
- Tokens, patterns, voice (forbidden words: utilize/leverage/awesome/delve/implement/optimize; no UI emojis), branding anchor (geometric logo + name + mono version badge) all defined in `_template/Design-System_v2.0.md`.
- Port the template's tokens/patterns into Astro components; map dontmailme content into hero → features-bento → how-it-works steps → providers → compare → impact/eco tile → developers/MCP → FAQ → CTA → footer.
- **Accent (open micro-decision):** `EMERALD #10b981/#059669` (Eco — keeps green heritage, bridges privacy+eco) vs `VIOLET #8b5cf6/#7c3aed` (Privacy per the palette) vs `INDIGO` (sein/UI default). Recommend EMERALD.

## 📊 Competitor benchmark (Work/Reports, 2026-06-17) → our targets

| Domain | Perf | A11y | BP | SEO | AI-ready |
|---|---|---|---|---|---|
| clean.email (Grav+CloudFront) | 86 | 89 | 100 | 100 | 65 (D) |
| leavemealone (nginx) | 64 | 79 | 96 | 92 | 61 (D-) |
| getinboxzero (Vercel/Next) | 27 | 90 | 77 | 100 | 60 (D-) |
| actordo (WordPress+Elementor) | 60 | 88 | 69 | 83 | 55 (F) |
| fokus.email (Framer/React) | 55 | 78 | 96 | 100 | 49 (F) |

**Takeaways:** none is fast (best perf 86, getinboxzero a dismal 27); none above 90 a11y; ALL AI-readiness D/F. Heavy stacks (WordPress, Framer/React, Next on Vercel) sink perf. **Our target: 95–100 perf/a11y/bp/seo + AI-readiness A** — achievable with Astro static (zero-JS-default), the perf work (font preload, `_headers` cache, minimal JS), WCAG 2.2 AA, and our existing GEO layer (llms.txt/AGENTS.md/JSON-LD/MCP/sourced stats). AI-readiness weak spots competitors fail (answerability, grounding signals, content structure) are exactly what our FAQ/sourced-stats/schema already address.
