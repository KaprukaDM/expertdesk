# seo-brand-study (skill)

**Definition:** `.claude/skills/seo-brand-study/SKILL.md`
**Loaded by:** `seo-brand-study` agent

Defines the archetype-aware SEO audit run on every incoming SEO brand-study request:

- **North star — the ranking lens**: every finding must answer "does fixing this move ranking, or remove a blocker to it" — no generic best-practice commentary
- **Step 0 — Site-Type Filter**: Local/Service, E-commerce, Content/Publisher, Programmatic/Directory — determines which specialists get weighted more heavily
- **Universal audits** (every site): technical health, Core Web Vitals, on-page content quality, structured data, keyword/topical gap, backlink profile, sitemap/indexation, search experience (SXO), GSC/GA4 if access supplied
- **Archetype-specific audits**: local/maps for Local/Service, e-commerce schema/feed for E-commerce, deeper content clustering for Content/Publisher, deeper sitemap/crawl-budget for Programmatic
- Dispatches the vendored specialist agents rather than running audits by hand — see [Agents/specialist-bench.md](../Agents/specialist-bench.md)
- Hands off raw findings to `seo-brand-study-reporter` rather than writing the final documents itself

See [Agents/brand-study-research.md](../Agents/brand-study-research.md) for the agent that loads this skill.
