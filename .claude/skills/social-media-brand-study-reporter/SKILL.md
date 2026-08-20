---
name: social-media-brand-study-reporter
description: When compiling raw findings from a Social Media Management brand study (the 9 audits, Step 0 industry classification, SWOT, and fix list from social-media-brand-study) into the two final documents — a full-detail internal report and a diagnosis-only client report. Use when the user says "compile the report," "write up the brand study," "generate the client report," or after social-media-brand-study has produced raw audit findings that still need to be assembled into polished documents. Not for doing the research itself (see social-media-brand-study) and not for turning the client report into the 3 tiered packages (see brand-study).
metadata:
  version: 1.0.0
---

# Social Media Brand Study — Report Compiler

You don't research anything. You're handed raw findings — the Step 0 industry classification, and the results of all 9 audits (Page, Industry, Competitor Analysis, Content, Gap, 6-Month Performance, Missing Functions, What's Missing, SWOT groundwork) from `social-media-brand-study` — and your job is to compile them into two finished, well-written documents. If findings are missing or clearly incomplete for a section, say so rather than inventing content to fill the gap.

## The two documents

Always produce both. Never one, never merged.

### 1. Internal report — full detail, unredacted

Audience: the admin/specialist team only. Never sent to the client.

Section order: Industry Filter classification → Page Audit → Industry Audit → Competitor Analysis → Content Audit → Gap Audit → Page Performance (6mo) → Missing Functions → What's Missing (synthesis) → SWOT → Fix Checklist (Page/Content/Ads, prioritized, effort-tagged).

This version **can** include draft fix content where the research already produced it half-formed — a rough bio rewrite, a first-pass CTA suggestion, raw competitor notes, live-data source numbers and confidence caveats, internal reasoning behind the SWOT placements. The point is continuity: whoever delivers the paid package later (`social-media-platform-auditor`, `social-media-content-calendar`, etc.) should be able to pick this up and not redo the thinking.

### 2. Client report — a short teaser, not a section-by-section walkthrough

Audience: the customer. This is what gets converted to PDF and attached as the `brief` file in `proposal-builder-form.tsx`. **It is not the internal report's 11 sections trimmed down** — it's a different, much shorter shape, built to create urgency and trust in under two minutes of reading. Compile it from the internal report's findings (pick the strongest material — don't write it independently), but the structure itself is:

1. **1-2 line summary** — the business and what was studied (the industry archetype can be named casually as context)
2. **Opportunity Score (current)** — a single number, out of 100, quantifying overall social media health/opportunity gap. See "Opportunity Score methodology" below.
3. **3-5 headline findings** — the single strongest finding from whichever audits turned up something notable, one line each, no fix content attached ("Your bio isn't showing up in search" — not the rewritten bio)
4. **SWOT snapshot** — 4 short bullets, one per quadrant, not the full grid
5. **Fix count, not fix list** — "We found N fixable issues" with a category breakdown (e.g., "6 page fixes, 5 content fixes, 3 ads fixes") — count and categories only, never the itemized checklist
6. **Projected Improved Score** — what the Opportunity Score could realistically reach after the fixes get implemented, shown per package tier (see below) — this is the single strongest hook in the document
7. Leads directly into the 3 tailored package options

No literal fix content ever appears here (no rewritten bio, no ready captions, no built calendar), and no full audit-by-audit walkthrough. Strip out raw research notes, live-data source numbers, and internal confidence caveats — those stay in the internal report only.

### Opportunity Score methodology

A simple, defensible 0-100 score — not an arbitrary number. Weight it across what the audits actually measured:

| Component | Weight | Draws from |
|---|---|---|
| Profile/setup completeness | 20% | Page Audit |
| Content quality & consistency | 25% | Content Audit (format mix, value/sales ratio, production quality, brand consistency) |
| Competitive position | 20% | Competitor Analysis, Gap Audit |
| Engagement & performance | 20% | Page Performance (6mo) |
| Platform feature completeness | 15% | Missing Functions Audit |

Score each component from the findings (a rough 0-100 sub-score per row is fine — this doesn't need to be a precise formula, just a consistent, explainable one), weight and sum. State the current score plainly (e.g., "42/100 — room to grow").

**Projected Improved Score**, per tier, since the fix count scales the realistic improvement:

- **Basic (5 fixes)** — modest bump, mostly from Page-level quick wins (e.g., 42 → 58)
- **Standard (10 fixes)** — larger bump, adds Content-level fixes (e.g., 42 → 74)
- **Premium (15 fixes)** — largest realistic bump, covers nearly the full checklist (e.g., 42 → 88)

These are directional projections based on which checklist categories each tier's fix count actually covers — not a guarantee. Say so plainly in the report rather than presenting them as certain outcomes. This scoring mechanic is what makes the tier comparison concrete instead of abstract — "here's the number, here's what buying more fixes does to it."

## How to compile — always in this order

1. **Write the internal report first**, complete, from the raw findings you were handed.
2. **Trim it down** into the client report — remove execution content and internal-only notes, keep every diagnosis and its priority/effort tag.

Never build the client version first and "add more" to make the internal one — that direction risks the client version staying execution-light by accident rather than by design, and makes it easy to forget what should have been stripped.

## Fix Checklist — the section requiring most care

This is the deliverable that drives the proposal, so get the split right:

- **Internal**: full checklist, any draft fix content, plus a note on total fix count found (so whoever scopes the Basic/Standard/Premium fix counts — 5/10/15 — knows whether the checklist even has 15 items, or fewer)
- **Client**: the same checklist, same prioritization and effort tags, names and explanations only

## SWOT

Every point must trace back to a specific audit finding in both versions — a SWOT that reads as generic boilerplate is a compilation failure, not a research failure; if the raw findings don't support a strong SWOT point, don't manufacture one.

## Common Mistakes to Avoid

- Producing only one document, or sending the internal (unredacted) version to the client
- Building the client report first, then padding it into the internal one
- Inventing findings to fill a section the research didn't actually cover — flag the gap instead
- Losing the archetype/industry framing in the client report — it should still read as tailored to this specific business, not generic
- A Fix Checklist with no effort/impact ordering carried through from the raw findings — that ordering is part of what you're compiling, not something to drop

## Related Skills

- **social-media-brand-study** — produces the raw findings this skill compiles; also defines the 9 audits, Step 0 industry filter, and the diagnosis/execution boundary rules in full
- **brand-study** — takes the finished client report and turns it into the 3 tailored package options
