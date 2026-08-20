# seo-brand-study

**Definition:** `.claude/agents/seo-brand-study.md`
**Skill it loads:** `.claude/skills/seo-brand-study/SKILL.md`

Runs when a customer requests the SEO service, before any package is picked — the free research step.

**North star:** the goal of every website is to improve ranking. Every audit finding is filtered through one question: does fixing this move the needle on organic ranking, directly or by removing a blocker? A finding that can't answer yes doesn't belong in this study.

## Step 0 — Site-Type Filter

Classifies the business into an archetype before auditing, so the study weights the right specialists instead of running a flat checklist:

| Archetype | Signal | Weighted specialists |
|---|---|---|
| Local / Service Business | Single/multi-location, serves a geographic area | `seo-local`, `seo-maps` |
| E-commerce | Has a cart/checkout | `seo-ecommerce` |
| Content / Publisher / B2B | Blog/SaaS, sells on authority | `seo-cluster`, `seo-content` |
| Programmatic / Directory | Large templated page count | `seo-sitemap`, `seo-technical` |

A site can span more than one archetype — run both weightings rather than forcing a single bucket.

## Universal audits (every site)

Dispatched via the Agent tool, in parallel: `seo-technical`, `seo-performance`, `seo-content`, `seo-schema`, `seo-cluster`, `seo-backlinks`, `seo-sitemap`, `seo-sxo`, and `seo-google` if GSC/GA4 access was supplied.

## Output

Doesn't write the final report itself — hands raw findings (site-type classification, every specialist's findings, SWOT groundwork, prioritized fix checklist) to `seo-brand-study-reporter`.

Tools: `Read, Grep, Glob, Write, WebSearch, WebFetch, Agent`
