# social-media-team (skill)

**Definition:** `.claude/skills/social-media-team/SKILL.md`
**Loaded by:** `social-media-orchestrator` agent

The orchestration rulebook for fulfillment, once a package is picked:

- **Roster table** — every specialist, its deliverable, and which tiers get it
- **Step 1 — List activities** before dispatching anything
- **Step 2 — Decide scope** — tier default (Basic → platform-auditor + content-calendar + reporting; Standard adds competitor-research + brand-voice; Premium adds ads-strategist) or an explicit customer request, flagging anything outside the paid tier
- **Step 3 — Dispatch** — independent specialists run in parallel; brand-voice output feeds into content-calendar when both are in scope
- **Step 4 — Assemble** — one coherent package with a connecting intro, in a fixed section order, never a raw concatenation

See [Agents/orchestrator.md](../Agents/orchestrator.md) for the agent that loads this skill.
