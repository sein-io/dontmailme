# DontMailMe for AI agents — the MCP server

Tell your assistant "unsubscribe me from newsletters" and let it do the setup. DontMailMe ships a [Model Context Protocol](https://modelcontextprotocol.io) server — and it's still zero-data.

## Zero-data, even for agents
Because the unsubscribe script runs inside your OWN account ([RFC 8058](https://dontmailme.org/how-it-works.md)), the MCP server never touches an inbox. It's a stateless advisor: it hands the assistant the ready-to-run script, the setup steps, and the explanations. Nothing to leak, sell, or store.

## Tools
- `get_unsubscribe_script` — the canonical Gmail or Outlook script (optional Gmail allow-list).
- `get_setup_instructions` — step-by-step setup for Gmail / Outlook / Apple Mail.
- `explain_rfc8058` — how the one-click standard works and why it's safe.
- `estimate_impact` — emails avoided, CO₂e saved, trees a donation funds.
- `compare_tools` — DontMailMe vs. Unroll.me, Cleanfox, Clean Email and others.

## Add it to your assistant
Claude Desktop / any stdio MCP client:
```json
{ "mcpServers": { "dontmailme": { "command": "npx", "args": ["-y", "@sein-io/dontmailme-mcp"] } } }
```
Remote (Claude/ChatGPT custom connector, no authentication):
```
https://mcp.dontmailme.org/mcp
```

Source & docs: https://github.com/sein-io/dontmailme/tree/main/mcp (MIT, zero-data by design).
