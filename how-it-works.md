# How DontMailMe works

One small open-source script, the official unsubscribe standard, and zero access to your data.

## The official one-click standard (RFC 8058)

Most legitimate newsletters support a machine-readable way to unsubscribe, defined by [RFC 8058](https://www.rfc-editor.org/rfc/rfc8058.html). The sender includes two headers in every email:

- `List-Unsubscribe` — the secure HTTPS address that handles unsubscribe requests.
- `List-Unsubscribe-Post: List-Unsubscribe=One-Click` — a signal that the sender accepts a single automatic request.

To unsubscribe, a client sends an HTTPS `POST` to that address with the body `List-Unsubscribe=One-Click`. Both headers must be covered by the sender's DKIM signature, so they can't be forged. DontMailMe reads those headers and sends exactly that request. When a sender only offers the older URL (no one-click), the script falls back to a plain HTTPS request — and only for senders whose identity is authenticated (SPF or DKIM pass). It skips `mailto:`-only unsubscribe headers.

## Why this is safer than clicking "unsubscribe"

- Clicking the link in an email body can confirm your address to spammers (more spam), or lead to a tracking/phishing page.
- DontMailMe never reads or follows links in the body. It only acts on the authenticated `List-Unsubscribe-Post` header — a tiny, intentional POST to an address the sender published and signed.

## Why it runs in your own cloud — "zero-data by design"

You don't grant us access to your inbox, because there is no "us" in the loop. The script runs inside your own Google account (Apps Script) or on your own computer (PowerShell / AppleScript). Your email, login and data never travel to a DontMailMe server. Every other major unsubscribe service routes your inbox through their servers and asks you to trust a privacy policy. We removed the thing you'd have to trust — and the code is open source.

## For AI agents: use the standard, not screenshots

Most agents today unsubscribe by driving a browser — screenshotting, guessing the button, clicking through each sender's custom flow. Engineers report this is brittle (false successes, broken checkboxes). The standards-based path is far more reliable. Use what DontMailMe already implements:

- [/gmail.gs](https://dontmailme.org/gmail.gs) — ready-to-run Google Apps Script (edit `ALLOWED_SENDERS` at the top).
- [/outlook.ps1](https://dontmailme.org/outlook.ps1) — PowerShell for Outlook on Windows.
- [/AGENTS.md](https://dontmailme.org/AGENTS.md) — a literal numbered runbook.
- [/llms.txt](https://dontmailme.org/llms.txt) — a machine-readable index of the site.

## What it can and can't do

- Works on senders that support the standard (most reputable newsletters); skips the few that don't.
- Stops new mail; doesn't delete your archive. To reclaim storage, also delete old mail and empty Trash/Spam.
- You stay in control: a safe-senders list keeps wanted newsletters, and Gmail has a dry-run preview.

Related: [Gmail setup](https://dontmailme.org/gmail.md) · [Compare](https://dontmailme.org/compare.md) · [Impact](https://dontmailme.org/impact.md)
