# social-media-brand-study-reporter (skill)

**Definition:** `.claude/skills/social-media-brand-study-reporter/SKILL.md`
**Loaded by:** `social-media-brand-study-reporter` agent

Defines how raw findings from `social-media-brand-study` get compiled into the two final documents:

- **Internal report** — full detail, unredacted, all 9 audits in section order, can include draft fix content for continuity into fulfillment
- **Client report** — a short teaser (summary, Opportunity Score, 3-5 headline findings, SWOT snapshot, fix count by category, Projected Improved Score per tier), never a trimmed copy of the internal report
- **Opportunity Score methodology**: weighted 0-100 score — profile/setup 20%, content quality/consistency 25%, competitive position 20%, engagement/performance 20%, platform feature completeness 15%
- **Compile order rule**: always write the internal report first, then trim down into the client report — never the reverse, since that risks execution content leaking into what the client sees

See [Agents/reporter.md](../Agents/reporter.md) for the agent that loads this skill.
