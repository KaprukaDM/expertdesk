# social-media-brand-study

**Definition:** `.claude/agents/social-media-brand-study.md`
**Skill it loads:** `.claude/skills/social-media-brand-study/SKILL.md`

The research step, before any package is proposed. Given a brand, runs the full agency-grade onboarding audit:

Page Audit → Industry Audit → Competitor Analysis → Content Audit → Gap Audit → Page Performance (6mo) → Missing Functions Audit → What's Missing (synthesis) → SWOT → **Fix Checklist** (Page/Content/Ads, prioritized low-hanging-fruit-first, effort-tagged).

Uses real Insights if an access token + Page ID has been supplied by the operator; otherwise public data only. Output: a structured Markdown report meant to convert to PDF and feed the `brand-study` agent's proposal.

Tools: `Read, Grep, Glob, Write, WebSearch, WebFetch`
