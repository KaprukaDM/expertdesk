# cro-brand-study-reporter

**Definition:** `.claude/agents/cro-brand-study-reporter.md`
**Skill it loads:** `.claude/skills/cro-brand-study-reporter/SKILL.md`

Compiles `cro-brand-study`'s raw findings into two documents. Doesn't research anything itself.

## 1. Internal report — full, unredacted

Admin/specialist team only. Section order: Business-Model Classification → Funnel Walkthrough → Trust Signals → Mobile vs. Desktop → Tracking Status → SWOT → Fix Checklist. Can include draft fix content (a rough CTA rewrite, raw drop-off numbers) so whoever fulfills the paid package doesn't redo the thinking.

## 2. Client report — a short teaser

The customer-facing document, converted to PDF as the proposal's `brief`. A different, much shorter shape, not a trimmed copy of the internal report:

1. 1-2 line summary (store + business model)
2. **Conversion Opportunity Score** — 0-100, weighted: checkout friction 30%, trust signals 25%, mobile experience 20%, measurement readiness 15%, competitive position 10%
3. 3-5 headline findings, conversion-lens phrasing, no fix content
4. SWOT snapshot (4 bullets)
5. Drop-off count by category — never the itemized list
6. **Projected Improved Score** per tier (directional, not guaranteed)

Never contains rewritten CTA copy, a built A/B test, or a finished tracking setup — diagnosis only.

Tools: `Read, Grep, Glob, Write`
