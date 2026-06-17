---
name: improve-seo-and-agent-readiness
description: Workflow command scaffold for improve-seo-and-agent-readiness in dontmailme.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /improve-seo-and-agent-readiness

Use this workflow when working on **improve-seo-and-agent-readiness** in `dontmailme`.

## Goal

Implements or updates files and metadata to improve SEO and make the site more accessible to AI agents and crawlers.

## Common Files

- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `llms-full.txt`
- `AGENTS.md`
- `*.html`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Add or update robots.txt, sitemap.xml, and meta tags in HTML files
- Add or update llms.txt, llms-full.txt, AGENTS.md for agent-specific instructions
- Add JSON-LD or other structured data to HTML pages
- Ensure code blocks and scripts are statically rendered for crawler visibility

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.