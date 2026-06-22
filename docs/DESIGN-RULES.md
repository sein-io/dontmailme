# sein/UI v2.5 — Design Rules

Derived from the patterns that recur across top-tier showcases (Awwwards, FWA, CSS Design
Awards, godly.website, siteinspire, lapa.ninja) and adapted to *our* constraints: a fast,
static, accessible, **persuasive** site that respects the reader's time. These are rules, not
suggestions — every page and every template component should pass them.

> Two non-negotiables the owner set: **no scroll-jank** (nothing the reader has to scroll-and-wait
> for) and **compact** (a short page beats a complete one). Motion serves interaction, never
> decoration.

---

## A. Density & layout — fight the scroll

1. **One section, one idea.** If a section doesn't say something new in its first two lines, merge
   or cut it. Target: the homepage is graspable in **≤4 viewport heights**.
2. **Progressive disclosure beats long pages.** Show the claim; reveal the proof on intent
   (hover, accordion, "details"). A collapsed tile that expands is shorter *and* more engaging
   than a wall of text.
3. **One 8px spacing scale, used strictly.** Section rhythm uses a few fixed steps
   (8 / 16 / 24 / 32 / 64), never arbitrary values. Consistency reads as craft.
4. **Content max ~1100px, generous gutters.** Negative space is a feature. Let tiles breathe;
   crowding reads as "template," air reads as "designed."
5. **Grid discipline.** Everything aligns to a column or a baseline. Optical alignment over
   mechanical when they differ.

## B. Typography — the loudest design lever

6. **Oversized display, tight leading.** Hero `clamp(40px, 7vw, 72px)`, line-height 1.0–1.05,
   negative tracking. Body 16–18px, line-height ~1.6, measure ≤70ch.
7. **Few sizes, few weights.** ~5-step type scale; weights 400 / 500 / 700 only. Mono is reserved
   for numbers, code, versions, labels — never body.
8. **Section heading = one bold word or question.** `WHY?` `HOW?` `WHERE?` `WHICH?` — then a single
   explanatory line. Punchy beats descriptive.

## C. Color & depth — restraint

9. **One accent, used sparingly.** EMERALD on a near-neutral base: CTA, links, one hero word, data.
   If everything is accented, nothing is. The accent never appears decoratively.
10. **Depth is subtle.** A 1px border + one soft shadow + optional glass. Never heavy drop-shadows
    or skeuomorphism. Dark-first; both themes verified AA.

## D. Motion — interaction & load only (the owner's rule)

11. **Micro-interactions, 120–220ms, one easing.** Animate *state changes* — hover, focus, press,
    toggle, copy-confirm. A button that responds is the cheapest "expensive" detail.
12. **No scroll-triggered reveals. No scroll-jacking. No motion that lengthens the page or gates
    readability.** A one-shot entrance on first paint (above the fold) is allowed; sequenced
    section reveals are not.
13. **`prefers-reduced-motion` is a hard gate.** With motion off the site must look *finished*, not
    broken (no content stuck at opacity 0).

## E. Navigation — always-on wayfinding

14. **Persistent chrome on every page:** a collapsible left **rail** (icons → icons+labels on
    expand), a **sticky header** (brand + one primary CTA), and a thin **scroll progress bar**.
    The reader always knows where they are and reaches anywhere in one click. Never let navigation
    disappear between pages.
15. **One primary action, repeated.** The same CTA ("Clean my inbox") in the header and at each
    natural decision point. Secondary links stay quiet.

## F. Copy — Ogilvy

16. **Headline to the heart, copy to the head.** An emotional, specific headline; the rational
    proof sits *right beside it* (advertorial logic). Lead with the outcome, demote the mechanism.
17. **Specific beats vague, confident beats hedged, and show the receipt.** Real numbers, the named
    standard (RFC 8058), the actual code, the source link. We have the best argument — write like it.

---

## Applying it here

| Rule | On dontmailme.org |
|---|---|
| A1–A2 | Feature tiles collapse to label+title; the body reveals on hover/focus → section shrinks ~40% |
| B8 | Section labels become `WHY? / HOW? / WHERE? / WHICH?` |
| D11–D13 | Button + toggle + copy micro-interactions; hero one-shot fade; **scroll-reveal removed** |
| E14 | Collapsible rail + sticky header + progress bar, present on *all* pages |
| F16–F17 | Hero outcome headline with proof copy beside it; sourced stats; live code; one repeated CTA |

This file is the contract. When in doubt, choose the option that is **shorter, calmer, and more
specific**.
