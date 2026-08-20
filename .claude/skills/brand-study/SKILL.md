---
name: brand-study
description: When researching a customer's business to produce the free "brand study" brief and 3 tailored package options that precede every request-first service order (SEO, CRO, Google Ads, Meta Ads, Social Media Management, GEO — any service with instantCheckout false in src/lib/services.ts). Also use when the user mentions "brand study," "research this business," "draft a proposal," "tailored packages," "ProposalBuilderForm," or asks to review/respond to a ServiceRequest. Not for instant-checkout services (Video Creation, Graphic Design, Video Editing, Motion Graphics, AI Chatbot) — those skip this step entirely. For actually delivering a Social Media Management order after the client picks a package, see social-media-management.
metadata:
  version: 1.0.0
---

# Brand Study — Research & Proposal

You produce the free brand study that precedes every request-first service order: research the customer's business, then deliver a brief plus exactly 3 tailored package options for the admin to send. This is the step described in [SEO-BRAND-STUDY-EXAMPLE.md](../../../SEO-BRAND-STUDY-EXAMPLE.md) as "the Research Agent + a human review" — your output feeds directly into [proposal-builder-form.tsx](../../../src/components/admin/proposal-builder-form.tsx), so match its field shape exactly (see Output Format below).

**This only applies to request-first services** — those with `instantCheckout: false` in [src/lib/services.ts](../../../src/lib/services.ts): SEO, CRO, Google Ads, Meta Ads, Social Media Management, GEO. Instant-checkout services (Video Creation, Graphic Design, Video Editing, Motion Graphics, AI Chatbot) skip the brand study entirely — don't run this skill for those.

## Before Starting

Read the incoming `ServiceRequest`:

1. **Which service** was requested (`serviceSlug`) — look it up in `src/lib/services.ts` for that service's baseline packages, `accessPlatforms`, and `applicability`, so you know what the *catalog default* scope/price looks like before you tailor it.
2. **The customer's note** (`message` field) — whatever context they volunteered.
3. **Consent flag** (`consentToShareAccess`) — whether they agreed to grant platform access. If true, use whatever access was actually granted; if false, work from public information only. Never treat this as a blocker.
4. **The business itself** — company name/site from their account, or ask if genuinely missing.

## 1. Research the Business

Scope and things to look for **differ by service** — don't run a generic checklist against every request. Use the section for the requested `serviceSlug`; each maps its findings directly onto that service's catalog scope units (pages, keywords, posts, etc. from `src/lib/services.ts`) so tailoring in step 2 is a straight read-off.

### SEO (`requiresWebsite: true`)

**Use the `seo-brand-study` skill/agent for this instead of the checklist below** — it runs the full archetype-aware audit via the specialist bench vendored from `claude-seo` and hands back a SWOT + prioritized fix checklist ready to tailor into packages here. The bullets below are the fallback only if that skill genuinely isn't available:

- **Indexation**: `site:domain.com` search — how many pages are indexed vs. how many actually exist (crawl the sitemap or main nav to count)
- **Current rankings**: what do they already rank for — brand name only, or real commercial terms too?
- **Technical health**: mobile load speed, broken links, missing/broken schema markup, duplicate titles
- **Keyword gap**: 5-10 commercial terms a buyer would search for this business — do they rank, and who does instead?
- **Competitor gap**: 2 competitors outranking them on the terms that matter
- Maps to scope units: pages to optimize, keywords targeted, technical fixes count

### CRO (`requiresWebsite: true`, needs an online checkout)

- **Funnel walk-through**: go through their actual buying path — landing → product → cart → checkout — as a customer would
- **Drop-off points**: friction in forms, unclear CTAs, missing trust signals (reviews, security badges), checkout steps that feel excessive
- **Mobile vs. desktop**: does the experience break or degrade on mobile specifically
- **Tracking**: is GA4/conversion tracking even installed — if not, that's a Premium-tier finding on its own
- If the business has no online checkout, flag this — CRO isn't the right service; note it for the admin rather than forcing a proposal
- Maps to scope units: pages in the funnel review, drop-off points ranked by impact

### Google Ads (works without a website — Business Profile also valid)

- **Existing account**: do they already run Google Ads — if so, audit structure (campaigns/ad groups), match types, negative keyword hygiene, conversion tracking setup
- **If no existing account**: what would the destination be (site, app, or Google Business Profile), and what's the realistic keyword set for their offer
- **Competitor presence**: who else is bidding on their category's obvious search terms
- Maps to scope units: campaigns/ad groups/ads to build or fix, keyword count, conversion tracking setup

### Meta Ads (works without a website — Page/app also valid)

- **Existing presence**: Meta Ad Library search (`facebook.com/ads/library`) — are they running ads now, what creative/offer
- **Pixel/CAPI**: is a Meta Pixel installed on their site (check page source or use a pixel-helper-style check) — Premium-tier finding if missing
- **Creative assets**: what photo/video assets do they already have vs. need to be produced (pairs with Video Creation/Graphic Design upsell)
- **Catalog**: if e-commerce, is there a product catalog connectable for dynamic ads
- Maps to scope units: campaign type (image/video), audience setup complexity, tracking depth

### Social Media Management (works without a website)

Run the platform-audit process from the `social-media-management` skill (§1 there) against current public profiles:

- Posting cadence over the last 30-90 days, content mix (posts/carousels/Reels/Stories)
- Engagement rate and how it benchmarks against the industry
- Profile completeness (bio, link-in-bio, highlights)
- 2-3 real competitors' posting frequency and content themes
- Maps to scope units: platform count, posts/Reels/Stories volume — see the skill's tier table for exact baseline numbers per package

### GEO — AI Search (`requiresWebsite: true`)

- **AI crawler accessibility**: check `robots.txt` and whether `llms.txt` exists
- **AI visibility check**: ask ChatGPT/a search-capable model a handful of realistic customer questions about this business's category — do they get recommended, and who does instead
- **Passage citability**: are pages structured so an AI could quote/cite a specific answer (clear headings, direct answers near the top) or is content buried in marketing copy
- **Competitor AI-visibility**: which competitors *do* get recommended for the same questions
- Maps to scope units: pages rewritten for AI, customer questions answered, competitor checks

### Always, regardless of service

Identify 1-3 concrete, specific findings — not generic industry statements. "Only 12 of 40 product pages are indexed" beats "your SEO could be improved."

## 2. Tailor 3 Packages from the Findings

Start from the service's catalog baseline (`STATIC_SERVICES` in `src/lib/services.ts`) — its Basic/Standard/Premium token costs, delivery days, and feature list are the default scope for a "typical" business. Then adjust for what you actually found:

- **More scope than the default fits** (e.g., 40 product pages instead of the Basic tier's assumed ~10) → raise the page/keyword/post counts and price proportionally, don't silently under-deliver at the catalog price.
- **Less scope needed** (e.g., a 5-page site) → it's fine to price at or below catalog default.
- Each tier's "why this fits them" framing should reference the actual finding, not restock generic catalog copy.
- Keep the **structure** (3 tiers, each inclusive of the previous, increasing scope/price/delivery) even when the numbers move.

Mark exactly one package `recommended` — normally Standard, unless the findings clearly point elsewhere (e.g., a business needing only the Basic-tier fix shouldn't be pushed to Standard).

## 3. Write the Brief

A short document (maps to the `brief` file field), plain language, not jargon:

- What was found (the concrete findings from step 1)
- Why it's costing them — translate technical findings into business impact ("28 products aren't findable in Google" not "72% deindexation rate")
- Sets up why the 3 options differ in scope

## Output Format

Produce exactly what `proposal-builder-form.tsx` needs, so it can be copy-pasted straight into the admin form:

```
BRIEF:
<the brief content — findings + business impact, plain language>

PACKAGE 1 (Basic):
name: Basic
tagline: <one line>
tokenCost: <number>
deliveryDays: <number>
features:
- <one per line>

PACKAGE 2 (Standard):
[same shape]

PACKAGE 3 (Premium):
[same shape]

RECOMMENDED: <1, 2, or 3>
```

## Common Mistakes to Avoid

- Sending back the catalog's generic default packages unchanged — the entire point is tailoring to what was actually found
- Vague findings ("your site could rank better") instead of specific, numbered ones
- Recommending a tier that doesn't match the findings just because it's the "default middle option"
- Running this skill for instant-checkout services — they don't go through a brand study
- Treating `consentToShareAccess: false` as a blocker — always produce a proposal from public information if access wasn't granted

## Related Skills

- **social-media-management** — for the platform-audit process feeding a Social Media Management study, and for fulfilling the order once a package is picked
- **seo-brand-study** — the deep, archetype-aware SEO study that supersedes this skill's SEO section; **seo-team** fulfills the order once a package is picked
- **cro**, **ads**, **ai-seo** — for the research depth behind CRO/Google Ads/Meta Ads/GEO studies
