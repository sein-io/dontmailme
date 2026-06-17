# Security Policy

DontMailMe is built around a deliberately small attack surface: **there is no backend.** The unsubscribe scripts run entirely inside the user's own Google or Microsoft account, so we never receive, store, or process anyone's email, credentials, or tokens ("zero-data by design").

## Our safety model

- **RFC 8058 only.** The scripts act on the authenticated `List-Unsubscribe` / `List-Unsubscribe-Post` headers and send a one-click `POST`. They **never** read or follow links inside the email body, so they can't be lured into a tracking pixel or phishing page.
- **HTTPS only.** The fallback path matches `https://` unsubscribe URLs only.
- **No third parties.** The website sets no cookies and makes no tracking calls. Fonts are self-hosted.

## Reporting a vulnerability

If you find a security issue — in a script, the site, or the agent-facing endpoints — please report it privately:

- **Email:** hi@dontmailme.org (subject: `SECURITY`)
- Or use GitHub's [private vulnerability reporting](https://github.com/sein-io/dontmailme/security/advisories/new).

Please include reproduction steps and the affected file/page. We aim to acknowledge within 72 hours. Please give us a reasonable window to fix before public disclosure. We'll credit you (if you wish) once a fix ships.

## In scope

- The Gmail/Outlook/Apple Mail scripts (`gmail.gs`, `outlook.ps1`, in-page generators).
- The static site and its agent-facing files (`llms.txt`, `AGENTS.md`, raw script endpoints).

## Out of scope

- Vulnerabilities in Google Apps Script, Microsoft Outlook, or third-party newsletter unsubscribe endpoints themselves.
- The fact that unsubscribing relies on senders honouring the RFC 8058 standard.
