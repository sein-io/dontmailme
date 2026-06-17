```markdown
# dontmailme Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you the core development patterns, coding conventions, and collaborative workflows used in the `dontmailme` JavaScript codebase. The repository focuses on building and maintaining a static website with strong attention to documentation, SEO, community health, and performance optimization, all without a detected framework. You'll learn how to structure code, contribute new pages, improve SEO, update documentation, and manage repository health files using clear, repeatable processes.

## Coding Conventions

- **Language:** JavaScript (no framework)
- **File Naming:** Use camelCase for JavaScript files and directories.
  - Example: `emailUtils.js`, `userProfile.js`
- **Import Style:** Use relative imports.
  ```js
  import { sendMail } from './emailUtils.js';
  ```
- **Export Style:** Use named exports.
  ```js
  // emailUtils.js
  export function sendMail(address, content) { /* ... */ }
  ```
- **Commit Messages:** Use [Conventional Commits](https://www.conventionalcommits.org/) with the `feat` prefix for new features.
  - Example: `feat: add compare page with feature matrix`
- **Documentation:** Use Markdown (`.md`) for documentation and HTML for site pages. Each page may have both `.html` and `.md` twins.
- **Assets:** Place fonts in the `fonts/` directory; update `styles.css` for style changes.

## Workflows

### Add or Update Site Pages
**Trigger:** When introducing a new feature, section, or informational resource to the website.  
**Command:** `/new-page`

1. Create or update the relevant `.html` file (e.g., `compare.html`, `faq.html`).
2. Create or update the corresponding `.md` file (e.g., `compare.md`, `faq.md`).
3. Update navigation or footer as needed (in `index.html` or `styles.css`).
4. Add or update relevant assets (images, fonts, scripts) if required.

**Example:**
```bash
# Add a new FAQ page
touch faq.html faq.md
# Edit navigation in index.html
```

---

### Update README and Docs for Growth or Positioning
**Trigger:** When improving project presentation, onboarding, or growth strategy.  
**Command:** `/update-readme`

1. Rewrite or update `README.md` with new copy, tables, or quick-start instructions.
2. Update or add supporting docs (e.g., `docs/STRATEGY.md`, `docs/GROWTH.md`, `docs/logo.svg`).
3. Ensure SEO/AEO keywords and accurate comparisons are included.
4. Update references to new or changed pages.

**Example:**
```markdown
# dontmailme

A privacy-focused email forwarding service...
```

---

### Improve SEO and Agent Readiness
**Trigger:** When boosting discoverability, ranking, or agent compatibility.  
**Command:** `/improve-seo`

1. Add or update `robots.txt`, `sitemap.xml`, and meta tags in HTML files.
2. Add or update `llms.txt`, `llms-full.txt`, `AGENTS.md` for agent-specific instructions.
3. Add JSON-LD or other structured data to HTML pages.
4. Ensure code blocks and scripts are statically rendered for crawler visibility.

**Example (meta tags):**
```html
<meta name="description" content="dontmailme: privacy-focused email forwarding">
```

---

### Add or Update Community Health Files
**Trigger:** When improving the GitHub Community Profile or contributor onboarding.  
**Command:** `/add-community-health`

1. Add or update `.github/CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `.github/SECURITY.md`.
2. Add or update `FUNDING.yml`, `PULL_REQUEST_TEMPLATE.md`, and `ISSUE_TEMPLATE` files.
3. Update `.github/dependabot.yml` for dependency management.

**Example:**
```markdown
# CONTRIBUTING

Thank you for considering a contribution...
```

---

### Self-host and Optimize Fonts
**Trigger:** When improving font loading speed or updating font usage.  
**Command:** `/optimize-fonts`

1. Add or update font files in the `fonts/` directory.
2. Update `styles.css` to reference new or optimized fonts.
3. Update `_headers` for caching and performance.

**Example (styles.css):**
```css
@font-face {
  font-family: 'Inter';
  src: url('./fonts/Inter.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
```

## Testing Patterns

- **Framework:** Unknown (no explicit test framework detected).
- **File Pattern:** Tests are placed in files matching `*.test.*`.
- **Example:**
  ```js
  // emailUtils.test.js
  import { sendMail } from './emailUtils.js';

  test('sendMail sends email', () => {
    // test implementation
  });
  ```

## Commands

| Command              | Purpose                                                        |
|----------------------|----------------------------------------------------------------|
| /new-page            | Add or update a site page (HTML and Markdown twin)             |
| /update-readme       | Update README and supporting documentation for growth/position  |
| /improve-seo         | Improve SEO and agent/crawler readiness                        |
| /add-community-health| Add or update community health and GitHub profile files         |
| /optimize-fonts      | Add or optimize self-hosted fonts and update styles            |
```
