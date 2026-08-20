---
name: cro-brand-study
description: When researching a store for a CRO brand study — runs a full agency-grade conversion audit gated by a Step 0 business-model filter (DTC/Single-Category, Multi-Category Catalog, Subscription/Recurring, Marketplace), walks the actual buying path as a customer would, and produces raw findings (SWOT + prioritized drop-off/fix checklist) for cro-brand-study-reporter to compile. Use when the user says "CRO brand study," "research this store for conversion," or after a ServiceRequest comes in for the CRO service (instantCheckout: false, requiresWebsite: true, requires an online checkout). Not for the lighter generic CRO checklist in brand-study (this supersedes it for CRO specifically), not for compiling the final report (see cro-brand-study-reporter), and not for fulfilling an order after a package is picked (see cro-team / cro-orchestrator).
metadata:
  version: 1.0.0
---

# CRO Brand Study — Deep Research

This is the CRO-specific deep-dive that supersedes the generic checklist in the `brand-study` skill — same relationship as `seo-brand-study` has to the SEO section, and `social-media-brand-study` has to `social-media-management`. It exists because a subscription box's checkout friction looks nothing like a marketplace's, and running one generic funnel checklist against every store produces generic, low-value findings.

Load the vendored `cro` skill (from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)) for the underlying conversion-optimization methodology — this skill adds the business-model filter and the SWOT/checklist compilation on top of it.

## North Star — The Conversion Lens

Every website's checkout exists to turn a visitor into a completed purchase. Every finding in this study gets filtered through one question: **does fixing this remove friction between "visitor arrives" and "order confirmed" — directly, or by building the trust needed to get there?**

Concretely, that means:

- A UX finding matters because it's blocking or slowing someone who already intends to buy — not because it looks dated
- A trust-signal finding matters because its absence is triggering hesitation at the exact moment someone reaches for their card, not because "best practice says add reviews"
- A tracking finding matters because you can't fix what you can't measure — a missing conversion event isn't a technical footnote, it's why nobody can tell which fix actually worked
- If a finding can't be tied back to "this either removes purchase friction or builds the trust needed to complete one," don't include it — it belongs elsewhere (brand tone → not in scope, page speed as a ranking factor → SEO's lane, this is CRO's lens: speed matters here only as far as it causes abandonment)

Frame every finding this way explicitly — not "your checkout has too many steps" but "your checkout is 5 steps versus the 2-3 steps your best-converting competitors use, and step 3 is where you're most likely losing mobile buyers to a form that doesn't autofill."

## Step 0 — Business-Model Filter

Classify the store before auditing. This determines where friction is most likely to live and which findings matter most.

| Model | Signal | Weight toward |
|---|---|---|
| **DTC / Single-Category** | One core product line, simple catalog, likely direct-to-checkout flow | Product-page persuasion, single-item checkout friction, shipping/pricing clarity |
| **Multi-Category Catalog** | Broad catalog, category/filter navigation, comparison shopping | Search/filter usability, cart-building friction, cross-sell noise vs. clarity |
| **Subscription / Recurring** | Recurring billing, plan selection, trial-to-paid conversion | Plan/pricing clarity, cancellation-fear signals (money-back guarantee, pause vs. cancel), trial friction |
| **Marketplace / Multi-Vendor** | Multiple sellers, variable trust per listing, split fulfillment | Per-seller trust signals, fulfillment/return clarity, checkout consolidation across sellers |

A store can span more than one (a subscription box sold through a multi-category storefront) — run both weightings rather than forcing a single bucket.

## The Audit — Walk the Actual Funnel

Don't audit from screenshots or assumptions — go through the real buying path as a customer would: landing → product/category → cart → checkout → confirmation. For each step:

- **Friction**: form fields, unclear CTAs, unnecessary steps, checkout requiring account creation, missing guest checkout, slow/broken mobile flow
- **Trust signals**: reviews, security badges, return policy visibility, shipping cost transparency (surprise costs at checkout are the single most common abandonment cause — always check for this explicitly)
- **Mobile vs. desktop**: note anything that degrades or breaks specifically on mobile — most traffic for most stores is mobile, so a desktop-only review misses the majority of real friction
- **Tracking**: is GA4/conversion tracking even installed — if not, flag it as a standalone Premium-tier finding, since nothing else can be measured until this exists

## Compiling the Study

1. Run the funnel walkthrough and Step 0 classification.
2. Pull findings into one **SWOT** (Strengths / Weaknesses / Opportunities / Threats vs. named competitors' funnels).
3. Build a **prioritized drop-off/fix checklist**, ranked by estimated impact on completed purchases — a broken mobile checkout step beats a missing trust badge for priority.
4. Every finding must be specific and traceable to an actual step in the funnel — no generic "reduce friction" boilerplate. Cite the actual page, the actual field, the actual competitor doing it better.

## Output — Raw Findings, Handed to the Reporter

You produce raw findings, not the final documents — `cro-brand-study-reporter` compiles those. Hand it:

- Business-model classification (Step 0 result) with the reasoning
- The funnel walkthrough findings, conversion-lens framing intact
- SWOT groundwork
- Prioritized drop-off/fix checklist
- Scope units for tailoring packages: pages in the funnel review (3→6), drop-off points ranked, whether tracking is installed — matching the units in `src/lib/services.ts`'s CRO package

## Common Mistakes to Avoid

- Auditing from static screenshots instead of actually walking the funnel as a buyer
- Treating every store as DTC — a subscription box's biggest friction is usually cancellation-fear, not checkout steps
- Missing the shipping-cost-surprise check — it's the single most common real-world abandonment cause and easy to overlook
- Desktop-only review when most traffic is mobile
- Generic findings not tied to a specific funnel step or competitor

## Related Skills

- **cro-brand-study-reporter** — compiles these raw findings into the Internal Report + Client Report
- **brand-study** — turns the Client Report into the 3 tiered package options the customer picks from
- **cro-team** — the fulfillment side: dispatches the CRO specialists after a package is picked
