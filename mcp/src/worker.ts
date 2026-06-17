import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { registerDontMailMeTools } from "./tools.js";

// Remote variant of the same tools. Deploy with: npm run deploy:worker
export class DontMailMeMCP extends McpAgent {
  server = new McpServer({ name: "dontmailme", version: "0.1.0" });
  async init() {
    registerDontMailMeTools(this.server);
  }
}

// Authless: never returns 401, so clients connect with no OAuth handshake.
export default {
  fetch(req: Request, env: unknown, ctx: ExecutionContext) {
    const { pathname } = new URL(req.url);
    if (pathname === "/mcp") return DontMailMeMCP.serve("/mcp").fetch(req, env, ctx);
    if (pathname === "/sse" || pathname === "/sse/message")
      return DontMailMeMCP.serveSSE("/sse").fetch(req, env, ctx); // legacy clients only
    return new Response("DontMailMe MCP — POST to /mcp", { status: pathname === "/" ? 200 : 404 });
  },
};
