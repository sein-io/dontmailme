# DontMailMe — Growth Playbook

The repo is the growth engine. None of our competitors (Unroll.me, Cleanfox, Leave Me Alone, Clean Email, Mailstrom) has a public repo or an agent surface — "the open-source, agent-ready one" is ours to own. This file tracks the off-repo actions: GitHub settings, directory listings, and the launch.

> **Voice for everything below:** calm, honest, no hype (no "revolutionary / AI-powered / disruptive"). Lead with self-interest (control, privacy, free); the eco angle is a side effect. Lead URL everywhere = the **repo**; link the site as the live demo. Replace `[your name]` and confirm the support link before posting. **Review competitor claims before posting publicly.**

---

## 1. GitHub repo settings (maintainer, repo admin) — do first

These can't be set from files; do them in the GitHub web UI.

- [x] **About → Description** — ✅ done (set to the new positioning).
- [x] **About → Website:** `https://dontmailme.org` — ✅ done.
- [x] **About → Topics** — ✅ done (20 topics set; this triggers LibHunt / Ecosyste.ms auto-indexing): `unsubscribe, bulk-unsubscribe, email, gmail, outlook, apple-mail, newsletter, inbox-zero, privacy, zero-data, rfc8058, unroll-me-alternative, cleanfox-alternative, email-cleaner, gdpr, open-source, ai-agents, apps-script, powershell, productivity`.
- [x] **Enable Discussions** — ✅ done.
- [ ] **Settings → Social preview →** upload a 1280×640 image (see §1a). *(web-UI only)*
- [ ] **Settings → Branches →** protect `main` (require a PR before merge) — OpenSSF signal.
- [ ] Confirm the **Sponsor** button shows (driven by `.github/FUNDING.yml`).
- [ ] **Insights → Community Standards →** confirm 100% (all health files are in the repo).
- [ ] *(Later)* register at **bestpractices.dev** → add the OpenSSF badge to the README.

### 1a. Social preview image (1280×640)
Centre safe-zone ~1200×600. Content: "DontMailMe 🌳" wordmark + tagline "Auto-unsubscribe — without handing over your inbox" + chips "Open source · Zero-data · RFC 8058" + `dontmailme.org`. The existing `og-image.jpg` (1200×630) works as a fallback if you don't make a dedicated one.

---

## 2. Directory & awesome-list submissions

Reusable one-liner:
> Auto-unsubscribe from newsletters using the RFC 8058 one-click standard, running entirely inside your own Gmail or Outlook account so no server ever sees your mail.

"Alternative to": **Unroll.me, Cleanfox, Clean Email, Leave Me Alone**.

### Tier 1 — submit right after the README + topics are live
- [ ] **AlternativeTo.net** — add DontMailMe as an alternative on the **Unroll.me** page (one record cross-lists onto Cleanfox / Clean Email / Leave Me Alone / Mailstrom). Name `DontMailMe`, site `https://dontmailme.org`, License `Open Source — MIT`, platforms `Online / Self-Hosted / Google Workspace / Microsoft / Mac`, tags `unsubscribe, newsletter, privacy, inbox-zero, rfc-8058, gmail, outlook, open-source`.
- [ ] **Product Hunt** — create the product page (full copy in §3). Auto-surfaces on Unroll.me's "Alternatives" tab.
- [ ] **awesome-privacy (Lissy93)** — PR editing `awesome-privacy.yml` (not the README), then `make validate`. Title: `Add DontMailMe to Email Clients`:
  ```yaml
  - name: DontMailMe
    description: Auto-unsubscribes you from newsletters via the RFC 8058 one-click standard, running a copy-paste script inside your own Gmail or Outlook account so no server ever sees your mail.
    url: https://dontmailme.org
    icon: https://dontmailme.org/favicon.svg
    github: sein-io/dontmailme
    openSource: true
  ```
- [ ] **tycrek/degoogle** — PR under `### Gmail`:
  ```markdown
  **[DontMailMe](https://dontmailme.org)** - Auto-unsubscribes you from newsletters using the RFC 8058 one-click standard; the script runs inside your own Gmail account, so it never sends your data to a third-party server. Open source (MIT). ([Source](https://github.com/sein-io/dontmailme))
  ```
- [ ] **Privacy Guides forum** (`discuss.privacyguides.net` → Tool Suggestions) — a forum post, not a PR. Lead with open-source + auditable + runs-in-your-account + the FTC contrast.
- [ ] **openalternative.co/submit** — free form. Alternative to `Unroll.me, Clean Email, Cleanfox`.

### Tier 2 — agent / AI discovery (a surface no competitor owns)
- [ ] **tairov/awesome-agents.md** — PR:
  ```markdown
  [sein-io/dontmailme — AGENTS.md](https://github.com/sein-io/dontmailme/blob/main/AGENTS.md) - Runbook letting an AI assistant set up newsletter auto-unsubscribe (RFC 8058) in the user's own Gmail/Outlook without driving a browser. ([source](https://github.com/sein-io/dontmailme))
  ```
- [ ] **llmstxt.site/submit** and **directory.llmstxt.cloud** — submit `https://dontmailme.org/llms.txt` (+ `llms-full.txt`).

### Tier 3 — low-effort aggregators
- [ ] **SaaSHub** — Add Listing; alternatives `Unroll.me, Cleanfox, Clean Email, Leave Me Alone`.
- [ ] **LibHunt / Ecosyste.ms** — no manual submit; auto-ingests once **Topics** (§1) are set.
- [ ] **marcelkooi/awesome-newsletter-tools** — PR adding an "Unsubscribe" entry.

### Tier 2b — MCP listings (UNLOCKED — we now ship a real MCP server in `mcp/`)
Publish to the **official MCP registry first** — PulseMCP auto-ingests from it weekly and Glama auto-crawls GitHub, so one publish propagates.
- [ ] **npm + official registry** — from `mcp/`: `npm publish --access public`, then `mcp-publisher login github` + `mcp-publisher publish` (reads `mcp/server.json`, name `io.github.sein-io/dontmailme`). Full commands in `mcp/README.md` and the build spec.
- [ ] **punkpeye/awesome-mcp-servers** — PR, one line under `💬 Communication` (alphabetical):
  ```
  - [sein-io/dontmailme](https://github.com/sein-io/dontmailme) 📇 🏠 ☁️ - Zero-data auto-unsubscribe advisor (RFC 8058). Generates copy-paste scripts that run inside your own Gmail/Outlook/Apple Mail; never touches your inbox.
  ```
- [ ] **mcpservers.org** (wong2 list) — web form at https://mcpservers.org/submit (Category: Communication).
- [ ] **mcp.so** — Submit button; Category Communication/Email; install `npx -y @sein-io/dontmailme-mcp`.
- [ ] **glama.ai/mcp** — `glama.json` is already committed at the repo root; run "Claim ownership" on Glama.
- [ ] **smithery.ai** — point at the deployed Worker URL once live.
- [ ] **PulseMCP** — nothing to do; auto-ingests from the registry. Claim if it appears unclaimed.

### Do NOT submit (would be rejected — honest disqualification)
- **awesome-selfhosted** — excludes non-server / client-side software. We're a static site + copy-paste scripts, no self-hostable backend.

---

## 3. Launch kit (ready-to-post)

### Hacker News — "Show HN"
**Title:** `Show HN: DontMailMe – open-source auto-unsubscribe that runs in your own inbox`
**URL:** `https://github.com/sein-io/dontmailme`
**First comment (post immediately):**
> Maker here. I got tired of "free" unsubscribe tools that are free because your inbox is the product. Unroll.me settled with the FTC in 2019 over selling parsed e-receipt data; Cleanfox's parent monetizes inbox data too. The honest privacy alternatives (Leave Me Alone, Clean Email) charge for it. None are open source, and none let you read the code that touches your mail.
>
> So I built the opposite. DontMailMe doesn't have a server that sees your email — there's no server in the loop at all. It generates a small script you paste into your own account:
> - Gmail: a Google Apps Script on a 15-min trigger. You run `testDryRun` first; it logs exactly which senders it *would* unsubscribe before anything happens.
> - Outlook (Windows) / Apple Mail (macOS): a local PowerShell / AppleScript over the messages you select.
>
> It only acts on the authenticated `List-Unsubscribe` header (RFC 8058 one-click): an HTTPS POST with `List-Unsubscribe=One-Click`, never a link in the email body. That's the part I care about most — clicking body links is how you get tracked or phished. The header is DKIM-signed, so it's safer and more reliable than scraping the rendered email.
>
> "Zero-data by design" isn't a privacy *policy* — it's an architecture. Nothing to leak, sell, or subpoena. You don't have to trust me; it's ~120 lines of MIT-licensed script you can read first.
>
> The other thing: I made it usable by AI agents. The site ships /llms.txt, an /AGENTS.md runbook, and raw /gmail.gs + /outlook.ps1 at stable text/plain URLs — so when someone tells their assistant "unsubscribe me from newsletters," it can fetch a working, standards-based script instead of fumbling a fragile web UI.
>
> Honest caveat on the trees/CO₂ angle: unsubscribing stops *future* sends (where the real footprint is) — it does NOT free your storage (that needs deleting + emptying trash), and deleting isn't free either. So I frame eco as "fewer emails sent forever," a side effect, not the pitch. Pay-what-you-want; the tool is 100% free.
>
> Repo: https://github.com/sein-io/dontmailme — would love feedback on the Apps Script approach and the agent layer.

*HN notes: submit Tue–Thu ~8–10am ET; never ask for upvotes; be in the thread the first 2–3 hours. Expect pushback on Apps Script scope + eco math (both pre-empted above).*

### Product Hunt
- **Tagline (≤60):** `Auto-unsubscribe from newsletters, inside your own inbox`
- **Description:**
  > DontMailMe is a free, open-source tool that auto-unsubscribes you from newsletters you never read. It generates a copy-paste script that runs inside your own Google, Microsoft, or Apple account using the official RFC 8058 one-click standard — so our servers never see a single email ("zero-data by design"). Gmail runs automatically on a 15-minute trigger; Outlook and Apple Mail run locally. MIT-licensed and auditable, works in the EU, and built for AI agents too (ships llms.txt, an AGENTS.md runbook, and raw scripts an assistant can run). Pay-what-you-want; half of every donation plants a tree.
- **Maker comment:**
  > Hey Product Hunt — [your name] here. I built DontMailMe because the "free" unsubscribe tools are usually free because they monetize your inbox, and the private ones charge for privacy. I wanted one that physically can't see your email. Instead of a server, it gives you a small script that runs in your *own* account and only acts on the authenticated unsubscribe header (RFC 8058) — never a link in the body. It's open source, so read every line before you run it. Two things I'd love feedback on: (1) the agent layer — an assistant can set it up via machine-readable scripts; (2) the honest eco framing — it cuts *future* email, not storage, so trees/CO₂ are a side effect, not the pitch. 100% free; pay-what-you-want only if it helps.
- **Topics:** Privacy · Open Source · Email · Productivity · Developer Tools
- *Launch 12:01am PT; first comment within minutes; use a 60-sec dry-run demo GIF.*

### Reddit
Rules: disclose "I'm the author" in line 1; one sub/day; link the repo (not the payment page); never ask for upvotes; reply to every comment early.

**Post A — r/selfhosted**
Title: `I built an open-source, self-running auto-unsubscribe tool — no server ever sees your email (MIT)`
> I'm the author. I wanted to stop newsletters without handing my inbox to another SaaS, so I built DontMailMe: no backend that reads your mail — it generates a small script you run inside your own account.
> - Gmail: a Google Apps Script on a 15-min trigger (runs in your account). Dry-run first, logs exactly what it *would* unsubscribe before touching anything.
> - Outlook (Windows) / Apple Mail (macOS): a local PowerShell / AppleScript over the messages you select.
>
> It only acts on the DKIM-signed RFC 8058 `List-Unsubscribe` header (one-click POST), never links in the body. ~120 lines, MIT, nothing leaves your account. It also ships an AGENTS.md runbook + raw scripts for automations/agents.
> Repo (read the scripts before running): https://github.com/sein-io/dontmailme · Live demo: https://dontmailme.org
> Free; pay-what-you-want only if useful. Feedback on the trigger approach + edge cases (senders without RFC 8058 headers) very welcome.

**Post B — r/privacy**
Title: `Most "free" unsubscribe tools monetize your inbox. I open-sourced one that physically can't see your email.`
> Disclosure: I'm the author, sharing because the privacy angle is the whole point and I'd like this community to poke holes in it.
> Backstory: Unroll.me settled with the FTC in 2019 over deceiving users about inbox access; its parent sold parsed purchase data. Cleanfox's parent monetizes inbox data too. The genuinely private options (Leave Me Alone, Clean Email) are closed-source and paid — in every case you trust a policy you can't verify.
> I wanted privacy as *architecture*. DontMailMe has no server in the loop — a script runs in your own Google/Microsoft/Apple account and only acts on the authenticated RFC 8058 one-click header (HTTPS POST), never a body link. Nothing to leak, sell, or subpoena. MIT, so read the ~120 lines first. Works in the EU (Unroll.me geo-blocks it).
> Honest limits: the Gmail version runs as a Google Apps Script, so you grant Gmail scope in *your own* account — the code using it is fully visible. And unsubscribing stops future mail; it doesn't free existing storage.
> Code: https://github.com/sein-io/dontmailme

Other subs (later, one/day, lurk-first): r/degoogle, r/opensource, r/productivity, r/Anticonsumption.

### dev.to / Hashnode
Title: `I built an open-source, zero-data unsubscribe tool — and made it usable by AI agents`
Outline: (1) "free" tools sell your inbox; (2) privacy as architecture, not policy; (3) RFC 8058 + why header beats scraping (POST snippet); (4) Gmail Apps Script + dry-run + ALLOWED_SENDERS; (5) the agent layer (llms.txt/AGENTS.md/raw scripts — "B2A"); (6) honest eco + storage caveat; (7) MIT, repo link. Tags `#opensource #privacy #showdev #ai`. Set `canonical_url` to avoid duplicate-content dilution.

### X / Twitter + LinkedIn
**X thread starter:**
> Most "free" unsubscribe tools are free because your inbox is the product.
> I built the opposite: DontMailMe auto-unsubscribes you from newsletters with a script that runs inside your *own* account. No server ever sees your email. Open source, MIT. 🧵 https://github.com/sein-io/dontmailme

(Follow-ups: RFC 8058 header not body links; "zero-data is architecture, not policy, ~120 lines"; the agent layer; free + PWYW + a tree, honest eco math.)

**LinkedIn:**
> I just open-sourced DontMailMe — a free tool that auto-unsubscribes you from newsletters you never read. The twist: it has no server that sees your email. It generates a small script that runs inside your own Google/Microsoft/Apple account and only acts on the authenticated RFC 8058 one-click header — never a body link. Most "free" tools monetize inbox data (Unroll.me settled with the FTC over exactly this in 2019); the private ones are closed-source and paid. DontMailMe makes privacy an architecture, not a promise — MIT, read every line. It's also built for AI agents (ships an AGENTS.md runbook). Free, pay-what-you-want, half of any donation plants a tree. Code: https://github.com/sein-io/dontmailme

---

## 4. Launch sequence (stagger ~7 days so you can be present in every thread)

1. **Day 0 (Tue/Wed, ~8–9am ET):** Show HN + first comment immediately; sit in thread 3h. Midday: X thread + LinkedIn.
2. **Day 1:** Reddit Post A → r/selfhosted.
3. **Day 2:** dev.to / Hashnode article; reshare on X/LinkedIn.
4. **Day 3:** Reddit Post B → r/privacy. Then r/degoogle / r/opensource on later days — never two subs the same day.
5. **Day 5–7:** Product Hunt (12:01am PT), once the repo has a few stars + folded-in feedback.

**The one thing to get right:** the README must convince a skeptic in 10 seconds — zero-data architecture in one line, the actual script visible, the honest caveat linked. Every channel funnels to the repo; if the repo lands it, the posts compound; if not, none of them do.

---

## 5. Performance verification

- PageSpeed Insights (mobile) on `/`, `/gmail`, `/compare`. Targets: Performance 99–100, LCP <1.2s, CLS ~0, Best Practices/SEO 100.
- DevTools Network: confirm the hero font loads **once** at High priority (preload).
- `curl -sI https://dontmailme.org/fonts/instrument-serif-regular.woff2 | grep -i 'cache-control\|access-control'` → long immutable cache + CORS.
- Confirm security headers from `_headers` are present: `curl -sI https://dontmailme.org | grep -i 'x-content-type\|referrer-policy\|strict-transport'`.

---

## 6. Measurement loop
- Grep edge logs for AI user-agents (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) to confirm AI crawlers are fetching the site.
- Periodically ask ChatGPT / Perplexity / Claude: *"free open-source tool to auto-unsubscribe from newsletters"* and check whether DontMailMe is cited.
- Track GitHub stars (star-history), referral sources, and which directory/launch channel converts.
