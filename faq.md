# DontMailMe — Frequently asked questions

**How do I unsubscribe from all newsletters at once?**
Instead of clicking unsubscribe on each email, DontMailMe generates a small script that runs inside your own Gmail or Outlook account. It reads each newsletter's official `List-Unsubscribe` header and sends the one-click request for you, automatically and on a schedule. Setup takes about three minutes.

**Does unsubscribing actually work?**
Yes, for legitimate senders. The RFC 8058 one-click standard requires the sender to honour the request, and the headers are DKIM-signed so they can't be faked. Outright spammers may ignore any unsubscribe, which is why the script only acts on authenticated senders.

**Is it safe to unsubscribe from emails?**
Yes, when done the right way. DontMailMe never clicks links inside the email body, so it can't be lured to a tracking pixel or phishing page. It only sends the authenticated `List-Unsubscribe-Post` request to the address the sender published and signed — safer than clicking manually.

**How do I unsubscribe if there's no unsubscribe link?**
Many emails that show no visible unsubscribe button still include a hidden `List-Unsubscribe` header. DontMailMe reads that header and sends the one-click request, so it can unsubscribe you even when there's no obvious link in the body.

**Is DontMailMe free?**
Yes, completely. It's open source under the MIT license and funded by pay-what-you-want donations, including nothing. Half of every donation plants trees through One Tree Planted.

**Can DontMailMe read my emails?**
No. There is no DontMailMe server in the loop. The script runs entirely inside your own Google or Microsoft account, so your email, login and data never reach us. The code is open source, so you can verify it. Zero-data by design.

**Is Unroll.me safe?**
In 2019 Unroll.me settled U.S. FTC allegations that it deceived users — telling them it would not touch their personal emails while sharing data derived from their inboxes with its parent company (it neither admitted nor denied the allegations). It also geo-blocks the EU rather than comply with GDPR. DontMailMe is the private, open-source alternative — it runs in your own cloud and never sees your data.

**What's a private, open-source alternative to Cleanfox or Unroll.me?**
DontMailMe. Cleanfox and Unroll.me are free because their parent companies monetize anonymized inbox data. DontMailMe is open source and runs inside your own Gmail or Outlook account, so it never sees or sells your data — and you can audit every line on GitHub.

**Does it work with Gmail, Outlook, and Apple Mail?**
Yes. Gmail uses an automatic Google Apps Script (every 15 minutes). Outlook on Windows uses a local PowerShell script, and Apple Mail on macOS uses an AppleScript — both act on the messages you select. All three run on your side.

**Is Gmail's built-in "Manage subscriptions" enough?**
Gmail's Manage subscriptions view (launched July 2025) is useful but manual: one sender at a time, only in Gmail, and Google processes everything. DontMailMe is set-and-forget, works across Gmail, Outlook and Apple Mail, and keeps your data out of everyone's hands — including ours.

**How does auto-unsubscribe work? What is RFC 8058?**
RFC 8058 is the internet standard for one-click unsubscribe. Senders add a `List-Unsubscribe` address and a `List-Unsubscribe-Post` header. To unsubscribe, a client sends an HTTPS POST with the body `List-Unsubscribe=One-Click`. DontMailMe's script does exactly this, automatically.

**Will unsubscribing free up my Google storage?**
Partly. Unsubscribing stops new newsletters from filling your shared 15 GB Google limit. To reclaim space you've already used, also delete old mail and empty Trash and Spam — only permanently deleted mail frees storage, per Google.

**How much CO₂ does unsubscribing save?**
Roughly 4 g CO₂e per promotional email avoided (Carbon Literacy Project). Unsubscribing from 20 newsletters prevents about 2,080 emails and ~8 kg CO₂e a year — every year, since the mail stops being sent. For scale, spam alone emits about 29.7 million tonnes of CO₂e annually.

**Can an AI assistant or agent set this up for me?**
Yes. The ready-to-run scripts are plain-text endpoints (`/gmail.gs`, `/outlook.ps1`), there's a runbook at `/AGENTS.md`, and a machine index at `/llms.txt` — so an agent can fetch the script and finish setup without driving a browser.

**Is it open source and can I audit the code?**
Yes. All of DontMailMe's code is open source under the MIT license at github.com/sein-io/dontmailme. The script you run is the script you can read — there is no hidden server-side component, because nothing runs on our servers.
