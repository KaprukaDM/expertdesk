# cro-team (skill)

**Definition:** `.claude/skills/cro-team/SKILL.md`
**Loaded by:** `cro-orchestrator` agent

The orchestration rulebook for fulfillment, once a CRO package is picked:

- **Roster table** — every specialist, its deliverable, and which tiers get it
- **Step 1 — List activities** before dispatching anything
- **Step 2 — Decide scope** — tier default (Basic → `cro-funnel-auditor` only; Standard adds `cro-ux-reviewer`; Premium adds `cro-tracking-auditor`, `cro-ab-test-strategist`, `cro-competitor-benchmark`) or an explicit customer request, flagging anything outside the paid tier
- **Step 3 — Dispatch** — `cro-funnel-auditor` runs first among dependent specialists; `cro-tracking-auditor`/`cro-competitor-benchmark` are independent
- **Step 4 — Assemble** — one coherent package with a connecting intro, in a fixed section order

See [Agents/orchestrator.md](../Agents/orchestrator.md) for the agent that loads this skill.
