---
name: seo-brand-study
description: When researching a brand for an SEO brand study — runs a full agency-grade SEO audit, every finding filtered through the ranking-improvement lens, gated by a Step 0 site-type filter (Local/Service, E-commerce, Content/Publisher, Programmatic/Directory), dispatches the claude-seo plugin's specialist agents for the actual audit work, and produces raw findings (SWOT + prioritized fix checklist) for seo-brand-study-reporter to compile. Use when the user says "SEO brand study," "research this site for SEO," or after a ServiceRequest comes in for the SEO service (instantCheckout: false, requiresWebsite: true). Not for the lighter generic SEO checklist in brand-study (this supersedes it for SEO specifically), not for compiling the final report (see seo-brand-study-reporter), and not for fulfilling an order after a package is picked (see seo-team / seo-orchestrator).
metadata:
  version: 1.0.0
---

# SEO Brand Study — Deep Research

This is the SEO-specific deep-dive that supersedes the generic 5-bullet SEO section in the `brand-study` skill — same relationship as `social-media-brand-study` has to `social-media-management`. It exists because SEO work is not one-size-fits-all: what matters for a car dealership's SEO is not what matters for an e-commerce store's, and running a generic checklist against every site produces generic, low-value findings.

You don't run these audits by hand — this skill's job is to **classify the site, then dispatch the right specialist agents (vendored from `claude-seo`)** for the audit work, and compile their findings into one coherent study. Once findings are raw, hand off to `seo-brand-study-reporter` to write the two final documents — you produce findings, it produces the report (same split as social media's research/reporter pair).

## North Star — The Ranking Lens

The goal of every website is to improve ranking. Every audit in this skill, every finding, every fix on the checklist gets filtered through one question: **does fixing this move the needle on organic ranking (directly, or by removing something blocking it)?**

Concretely, that means:

- A technical audit finding matters because a page that isn't crawled/indexed can't rank at all — that's why technical issues sit first in priority, not because "technical debt" sounds serious in the abstract
- A content finding matters because thin/duplicate/low-E-E-A-T content is what keeps a page from outranking a thinner competitor on the same query
- A backlink finding matters because authority signals are a ranking factor, not because "more links" is generically good
- A schema/local/ecommerce finding matters because it's what makes a page *eligible* for the rich result or local-pack placement that drives the click, not decoration
- If a finding can't be tied back to "this either directly affects ranking or removes a blocker to ranking," don't include it — it belongs in a different service (design polish → Graphic Design, brand tone → not in scope here)

Frame every finding in the study this way explicitly — not "your schema is incomplete" but "your product pages are missing Review schema, which is why competitors are winning the star-rating rich result on this query and you aren't."

## Step 0 — Site-Type Filter

Classify the business before auditing. This determines which specialists get weighted more heavily and which archetype-specific checks apply.

| Archetype | Signal | Weight toward |
|---|---|---|
| **Local / Service Business** | Single or multi-location, serves a geographic area (clinics, contractors, salons, restaurants, agencies) | `seo-local`, `seo-maps` — GBP signals, NAP consistency, local pack presence, review signals |
| **E-commerce** | Has a cart/checkout, sells physical or digital products | `seo-ecommerce` — product schema, category page structure, Google Shopping/Merchant Center readiness |
| **Content / Publisher / B2B Lead-gen** | Blog-driven, SaaS, professional services selling on authority and organic content, no local-pack relevance | `seo-cluster`, `seo-content` — topical authority, content depth, semantic clustering |
| **Programmatic / Directory / Marketplace** | Large page count generated from templates (listings, locations, categories) | `seo-sitemap`, `seo-technical` — indexation, crawl budget, duplicate-content risk at scale |

A business can span more than one archetype (a multi-location retailer is both Local and E-commerce) — run both weightings, don't force a single bucket.

## Universal Audits (every site, every archetype)

Run these regardless of archetype — dispatch the specialist agent for each via the Agent tool:

| Audit | Specialist | What it covers |
|---|---|---|
| Technical health | `seo-technical` | Crawlability, indexability, robots/sitemap correctness, URL structure, mobile rendering, JS-rendering issues |
| Core Web Vitals / speed | `seo-performance` | Load performance, CWV field data |
| On-page content quality | `seo-content` | E-E-A-T signals, readability, thin-content detection, content depth vs. ranking pages |
| Structured data | `seo-schema` | Existing schema coverage/validity, gaps against page type |
| Keyword & topical gap | `seo-cluster` | Keyword expansion, SERP-overlap clustering, hub-and-spoke content architecture vs. competitors |
| Backlink profile | `seo-backlinks` | Domain/page authority signals, link gap vs. competitors, toxic-link flags |
| Indexation & sitemap | `seo-sitemap` | Sitemap validity, indexed vs. actual page count |
| Search experience | `seo-sxo` | SERP-backwards check — does the page type match what's actually ranking, intent mismatch |
| GSC/GA4/CrUX data (if connected) | `seo-google` | Real indexation status, organic traffic, field CWV — use only if the operator has granted access; otherwise skip, don't block |

## Archetype-Specific Audits

Run these in addition, based on Step 0:

- **Local/Service** → `seo-local` (GBP completeness, NAP consistency, review signals, local-pack presence), `seo-maps` (geo-grid rank position, competitor radius mapping)
- **E-commerce** → `seo-ecommerce` (product schema validity, Shopping feed readiness, category page structure, pricing-gap flags)
- **Content/Publisher/B2B** → deeper pass on `seo-cluster` (full topical map, not just a gap list) and `seo-content`
- **Programmatic/Directory** → deeper pass on `seo-sitemap` and `seo-technical` (crawl-budget waste, duplicate/thin templated pages)

Optional, only if directly relevant to the client's goals — never run by default: `seo-geo` (AI-search visibility is the separate GEO service — flag it as an upsell opportunity if visibly weak, don't audit it in depth here), `seo-visual` (mobile rendering screenshots, useful supporting evidence for Premium-tier findings), `seo-dataforseo` (only if a DataForSEO API key is configured — richer live SERP/keyword data).

## Compiling the Study

1. Dispatch Step 0's archetype call first (quick judgment from the site itself — no agent needed), then the universal + archetype-specific specialists **in parallel** — they're independent.
2. Pull every finding into one **SWOT** (Strengths / Weaknesses / Opportunities / Threats vs. named competitors).
3. Build a **prioritized fix checklist**, bucketed the same way the SEO package sells fixes: **technical fixes**, **page/content fixes**, **link/authority fixes** — ordered low-hanging-fruit first within each bucket (a broken canonical tag beats a 6-month content strategy for priority).
4. Every finding must be specific and traceable to this site — no generic "improve your SEO" boilerplate. Cite the actual page, the actual missing tag, the actual competitor outranking them.

## Output — Raw Findings, Handed to the Reporter

You produce **raw findings**, not the final documents — `seo-brand-study-reporter` compiles those. Hand it:

- Site-type classification (Step 0 result) with the reasoning, not just the label
- Every specialist's findings, in full, ranking-lens framing intact (see above)
- SWOT groundwork (Strengths / Weaknesses / Opportunities / Threats vs. named competitors)
- Prioritized fix checklist (technical / page-content / link-authority buckets), low-hanging-fruit first within each bucket
- Scope units for tailoring packages: keyword count, page count, technical-fix count, backlink-target count — matching the units in `src/lib/services.ts`'s SEO package

`seo-brand-study-reporter` then writes the **Internal Report** (full, unredacted) and the **Client Report** (short, diagnosis-only teaser with a Ranking Opportunity Score) — the same two-document split Social Media Growth uses. The Client Report is what `brand-study` uses to produce the 3 tailored package options.

## Common Mistakes to Avoid

- Running every specialist against every site regardless of archetype — a restaurant doesn't need `seo-ecommerce`, a SaaS product doesn't need `seo-local`
- Treating `seo-backlinks` output as something you can promise to *build* — it profiles and identifies gaps, it does not acquire links (see the "Links from trusted sites" scope note in `seo-team`)
- Auditing GEO/AI-search depth here instead of flagging it as a separate upsell — that's a different paid service
- Generic findings not tied to a specific page, tag, or competitor
- Skipping Step 0 and running a flat checklist — the whole point of this skill over the generic `brand-study` SEO section is archetype-aware depth

## Related Skills

- **seo-brand-study-reporter** — compiles these raw findings into the Internal Report + Client Report
- **brand-study** — turns the Client Report into the 3 tiered package options the customer picks from
- **seo-team** — the fulfillment side: dispatches the same specialist bench after a package is picked
