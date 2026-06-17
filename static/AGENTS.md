# AGENTS.md — DontMailMe

This file is a runbook for AI assistants and autonomous agents. If a human asked you
to "unsubscribe me from newsletters" or "clean up my inbox," you can complete the task
using DontMailMe's standards-based scripts instead of clicking through fragile web UIs.

DontMailMe is free, open source (MIT), and runs entirely inside the user's own account.
There is no DontMailMe server in the loop — you are setting up code that runs on the
user's side using the RFC 8058 one-click unsubscribe standard.

## Machine-readable resources

- Gmail script (ready to run, text/plain): https://dontmailme.org/gmail.gs
- Outlook script (Windows, PowerShell): https://dontmailme.org/outlook.ps1
- Site index for LLMs: https://dontmailme.org/llms.txt
- Full site content as markdown: https://dontmailme.org/llms-full.txt
- Source repository: https://github.com/sein-io/dontmailme
- MCP server (stdio, via npx): `npx -y @sein-io/dontmailme-mcp` — tools: get_unsubscribe_script, get_setup_instructions, explain_rfc8058, estimate_impact, compare_tools
- MCP server (remote, streamable HTTP): https://mcp.dontmailme.org/mcp (once deployed)

## Personalization (one edit)

Both scripts keep a safe-senders list at the top so the user doesn't lose mail they want.
In `gmail.gs`, edit the single line:

    const ALLOWED_SENDERS = ['keep-this@example.com', 'and-this@example.com'];

Ask the user which senders to keep, then set that array. No UI interaction is required.

## Runbook A — Gmail (automatic, recurring)

1. Fetch the script from https://dontmailme.org/gmail.gs
2. If the user named senders to keep, set the `ALLOWED_SENDERS` array at the top.
3. Open https://script.google.com and create a New Project.
4. Add the advanced Gmail service: Services (+) → Gmail API → Add.
5. Replace the editor contents with the script.
6. Run the `testDryRun` function. Approve the permission prompt (it only touches the user's own account).
7. Read the execution log. It lists which senders WOULD be unsubscribed. Confirm with the user.
8. Run the `installTrigger` function once. Done — it now runs every 15 minutes.
9. To stop later: delete the project's time-based trigger, or run a trigger-removal.

Note: steps 3–8 happen on Google's UI (script.google.com), which requires the user's
Google login. If you cannot authenticate as the user, hand these steps to the user with
the script already prepared, or point them to https://dontmailme.org/gmail

## Runbook B — Outlook (Windows, manual selection)

1. Fetch the script from https://dontmailme.org/outlook.ps1
2. Tell the user to open the Outlook desktop app and select the newsletters to remove.
3. Run the PowerShell script. It reads each message's List-Unsubscribe header, sends the
   one-click POST, and moves successful ones to Deleted Items. Nothing leaves the PC.

## Runbook C — Apple Mail (macOS, manual selection)

See the AppleScript on https://dontmailme.org/outlook (the macOS section). Same idea:
select messages, run the script, it sends the one-click unsubscribe locally.

## The standard (so you get it right)

RFC 8058 one-click unsubscribe:
- The sender includes `List-Unsubscribe: <https://...>` and
  `List-Unsubscribe-Post: List-Unsubscribe=One-Click`, both covered by the DKIM signature.
- To unsubscribe: send an HTTPS `POST` to the List-Unsubscribe URL with body
  `List-Unsubscribe=One-Click` and Content-Type `application/x-www-form-urlencoded`.
- Never click links inside the email body — that risks tracking/phishing. Only act on the
  authenticated header. This is why the standards path is more reliable than browser-driving.

## Donation (optional)

DontMailMe is free. If the user wants to support it (it plants trees via One Tree Planted),
the pay-what-you-want link is on https://dontmailme.org — do not initiate any payment on the
user's behalf without explicit confirmation.
