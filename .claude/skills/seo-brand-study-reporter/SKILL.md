---
name: seo-brand-study-reporter
description: When compiling raw findings from an SEO brand study (the Step 0 site-type classification, specialist audit findings, SWOT, and fix checklist from seo-brand-study) into the two final documents — a full-detail internal report and a diagnosis-only client report. Use when the user says "compile the SEO report," "write up the SEO brand study," "generate the SEO client report," or after seo-brand-study has produced raw findings that still need to be assembled into polished documents. Not for doing the research itself (see seo-brand-study) and not for turning the client report into the 3 tiered packages (see brand-study).
metadata:
  version: 1.0.0
---

# SEO Brand Study — Report Compiler

You don't research anything. You're handed raw findings — the Step 0 site-type classification and the results of every specialist audit (`seo-brand-study`'s universal + archetype-specific set) — and your job is to compile them into two finished, well-written documents, both filtered through the ranking-improvement lens `seo-brand-study` frames every finding with. If findings are missing or clearly incomplete for a section, say so rather than inventing content to fill the gap.

## The two documents

Always produce both. Never one, never merged.

### 1. Internal report — full detail, unredacted

Audience: the admin/specialist team only. Never sent to the client.

Section order: Site-Type Classification (with reasoning) → Technical Audit → Performance/CWV → On-Page & Content Audit → Structured Data Audit → Keyword & Topical Gap → Backlink Profile → Sitemap/Indexation → Search Experience (SXO) → Archetype-Specific Audit(s) → SWOT → Fix Checklist (technical / page-content / link-authority, prioritized, effort-tagged).

This version **can** include draft fix content where the research already produced it half-formed — a first-pass title-tag rewrite, a rough schema snippet, raw competitor SERP notes, live GSC/GA4 numbers and confidence caveats, internal reasoning behind the SWOT placements. The point is continuity: whoever delivers the paid package later (`seo-team`'s specialists) should be able to pick this up and not redo the thinking.

### 2. Client report — a short teaser, not a section-by-section walkthrough

Audience: the customer. This is what gets converted to PDF and attached as the `brief` file in `proposal-builder-form.tsx`. **It is not the internal report's sections trimmed down** — it's a different, much shorter shape, built to create urgency and trust in under two minutes of reading. Compile it from the internal report's findings (pick the strongest material — don't write it independently):

1. **1-2 line summary** — the business, its site type, and what was studied
2. **Ranking Opportunity Score (current)** — a single number, out of 100, quantifying how much ranking headroom exists. See "Ranking Opportunity Score methodology" below.
3. **3-5 headline findings** — the single strongest finding from whichever audits turned up something notable, one line each, always phrased through the ranking lens ("You're not indexed for 60% of your product pages" — not the fix itself, no rewritten title tags, no built schema)
4. **SWOT snapshot** — 4 short bullets, one per quadrant, not the full grid
5. **Fix count, not fix list** — "We found N fixable issues" with a category breakdown (e.g., "8 technical fixes, 6 page/content fixes, 4 link-authority targets") — count and categories only, never the itemized checklist
6. **Projected Improved Score** — what the Ranking Opportunity Score could realistically reach after the fixes get implemented, shown per package tier (see below) — this is the single strongest hook in the document
7. Leads directly into the 3 tailored package options

No literal fix content ever appears here (no rewritten title tags/meta, no built schema markup, no delivered backlink list). Strip out raw research notes, live GSC/GA4 numbers, and internal confidence caveats — those stay in the internal report only.

### Ranking Opportunity Score methodology

A simple, defensible 0-100 score, weighted around what actually gates ranking:

| Component | Weight | Draws from |
|---|---|---|
| Technical health & indexability | 25% | Technical Audit, Sitemap/Indexation — nothing ranks if it isn't crawled and indexed |
| On-page & content quality | 25% | On-Page & Content Audit — E-E-A-T, depth, thin-content |
| Keyword & competitive position | 20% | Keyword/Topical Gap, SXO — coverage and intent-match vs. competitors actually ranking |
| Authority / backlink profile | 15% | Backlink Profile |
| Archetype-specific completeness | 15% | Local (GBP/NAP) or E-commerce (product schema/Shopping feed) or Structured Data, whichever applies |

Score each component from the findings (a rough 0-100 sub-score per row is fine — this doesn't need to be a precise formula, just a consistent, explainable one), weight and sum. State the current score plainly (e.g., "38/100 — significant ranking headroom").

**Projected Improved Score**, per tier, since the fix count and coverage scale the realistic improvement:

- **Basic** (5 technical fixes, 3 pages, 5 keywords) — modest bump, mostly technical/indexability quick wins (e.g., 38 → 52)
- **Standard** (5-15 technical fixes, up to 10 pages, 15 keywords, backlink targets, GBP) — larger bump, adds content/authority coverage (e.g., 38 → 70)
- **Premium** (up to 15 pages, full site audit, 6-month content plan) — largest realistic bump, covers nearly the full checklist (e.g., 38 → 86)

These are directional projections based on which checklist categories each tier's fix count actually covers — not a guarantee. Say so plainly in the report rather than presenting them as certain outcomes.

## How to compile — always in this order

1. **Write the internal report first**, complete, from the raw findings you were handed.
2. **Trim it down** into the client report — remove fix content and internal-only notes, keep every diagnosis and its priority/effort tag, keep the ranking-lens framing on every headline finding.

Never build the client version first and "add more" to make the internal one — that direction risks the client version staying execution-light by accident rather than by design.

## Fix Checklist — the section requiring most care

- **Internal**: full checklist, any draft fix content, plus a note on total fix count found (so whoever scopes the tier fix counts knows whether the checklist even has enough items)
- **Client**: the same checklist's category counts and prioritization, names and one-line explanations only — never the itemized fixes themselves

## SWOT

Every point must trace back to a specific audit finding in both versions, and every point should be phrased through the ranking lens where applicable — a SWOT that reads as generic boilerplate is a compilation failure, not a research failure.

## Common Mistakes to Avoid

- Producing only one document, or sending the internal (unredacted) version to the client
- Building the client report first, then padding it into the internal one
- Inventing findings to fill a section the research didn't actually cover — flag the gap instead
- Losing the ranking-lens framing in the client report — findings should read as "this is costing you ranking," not generic SEO commentary
- Presenting the backlink target list as delivered links, or GBP guidance as a completed setup — those are fixes to implement, not already-applied changes (see the scope note in `seo-team`)

## Related Skills

- **seo-brand-study** — produces the raw findings this skill compiles; also defines the Step 0 site-type filter and the ranking-lens framing in full
- **brand-study** — takes the finished client report and turns it into the 3 tailored package options
