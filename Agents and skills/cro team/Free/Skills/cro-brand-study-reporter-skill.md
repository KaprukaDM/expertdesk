# cro-brand-study-reporter (skill)

**Definition:** `.claude/skills/cro-brand-study-reporter/SKILL.md`
**Loaded by:** `cro-brand-study-reporter` agent

Defines how raw findings from `cro-brand-study` get compiled into the two final documents:

- **Internal report** — full detail, unredacted, section order: Business-Model Classification → Funnel Walkthrough → Trust Signals → Mobile vs. Desktop → Tracking Status → SWOT → Fix Checklist
- **Client report** — a short teaser (summary, Conversion Opportunity Score, 3-5 headline findings, SWOT snapshot, drop-off count by category, Projected Improved Score per tier), never a trimmed copy of the internal report
- **Conversion Opportunity Score methodology**: weighted 0-100 — checkout friction 30%, trust signals 25%, mobile experience 20%, measurement readiness 15%, competitive position 10%
- **Compile order rule**: always write the internal report first, then trim down into the client report — never the reverse

See [Agents/reporter.md](../Agents/reporter.md) for the agent that loads this skill.
