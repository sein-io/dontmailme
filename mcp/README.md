# DontMailMe MCP server

A small **[Model Context Protocol](https://modelcontextprotocol.io)** server that lets AI assistants use [DontMailMe](https://dontmailme.org) to help people auto-unsubscribe from newsletters — the open-source, **zero-data** way.

Because DontMailMe never touches your inbox (the unsubscribe script runs inside *your own* account via [RFC 8058](https://www.rfc-editor.org/rfc/rfc8058.html)), this server is a **stateless advisor**: it serves the ready-to-run scripts, setup steps, and explanations. It never reads, stores, or transmits any email.

## Tools

| Tool | What it returns |
|------|-----------------|
| `get_unsubscribe_script` | The canonical Gmail (Apps Script) or Outlook (PowerShell) script, fetched live from dontmailme.org. For Gmail, injects an optional `allowedSenders` allow-list. |
| `get_setup_instructions` | Step-by-step setup for `gmail` / `outlook` / `apple-mail`. |
| `explain_rfc8058` | How the one-click unsubscribe standard works (and why it's safe). |
| `estimate_impact` | Emails avoided, CO₂e saved, car-km, and trees a donation funds — same math as dontmailme.org/impact. |
| `compare_tools` | DontMailMe vs Unroll.me, Cleanfox, Leave Me Alone, Clean Email, Mailstrom. |

## Use it (stdio, via npx)

Add to your MCP client (e.g. Claude Desktop `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "dontmailme": { "command": "npx", "args": ["-y", "@sein-io/dontmailme-mcp"] }
  }
}
```

## Use it (remote, streamable HTTP)

A hosted endpoint runs on Cloudflare Workers (authless — no OAuth):

```
https://mcp.dontmailme.org/mcp
```

- **Claude:** Settings → Connectors → Add custom connector → paste the URL.
- **ChatGPT:** Developer Mode → Add custom connector → paste the URL → Authentication: None.

## Develop

```bash
npm install
npm run build        # tsc -> dist/
npm start            # run the stdio server

# remote (Cloudflare Worker)
npm run dev:worker   # local at http://localhost:8787/mcp
npm run deploy:worker

# inspect
npx @modelcontextprotocol/inspector@latest node dist/index.js
```

Zero-data by design — there is no DontMailMe server in the unsubscribe loop. MIT licensed. Part of [sein-io/dontmailme](https://github.com/sein-io/dontmailme).
