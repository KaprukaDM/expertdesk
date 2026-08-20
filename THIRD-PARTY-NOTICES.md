# Third-Party Notices

This project vendors (copies directly into `.claude/agents/` and `.claude/skills/`) Claude Code skills and agents from two open-source repositories, both MIT-licensed. Full license text for each is preserved below and, where the upstream repo shipped it per-skill, alongside the copied files themselves.

## claude-seo

- **Source:** [AgricIDaniel/claude-seo](https://github.com/AgricIDaniel/claude-seo)
- **Vendored into:** `.claude/agents/seo-*.md` (18 specialist agents) and `.claude/skills/seo*` (24 skills, one renamed `seo-full-audit` to avoid a name clash with this project's pre-existing `seo-audit` skill)
- **Used by:** the `seo-brand-study` and `seo-orchestrator` agents (see `Agents and skills/seo team/`)
- **License:** MIT, Copyright (c) 2026 agricidaniel

## marketingskills

- **Source:** [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)
- **Vendored into:** `.claude/skills/` (49 skills — ads, ai-seo, content-strategy, copywriting, cro, offers, pricing, social, and more)
- **License:** MIT, Copyright (c) 2025 Corey Haines

---

Both licenses grant free use, copy, modification, and distribution, provided the copyright notice and permission notice are retained — satisfied by this file. Neither project is affiliated with or endorses this project.
