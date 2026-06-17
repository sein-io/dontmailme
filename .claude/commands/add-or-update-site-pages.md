---
name: add-or-update-site-pages
description: Workflow command scaffold for add-or-update-site-pages in dontmailme.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-site-pages

Use this workflow when working on **add-or-update-site-pages** in `dontmailme`.

## Goal

Adds new pages or updates existing ones, including both HTML and Markdown twins, to expand or improve site content.

## Common Files

- `*.html`
- `*.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or update .html file for the page (e.g., compare.html, faq.html, teams.html)
- Create or update corresponding .md file (e.g., compare.md, faq.md, teams.md)
- Update navigation or footer if needed (in index.html or styles.css)
- Update or add relevant assets (e.g., images, fonts, scripts) if required

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.