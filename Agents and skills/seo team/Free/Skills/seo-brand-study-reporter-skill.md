# seo-brand-study-reporter (skill)

**Definition:** `.claude/skills/seo-brand-study-reporter/SKILL.md`
**Loaded by:** `seo-brand-study-reporter` agent

Defines how raw findings from `seo-brand-study` get compiled into the two final documents:

- **Internal report** — full detail, unredacted, section order: Site-Type Classification → Technical → Performance/CWV → On-Page & Content → Structured Data → Keyword & Topical Gap → Backlink Profile → Sitemap/Indexation → SXO → Archetype-Specific → SWOT → Fix Checklist
- **Client report** — a short teaser (summary, Ranking Opportunity Score, 3-5 headline findings, SWOT snapshot, fix count by category, Projected Improved Score per tier), never a trimmed copy of the internal report
- **Ranking Opportunity Score methodology**: weighted 0-100 — technical/indexability 25%, on-page/content 25%, keyword/competitive position 20%, backlink authority 15%, archetype-specific completeness 15%
- **Compile order rule**: always write the internal report first, then trim down into the client report — never the reverse
- **Scope honesty**: never presents the backlink target list as delivered links, or GBP guidance as a completed setup, in either document

See [Agents/reporter.md](../Agents/reporter.md) for the agent that loads this skill.
