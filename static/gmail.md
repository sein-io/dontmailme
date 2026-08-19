# How to auto-unsubscribe from newsletters in Gmail (free script)

A free, open-source Google Apps Script that runs entirely inside your own Google account. It uses the official one-click unsubscribe standard (RFC 8058) — we never see your email. Setup takes about 3 minutes, then it runs automatically every 15 minutes.

**Raw script (ready to run, text/plain):** https://dontmailme.org/gmail.gs
**Agent runbook:** https://dontmailme.org/AGENTS.md

## Steps

1. **Create a new script** — go to https://script.google.com and click *New Project*.
2. **Enable the Gmail API** — click *Services (+)*, select *Gmail API*, click *Add*.
3. **Personalize & copy the code** — add any senders you want to keep to the safe-senders list (`ALLOWED_SENDERS`), then paste the script into the editor.
4. **Test safely** — select the `testDryRun` function and click *Run*. Check the logs to see what would be unsubscribed; nothing is changed yet.
5. **Activate** — select the `installTrigger` function and click *Run*. Your inbox now cleans itself every 15 minutes.

## Personalize (one edit)

At the top of the script, keep senders you trust:

```js
const ALLOWED_SENDERS = ['news@mycompany.com', 'team@substack.com'];
```

## Notes

- It only acts on senders that support the RFC 8058 standard or are authenticated (SPF/DKIM pass).
- It never reads or clicks links in the email body — only the unsubscribe address published in the message header.
- Mail is deleted only after a confirmed one-click unsubscribe. For authenticated senders without one-click the request cannot be confirmed, so the mail is kept and marked read.
- A dry-run mode lets you preview before anything changes.
- To stop it later, delete the project's time-based trigger.

Related: [How it works](https://dontmailme.org/how-it-works.md) · [FAQ](https://dontmailme.org/faq.md) · [Outlook & Apple Mail](https://dontmailme.org/outlook.md)
