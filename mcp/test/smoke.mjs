// Hermetic smoke test for the DontMailMe MCP server.
// Talks to the built stdio server over the real MCP protocol and asserts the
// tool surface + the impact math (which MUST stay in sync with calculator.js).
// Network-free: only exercises tools that don't fetch (tools/list, estimate_impact, explain_rfc8058).
import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({ command: "node", args: ["dist/index.js"] });
const client = new Client({ name: "dontmailme-test", version: "0" });
await client.connect(transport);

const { tools } = await client.listTools();
assert.deepEqual(
  tools.map((t) => t.name).sort(),
  ["compare_tools", "estimate_impact", "explain_rfc8058", "get_setup_instructions", "get_unsubscribe_script"],
  "expected exactly the 5 documented tools",
);

const est = await client.callTool({
  name: "estimate_impact",
  arguments: { newsletters: 20, donationEur: 10 },
});
assert.deepEqual(
  est.structuredContent,
  { newsletters: 20, emailsAvoidedPerYear: 2080, kgCo2eSavedPerYear: 8.3, equivalentCarKm: 52, treesPlanted: 2, treeCo2PerYear: 40 },
  "impact math must match dontmailme.org/calculator.js",
);

const rfc = await client.callTool({ name: "explain_rfc8058", arguments: {} });
assert.ok(
  rfc.content[0].text.includes("List-Unsubscribe=One-Click"),
  "explain_rfc8058 must describe the one-click POST",
);

await client.close();
console.log("✓ MCP smoke test passed (5 tools, impact parity, RFC 8058)");
process.exit(0);
