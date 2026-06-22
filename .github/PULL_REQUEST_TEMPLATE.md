<!-- Thanks for contributing to DontMailMe! -->

## What does this change?

<!-- A short description of the change and the motivation. Link any related issue: Fixes #123 -->

## Type

- [ ] Bug fix
- [ ] New feature / mail client
- [ ] Copy / docs / translation
- [ ] Performance / SEO / agent-readiness
- [ ] Other:

## Checklist

- [ ] My change keeps DontMailMe **zero-data by design** (no backend, no tracking, runs in the user's own account).
- [ ] If I changed unsubscribe logic, I edited the canonical **`static/gmail.gs`** (the `/gmail` page renders it — no separate copy to keep in sync).
- [ ] If I added a provider, I edited **`src/data/providers.yaml`** with an honest tier/status (don't claim "live" for the not-yet-shipped IMAP path).
- [ ] I ran `npm run build` and tested the affected page(s) with `npm run preview`.
- [ ] Any statistic I added has a cited source; competitor claims are accurate and defensible.
- [ ] No hype wording; matches the project's calm, honest voice.
