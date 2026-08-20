# cro-orchestrator

**Definition:** `.claude/agents/cro-orchestrator.md`
**Skill it loads:** `.claude/skills/cro-team/SKILL.md`

Runs once a customer has picked a CRO package. Doesn't produce any deliverable itself:

1. Lists the full specialist roster.
2. Decides which specialists run — tier default (Basic → funnel audit only; Standard adds UX review; Premium adds tracking audit, A/B roadmap, competitor benchmark), or an explicit customer/admin activity request, flagging anything outside what the tier paid for.
3. Dispatches the selected specialists via the Agent tool — `cro-funnel-auditor` first (dependent specialists reference its findings), `cro-tracking-auditor`/`cro-competitor-benchmark` in parallel with the rest.
4. Assembles specialist outputs into one coherent delivered package with a short connecting intro.

Tools: `Agent, Read, Grep, Glob, Write`
