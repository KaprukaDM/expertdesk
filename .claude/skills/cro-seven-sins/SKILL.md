---
name: cro-seven-sins
description: When running a fast, easy-to-explain conversion-killer scan against the 7 most common page-level mistakes — too much text, poor layout/visual hierarchy, bad eye flow, weak/buried CTA, missing social proof, slow load, too many choices/distractions. Use when the user says "7 deadly sins of CRO," "conversion killers," "quick CRO scan," or asks for a fast pass/fail check before the deeper UX Laws Audit. This is a standalone, lightweight checklist — for the full 55-law audit see ux-laws-audit; for the funnel-level drop-off audit see cro-fulfillment.
metadata:
  version: 1.0.0
---

# 7 Deadly Sins of CRO

A fast, pass/fail scorecard against the 7 most commonly cited conversion killers — deliberately simpler and cheaper to run than the full 55-law UX Laws Audit, so it fits the Basic tier. It overlaps some of that corpus conceptually (that's expected — these are the same underlying failure modes, just named for a quick read rather than academic citation), but it's scored independently as its own pass/fail checklist, not a rewrite of the laws audit.

## The 7 Sins

1. **Too Much Text** — dense, unstructured paragraphs instead of scannable copy. Visitors skim; a wall of text gets skipped, not read.
2. **Poor Layout / Visual Hierarchy** — no clear priority among elements; everything reads as equally important, so nothing stands out.
3. **Bad Eye Flow** — the layout doesn't guide the eye toward the goal (natural reading pattern broken, key elements out of the visitor's path).
4. **Weak or Buried CTA** — the call-to-action is unclear, low-contrast, too small, or pushed below the fold.
5. **Missing Social Proof / Trust Signals** — no reviews, testimonials, ratings, or trust badges near the decision point.
6. **Slow Load / Performance Friction** — the page is slow enough that visitors abandon before they can even evaluate it.
7. **Too Many Choices / Distractions** — competing links, unrelated nav items, or pop-ups pulling attention away from the page's one job.

## How to Score a Page

For each sin: **Pass** (not present), **Minor** (present but not blocking), or **Fail** (actively hurting conversion) — with one concrete observation per sin, never a bare pass/fail with no evidence. Score against what the page is actually trying to get the visitor to do, same as the laws audit's judgment rule — a sin that doesn't apply to this page's goal isn't a fail, it's not applicable.

Sin 6 (Slow Load) is checked objectively via `scripts/check-page-speed.ts` (a plain fetch-timing check — flags `slow`/`borderline`/`fine`), not a subjective read — report the actual number.

## Output

A 7-row scorecard per key page (sin, verdict, one-line observation), quick to read for a client who won't read a 55-law report. Feeds into the Funnel Audit's conversion-lens framing the same way any other CRO finding does.

## Common Mistakes to Avoid

- Treating this as a replacement for the deeper UX Laws Audit (Standard+) — it's a fast Basic-tier scan, not the full page-level review
- Scoring a sin as "Fail" with no concrete on-page observation attached
- Guessing at load speed instead of running the actual timing check
