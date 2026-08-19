import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const SITE = "https://dontmailme.org";

const SCRIPT_URL = { gmail: `${SITE}/gmail.gs`, outlook: `${SITE}/outlook.ps1` } as const;
const SETUP_URL = {
  gmail: `${SITE}/gmail.md`,
  outlook: `${SITE}/outlook.md`,
  "apple-mail": `${SITE}/outlook.md`, // macOS AppleScript lives in the Outlook page
} as const;

// Impact constants — MUST match dontmailme.org/calculator.js
const EMAILS_PER_NEWSLETTER_YEAR = 104;
const KG_CO2_PER_EMAIL = 0.004;
const KG_CO2_PER_CAR_KM = 0.16;
const EUR_PER_TREE = 5;
const KG_CO2_PER_TREE_YEAR = 20;

// Node 18+ and Workers both have a global fetch.
async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": "dontmailme-mcp" } });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText} (${url})`);
  return res.text();
}

function errText(e: unknown) {
  return e instanceof Error ? e.message : String(e);
}

export function registerDontMailMeTools(server: McpServer): void {
  // 1) get_unsubscribe_script
  server.registerTool(
    "get_unsubscribe_script",
    {
      title: "Get DontMailMe unsubscribe script",
      description:
        "Returns the canonical zero-data auto-unsubscribe script (RFC 8058) for the chosen mail client, fetched live from dontmailme.org. The script runs inside the user's OWN account; DontMailMe never sees the inbox. For Gmail, an optional allow-list of senders is injected so they are never unsubscribed.",
      inputSchema: {
        client: z.enum(["gmail", "outlook"]).describe("Target mail client"),
        allowedSenders: z
          .array(z.string())
          .optional()
          .describe("Gmail only: senders to NEVER unsubscribe from, e.g. ['team@substack.com']"),
      },
    },
    async ({ client, allowedSenders }) => {
      try {
        let script = await fetchText(SCRIPT_URL[client]);
        let note = "";
        if (allowedSenders?.length) {
          if (client === "gmail") {
            // Drop quotes and backslashes: either one would break out of the single-quoted
            // string literal we inject into.
            const list = allowedSenders.map((s) => `'${s.replace(/['\\]/g, "")}'`).join(", ");
            // Replace via a function — a sender containing '$&' would otherwise be expanded
            // by String.replace and corrupt the generated script.
            const replaced = script.replace(
              /const ALLOWED_SENDERS = \[\];/,
              () => `const ALLOWED_SENDERS = [${list}];`,
            );
            if (replaced === script) {
              note =
                "// NOTE: could not find the ALLOWED_SENDERS line to inject; set it manually at the top.\n";
            }
            script = replaced;
          } else {
            note =
              "# NOTE: allowedSenders is ignored for Outlook — the script only acts on the messages you select.\n";
          }
        }
        return { content: [{ type: "text", text: note + script }] };
      } catch (e) {
        return { isError: true, content: [{ type: "text", text: errText(e) }] };
      }
    },
  );

  // 2) get_setup_instructions
  server.registerTool(
    "get_setup_instructions",
    {
      title: "Get DontMailMe setup instructions",
      description:
        "Returns step-by-step setup instructions for the chosen mail client, fetched live from dontmailme.org. Apple Mail instructions are in the Outlook (macOS) guide.",
      inputSchema: { client: z.enum(["gmail", "outlook", "apple-mail"]) },
    },
    async ({ client }) => {
      try {
        return { content: [{ type: "text", text: await fetchText(SETUP_URL[client]) }] };
      } catch (e) {
        return { isError: true, content: [{ type: "text", text: errText(e) }] };
      }
    },
  );

  // 3) explain_rfc8058 — static, no inbox access, no network
  server.registerTool(
    "explain_rfc8058",
    {
      title: "Explain RFC 8058 one-click unsubscribe",
      description: "Explains the RFC 8058 one-click unsubscribe standard DontMailMe uses.",
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: "text",
          text:
            "RFC 8058 — One-Click Unsubscribe.\n\n" +
            "Compliant senders include two headers, both covered by the DKIM signature:\n" +
            "  List-Unsubscribe: <https://example.com/u/abc>\n" +
            "  List-Unsubscribe-Post: List-Unsubscribe=One-Click\n\n" +
            "To unsubscribe, send an HTTPS POST to the List-Unsubscribe URL with body " +
            "`List-Unsubscribe=One-Click` and Content-Type `application/x-www-form-urlencoded`. " +
            "No link inside the email body is ever clicked (that risks tracking/phishing) — only the " +
            "authenticated header is acted on, and only when the sender passes SPF or DKIM.\n\n" +
            "DontMailMe runs this inside the user's OWN Gmail (Apps Script), Outlook (PowerShell), or " +
            "Apple Mail (AppleScript). There is no DontMailMe server in the loop: zero-data by design.",
        },
      ],
    }),
  );

  // 4) estimate_impact — math matches dontmailme.org/impact
  server.registerTool(
    "estimate_impact",
    {
      title: "Estimate inbox/CO2 impact",
      description:
        "Estimates yearly emails avoided, CO2e saved, equivalent car-km, and trees a donation funds. Uses the same transparent assumptions as dontmailme.org/impact (~104 emails/yr per newsletter, ~4 g CO2e/email, 0.16 kg CO2e/car-km, ~€5/tree, ~20 kg CO2/tree/yr).",
      inputSchema: {
        newsletters: z.number().int().nonnegative().describe("Number of newsletters unsubscribed from"),
        donationEur: z
          .number()
          .nonnegative()
          .optional()
          .describe("Optional pay-what-you-want donation in EUR, for the trees-planted estimate"),
      },
    },
    async ({ newsletters, donationEur }) => {
      const emailsPerYear = newsletters * EMAILS_PER_NEWSLETTER_YEAR;
      const kgCo2 = emailsPerYear * KG_CO2_PER_EMAIL;
      const carKm = Math.round(kgCo2 / KG_CO2_PER_CAR_KM);

      let treesLine = "";
      const structured: Record<string, number> = {
        newsletters,
        emailsAvoidedPerYear: emailsPerYear,
        kgCo2eSavedPerYear: Number(kgCo2.toFixed(1)),
        equivalentCarKm: carKm,
      };
      if (donationEur && donationEur > 0) {
        const trees = Math.floor(donationEur / EUR_PER_TREE);
        const treeCo2 = trees * KG_CO2_PER_TREE_YEAR;
        structured.treesPlanted = trees;
        structured.treeCo2PerYear = treeCo2;
        treesLine = `\nA €${donationEur} donation plants ~${trees} tree${trees === 1 ? "" : "s"} (~${treeCo2} kg CO2 absorbed/yr).`;
      }

      return {
        content: [
          {
            type: "text",
            text:
              `Unsubscribing from ${newsletters} newsletter${newsletters === 1 ? "" : "s"} avoids ` +
              `~${emailsPerYear.toLocaleString("en-US")} emails/year and ~${kgCo2.toFixed(1)} kg CO2e/year ` +
              `(≈ ${carKm} km of driving) — every year, automatically.${treesLine}`,
          },
        ],
        structuredContent: structured,
      };
    },
  );

  // 5) compare_tools — fetch the live comparison table
  server.registerTool(
    "compare_tools",
    {
      title: "Compare DontMailMe with other unsubscribe tools",
      description:
        "Returns the live comparison of DontMailMe vs Unroll.me, Cleanfox, Leave Me Alone, Clean Email and Mailstrom, fetched from dontmailme.org/compare.md.",
      inputSchema: {},
    },
    async () => {
      try {
        return { content: [{ type: "text", text: await fetchText(`${SITE}/compare.md`) }] };
      } catch (e) {
        return { isError: true, content: [{ type: "text", text: errText(e) }] };
      }
    },
  );
}
