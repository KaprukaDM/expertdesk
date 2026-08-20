# The specialist bench (vendored from `claude-seo`)

Not authored for this project — these 18 agents + their skills are vendored (copied, not linked) from [AgricIDaniel/claude-seo](https://github.com/AgricIDaniel/claude-seo) (MIT license) into `.claude/agents/` and `.claude/skills/`, so the repo is self-contained and doesn't depend on the global plugin being installed elsewhere. `seo-brand-study` and `seo-orchestrator` dispatch these directly by name (no `claude-seo:` prefix needed once vendored locally).

| Specialist | Deliverable | Used by |
|---|---|---|
| `seo-technical` | Crawlability, indexability, URL structure, mobile/JS rendering | Research + all tiers |
| `seo-performance` | Core Web Vitals / load speed | Research + Premium |
| `seo-content` | On-page content quality, E-E-A-T, thin-content | Research + all tiers |
| `seo-cluster` | Keyword expansion + mapping, topical architecture | Research + all tiers |
| `seo-schema` | Structured data implementation | Research + Premium |
| `seo-sitemap` | Sitemap validation/generation | Research + Premium |
| `seo-backlinks` | Backlink profile analysis + gap/target list | Research + Standard/Premium |
| `seo-sxo` | SERP-backwards intent-match check | Research + Premium |
| `seo-local` | GBP signal audit + NAP consistency | Research (Local archetype) + Standard/Premium |
| `seo-maps` | Geo-grid rank position, competitor radius mapping | Research (Local archetype) |
| `seo-ecommerce` | Product schema, Shopping feed, category structure | Research (E-commerce archetype) + any tier if applicable |
| `seo-visual` | Mobile rendering screenshots | Premium (full audit report) |
| `seo-google` | Real GSC/GA4/CrUX data | Only if operator-supplied access exists |
| `seo-dataforseo` | Richer live SERP/keyword data | Only if a DataForSEO API key is configured |
| `seo-geo` | AI-search visibility | Not run by default — flagged as a separate GEO-service upsell |
| `seo-drift` | Baselines SEO-critical elements and flags regressions vs. a prior snapshot | Not run by default — only useful once a baseline exists from a prior delivery |
| `seo-flow` | FLOW-framework (Find→Leverage→Optimize→Win) stage prompts | Not run by default — optional structuring aid |
| `seo-image-gen` | OG/social preview + hero image generation plan | Not run by default — upsell into Graphic Design if flagged |

This is the full 18-agent bench vendored from claude-seo. Only the first 15 rows above are wired into `seo-team`'s tier dispatch (see below); the last 3 (`seo-drift`, `seo-flow`, `seo-image-gen`) are vendored and available to call directly, but nothing in the SEO package's feature list currently maps to them.

## Skill-only additions (no dedicated agent)

claude-seo also vendored 9 skills with no matching agent — usable directly via the Skill tool, not dispatched by the orchestrator: `seo` (the general/comprehensive audit skill), `seo-full-audit` (claude-seo's own full-audit skill, installed under this name to avoid clashing with the project's pre-existing `seo-audit`), `seo-competitor-pages`, `seo-content-brief`, `seo-hreflang`, `seo-images`, `seo-page`, `seo-plan`, `seo-programmatic`. None of these are wired into `seo-team` or `seo-brand-study` yet.

## Tier → specialist mapping (fulfillment)

- **Basic** (5 keywords, 3 pages, 5 technical fixes, on-page checklist) → `seo-technical`, `seo-content`, `seo-cluster`
- **Standard** (+ 15 keywords mapped, up to 10 pages, links, GBP setup, 3-month content plan) → Basic's set + `seo-backlinks`, `seo-local`
- **Premium** (+ up to 15 pages, full site audit report, best-practices guide, 6-month content plan) → Standard's set + `seo-performance`, `seo-schema`, `seo-sitemap`, `seo-sxo`, `seo-visual`

`seo-ecommerce` runs at any tier if the site has a cart/checkout; `seo-google` runs at any tier only if GSC/GA4 access was supplied.
