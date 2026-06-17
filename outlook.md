# Bulk-unsubscribe from newsletters in Outlook & Apple Mail (free)

Free, open-source scripts that run locally on your own computer. You select the newsletters; the script sends the official one-click unsubscribe (RFC 8058) and moves them to your Deleted Items. Nothing leaves your device.

(Microsoft charges ~$15/month for the cloud automation Gmail gives you for free, so we built the local desktop path instead.)

**Raw PowerShell script (Windows):** https://dontmailme.org/outlook.ps1

## Windows — Outlook desktop (PowerShell)

1. Open the Outlook desktop app and select the newsletter emails you want gone.
2. Open PowerShell and run the script from https://dontmailme.org/outlook.ps1
3. It reads each message's `List-Unsubscribe` header, sends the one-click POST, and moves successful ones to Deleted Items.

## macOS — Apple Mail (AppleScript)

1. Add your Outlook/Exchange (or any) account to the native Apple Mail app.
2. Select the newsletters, open the *Script Editor* app, paste the AppleScript from https://dontmailme.org/outlook (macOS section), and click Run.
3. It extracts the one-click unsubscribe URL locally and sends the request with `curl`; successfully unsubscribed messages are deleted.

## Why local instead of cloud

These scripts only process the messages you manually select, giving you full control — no whitelist needed, and zero data leaves your computer.

Related: [How it works](https://dontmailme.org/how-it-works.md) · [Gmail (automatic)](https://dontmailme.org/gmail.md) · [FAQ](https://dontmailme.org/faq.md)
