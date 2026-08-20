---
name: seo-team
description: When deploying the SEO delivery team after a customer has picked a package (Basic/Standard/Premium) or requested specific activities. Defines the orchestrator's specialist roster (vendored from the claude-seo plugin into this project's .claude/agents), how to map a picked tier to which specialists run, and how to dispatch and assemble their output. Use when the user says "deploy the SEO team," "run the agents for this SEO order," "what can the SEO agents do," or after seo-brand-study + brand-study have produced a picked package. For the research step before a package is picked, see seo-brand-study and brand-study. For deliverable scope per tier, see src/lib/services.ts's SEO package.
metadata:
  version: 1.0.0
---

# SEO Team — Orchestration

Same pattern as the Social Media Growth team: one orchestrator, specialist sub-agents, each owning a narrow deliverable. Unlike Social Media Growth, the specialists here weren't written for this project — they're vendored from the [AgricIDaniel/claude-seo](https://github.com/AgricIDaniel/claude-seo) plugin (MIT) into `.claude/agents/` and `.claude/skills/` directly, so they ship with the repo instead of depending on a global plugin install. The orchestrator's job is still to decide what this order needs, dispatch the right specialists, and assemble one delivered package.

## The Roster

| Specialist | Deliverable | Feeds package feature |
|---|---|---|
| `seo-technical` | Crawlability, indexability, URL structure, mobile/JS rendering fixes | Technical fixes |
| `seo-performance` | Core Web Vitals / load speed findings | Technical fixes (Premium: full audit report) |
| `seo-content` | On-page content quality, E-E-A-T, thin-content fixes | Pages optimized, on-page checklist |
| `seo-cluster` | Keyword expansion + mapping to pages, topical architecture | Target keywords, keyword-to-page mapping |
| `seo-schema` | Structured data implementation | Technical fixes (Premium: full audit report) |
| `seo-sitemap` | Sitemap validation/generation | Technical fixes |
| `seo-backlinks` | Backlink profile analysis + gap/target list vs. competitors | "Links from trusted sites" — **analysis + target list only, see scope note below** |
| `seo-local` | GBP signal audit + setup guidance | Google Business Profile setup |
| `seo-sxo` | SERP-backwards intent-match check | Full site audit report (Premium) |
| `seo-visual` | Mobile rendering screenshots, above-the-fold checks | Full site audit report (Premium) |
| `seo-ecommerce` | Product schema, Shopping feed, category structure | Only dispatched if the site is e-commerce |
| `seo-google` | Real GSC/GA4/CrUX data | Only if the operator supplied access |

**Scope note on backlinks**: `seo-backlinks` is an *analyst*, not a link-building/outreach tool — it identifies gaps and produces a prioritized target list, it does not acquire or place links. The package feature "links from trusted sites" is fulfilled as a *target list + outreach guidance*, not delivered links. Say this plainly in the delivered package rather than let the customer assume links were actually placed.

## Step 1 — List Activities

List the roster above so activities can be picked explicitly if the order wants something other than the tier default.

## Step 2 — Decide Which Specialists Run

**A. Tier default** — read the SEO package's feature list in `src/lib/services.ts` and map:

- **Basic** (5 keywords, 3 pages, 5 technical fixes, on-page checklist) → `seo-technical`, `seo-content`, `seo-cluster`
- **Standard** (+ 15 keywords mapped, up to 10 pages, 5-15 technical fixes, links from trusted sites, GBP setup, 3-month content plan) → Basic's set + `seo-backlinks`, `seo-local`, deeper `seo-cluster` pass for the content plan
- **Premium** (+ up to 15 pages, full site audit report, best-practices guide, 6-month content plan, dedicated specialist) → Standard's set + `seo-performance`, `seo-schema`, `seo-sitemap`, `seo-sxo`, `seo-visual` (the "full site audit report" is these five compiled together)

Dispatch `seo-ecommerce` in addition, at any tier, if the site has a cart/checkout. Dispatch `seo-google` in addition, at any tier, only if GSC/GA4 access was supplied.

**B. Explicit request** — honor a named subset over the tier default, but flag (don't silently deliver or refuse) anything outside what the tier paid for.

## Step 3 — Dispatch

Call each selected specialist via the Agent tool (`seo-technical` etc. as `subagent_type`). Independent specialists run in parallel. Give every specialist the shared context: site URL, target market/locations, the archetype classification from the brand study if one exists, and GSC/GA4 access if supplied — never let a specialist request or generate access itself.

## Step 4 — Assemble

Combine specialist outputs into one coherent package, in this order: technical audit → on-page/content → keyword mapping/content plan → backlink target list → GBP setup (if run) → full audit sections (Premium: performance, schema, sitemap, SXO, visual). Don't concatenate raw specialist output — write a short connecting intro and reconcile any overlapping findings (e.g. both `seo-technical` and `seo-schema` may flag the same page) into one entry rather than listing it twice.

## Common Mistakes to Avoid

- Promising placed backlinks instead of a target list + outreach guidance — see the scope note above
- Running `seo-ecommerce` or `seo-local` on every order regardless of site type — check the archetype first
- Running `seo-google` without operator-supplied access
- Treating the "full site audit report" as one more specialist to dispatch — it's the Premium-tier specialists' output compiled, not a separate deliverable
- Serializing independent specialists that could run in parallel

## Related Skills

- **seo-brand-study** — the research that precedes package selection, using the same specialist bench
- **seo-brand-study-reporter** — compiles that research into the Internal Report + Client Report
- **brand-study** — turns the Client Report into the 3 tiered package options the customer picks from
