# cro-seven-sins (skill)

**Definition:** `.claude/skills/cro-seven-sins/SKILL.md`
**Loaded by:** `cro-sins-auditor` agent

Defines the 7 sins and the scoring process:

- **The 7 sins**: Too Much Text, Poor Layout/Visual Hierarchy, Bad Eye Flow, Weak/Buried CTA, Missing Social Proof, Slow Load, Too Many Choices/Distractions
- **Scoring**: Pass / Minor / Fail per sin per page, always with one concrete observation attached — never a bare verdict, and never a forced "Fail" on a sin that doesn't apply to the page's actual goal
- **Slow Load is checked objectively**, not guessed — via `scripts/check-page-speed.ts` (plain fetch-timing check)
- **Output**: a short 7-row scorecard per page — deliberately quicker to read than the 55-law audit, since that's what makes real UX scrutiny affordable at Basic tier

See [Agents/sins-auditor.md](../Agents/sins-auditor.md) for the agent that loads this skill.
