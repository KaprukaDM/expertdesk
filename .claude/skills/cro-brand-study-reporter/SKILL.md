---
name: cro-brand-study-reporter
description: When compiling raw findings from a CRO brand study (the Step 0 business-model classification, funnel-walkthrough findings, SWOT, and fix checklist from cro-brand-study) into the two final documents — a full-detail internal report and a diagnosis-only client report. Use when the user says "compile the CRO report," "write up the CRO brand study," "generate the CRO client report," or after cro-brand-study has produced raw findings that still need to be assembled into polished documents. Not for doing the research itself (see cro-brand-study) and not for turning the client report into the 3 tiered packages (see brand-study).
metadata:
  version: 1.0.0
---

# CRO Brand Study — Report Compiler

You don't research anything. You're handed raw findings — the Step 0 business-model classification and the funnel-walkthrough results from `cro-brand-study` — and your job is to compile them into two finished, well-written documents, both filtered through the conversion lens `cro-brand-study` frames every finding with. If findings are missing or clearly incomplete for a section, say so rather than inventing content to fill the gap.

## The two documents

Always produce both. Never one, never merged.

### 1. Internal report — full detail, unredacted

Audience: the admin/specialist team only. Never sent to the client.

Section order: Business-Model Classification (with reasoning) → Funnel Walkthrough (landing → product/category → cart → checkout → confirmation, step by step) → Trust Signals → Mobile vs. Desktop → Tracking Status → SWOT → Fix Checklist (prioritized by impact on completed purchases, effort-tagged).

This version **can** include draft fix content where the research already produced it half-formed — a rough CTA rewrite, a first-pass form-field simplification, raw drop-off numbers and confidence caveats. The point is continuity: whoever delivers the paid package later (the CRO fulfillment specialists) should be able to pick this up and not redo the thinking.

### 2. Client report — a short teaser, not a section-by-section walkthrough

Audience: the customer. This is what gets converted to PDF and attached as the `brief` file in `proposal-builder-form.tsx`. **It is not the internal report's sections trimmed down** — it's a different, much shorter shape, built to create urgency and trust in under two minutes of reading. Compile it from the internal report's findings (pick the strongest material — don't write it independently):

1. **1-2 line summary** — the store and its business model
2. **Conversion Opportunity Score (current)** — a single number, out of 100, quantifying how much conversion headroom exists. See methodology below.
3. **3-5 headline findings** — the single strongest finding from the funnel walkthrough, one line each, conversion-lens phrasing, no fix content attached ("Your checkout adds a surprise shipping cost at the final step" — not the rewritten checkout copy)
4. **SWOT snapshot** — 4 short bullets, one per quadrant, not the full grid
5. **Drop-off count, not the itemized list** — "We found N drop-off points" with a category breakdown (e.g., "3 checkout-flow issues, 2 trust-signal gaps, 1 mobile-specific bug")
6. **Projected Improved Score** — what the Conversion Opportunity Score could realistically reach after the fixes get implemented, shown per package tier — this is the single strongest hook in the document
7. Leads directly into the 3 tailored package options

No literal fix content ever appears here (no rewritten CTA copy, no built A/B test, no finished tracking setup) and no full step-by-step funnel walkthrough. Strip out raw research notes, drop-off numbers, and internal confidence caveats — those stay in the internal report only.

### Conversion Opportunity Score methodology

A simple, defensible 0-100 score, weighted around what actually gates conversion:

| Component | Weight | Draws from |
|---|---|---|
| Checkout friction | 30% | Funnel Walkthrough — steps, form fields, guest checkout, surprise costs |
| Trust signals | 25% | Trust Signals — reviews, security badges, return policy visibility |
| Mobile experience | 20% | Mobile vs. Desktop — since most traffic is mobile for most stores |
| Measurement readiness | 15% | Tracking Status — can anything even be measured after fixes ship |
| Competitive position | 10% | SWOT vs. named competitors' funnels |

Score each component from the findings (a rough 0-100 sub-score per row is fine — this doesn't need to be a precise formula, just a consistent, explainable one), weight and sum. State the current score plainly (e.g., "41/100 — real headroom in checkout and trust").

**Projected Improved Score**, per tier, since the fix scope scales the realistic improvement:

- **Basic** (top 3 pages, top 5 drop-off points, CTA/form quick fixes) — modest bump from the highest-impact quick wins (e.g., 41 → 56)
- **Standard** (+ full funnel to 6 pages, heatmap/session-recording, mobile+desktop UX, 1 re-scan) — larger bump, adds mobile and UX-level fixes (e.g., 41 → 74)
- **Premium** (+ tracking audit, A/B roadmap, competitor benchmark) — largest realistic bump, covers measurement + ongoing testing capability, not just one-time fixes (e.g., 41 → 87)

These are directional projections based on which checklist categories each tier's scope actually covers — not a guarantee. Say so plainly in the report.

## How to compile — always in this order

1. **Write the internal report first**, complete, from the raw findings you were handed.
2. **Trim it down** into the client report — remove fix content and internal-only notes, keep every diagnosis and its priority/effort tag, keep the conversion-lens framing on every headline finding.

Never build the client version first and "add more" to make the internal one — that direction risks the client version staying execution-light by accident rather than by design.

## Common Mistakes to Avoid

- Producing only one document, or sending the internal (unredacted) version to the client
- Building the client report first, then padding it into the internal one
- Inventing findings to fill a section the research didn't actually cover — flag the gap instead
- Losing the conversion-lens framing in the client report — findings should read as "this is costing you completed purchases," not generic UX commentary
- Presenting the A/B test roadmap or a re-scan as already-executed work — those are Premium/Standard deliverables to be fulfilled, not evidence already gathered

## Related Skills

- **cro-brand-study** — produces the raw findings this skill compiles; also defines Step 0 and the conversion-lens framing in full
- **brand-study** — takes the finished client report and turns it into the 3 tailored package options
