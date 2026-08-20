# cro-brand-study

**Definition:** `.claude/agents/cro-brand-study.md`
**Skill it loads:** `.claude/skills/cro-brand-study/SKILL.md` (+ vendored `cro` skill)

Runs when a customer requests the CRO service, before any package is picked — the free research step.

**North star:** every finding is filtered through the conversion lens — does fixing this remove purchase friction, or build the trust needed to complete one?

## Step 0 — Business-Model Filter

Classifies the store into a business model before auditing:

| Model | Signal | Weighted toward |
|---|---|---|
| DTC / Single-Category | One core product line | Product-page persuasion, single-item checkout friction |
| Multi-Category Catalog | Broad catalog, filters | Search/filter usability, cart-building friction |
| Subscription / Recurring | Recurring billing | Plan clarity, cancellation-fear signals, trial friction |
| Marketplace / Multi-Vendor | Multiple sellers | Per-seller trust, fulfillment/return clarity |

## The Audit

Actually walks the buying path (landing → product/category → cart → checkout → confirmation) as a customer would — not from screenshots. Always explicitly checks for surprise shipping costs at checkout and mobile-specific breakage, the two most common real abandonment causes.

## Output

Doesn't write the final report itself — hands raw findings (business-model classification, funnel-walkthrough findings, SWOT groundwork, prioritized drop-off checklist) to `cro-brand-study-reporter`.

Tools: `Read, Grep, Glob, Write, WebSearch, WebFetch`
