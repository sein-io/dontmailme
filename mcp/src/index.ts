#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerDontMailMeTools } from "./tools.js";

const server = new McpServer({ name: "dontmailme", version: "0.1.0" });
registerDontMailMeTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
// Never write to stdout on a stdio server — it corrupts the JSON-RPC stream. Use console.error.
console.error("dontmailme-mcp ready (stdio)");
