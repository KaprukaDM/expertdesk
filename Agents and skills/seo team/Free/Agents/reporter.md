# seo-brand-study-reporter

**Definition:** `.claude/agents/seo-brand-study-reporter.md`
**Skill it loads:** `.claude/skills/seo-brand-study-reporter/SKILL.md`

Compiles `seo-brand-study`'s raw findings into two documents. Doesn't research anything itself.

## 1. Internal report — full, unredacted

Admin/specialist team only. Section order: Site-Type Classification → Technical → Performance/CWV → On-Page & Content → Structured Data → Keyword & Topical Gap → Backlink Profile → Sitemap/Indexation → SXO → Archetype-Specific → SWOT → Fix Checklist. Can include draft fix content (a first-pass title-tag rewrite, a rough schema snippet) so whoever fulfills the paid package doesn't redo the thinking.

## 2. Client report — a short teaser

The customer-facing document, converted to PDF as the proposal's `brief`. A different, much shorter shape, not a trimmed copy of the internal report:

1. 1-2 line summary (business + site type)
2. **Ranking Opportunity Score** — 0-100, weighted: technical/indexability 25%, on-page/content 25%, keyword/competitive position 20%, backlink authority 15%, archetype-specific completeness 15%
3. 3-5 headline findings, ranking-lens phrasing, no fix content
4. SWOT snapshot (4 bullets)
5. Fix count by category — never the itemized checklist
6. **Projected Improved Score** per tier (directional, not guaranteed)

Never contains rewritten title tags/meta, built schema, or a delivered backlink list — diagnosis only.

Tools: `Read, Grep, Glob, Write`
