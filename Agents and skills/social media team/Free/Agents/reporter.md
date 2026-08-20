# social-media-brand-study-reporter

**Definition:** `.claude/agents/social-media-brand-study-reporter.md`
**Skill it loads:** `.claude/skills/social-media-brand-study-reporter/SKILL.md`

Compiles `social-media-brand-study`'s raw findings (the 9 audits + Step 0 industry classification + SWOT groundwork) into two documents. Doesn't research anything itself.

## 1. Internal report — full, unredacted

Admin/specialist team only. Section order: Industry Filter classification → Page Audit → Industry Audit → Competitor Analysis → Content Audit → Gap Audit → Page Performance (6mo) → Missing Functions → What's Missing (synthesis) → SWOT → Fix Checklist. Can include draft fix content (a rough bio rewrite, a first-pass CTA) so whoever fulfills the paid package doesn't redo the thinking.

## 2. Client report — a short teaser

The customer-facing document, converted to PDF as the proposal's `brief`. A different, much shorter shape, not a trimmed copy of the internal report:

1. 1-2 line summary (business + industry archetype, named casually)
2. **Opportunity Score** — 0-100, weighted: profile/setup 20%, content quality/consistency 25%, competitive position 20%, engagement/performance 20%, platform feature completeness 15%
3. 3-5 headline findings, no fix content attached
4. SWOT snapshot (4 bullets)
5. Fix count by category — never the itemized checklist
6. **Projected Improved Score** per tier (directional, not guaranteed)

Never contains a rewritten bio, ready captions, or a built calendar — diagnosis only.

Tools: `Read, Grep, Glob, Write`
