# seo-team (skill)

**Definition:** `.claude/skills/seo-team/SKILL.md`
**Loaded by:** `seo-orchestrator` agent

The orchestration rulebook for fulfillment, once an SEO package is picked:

- **Roster table** — every `seo-*` specialist, its deliverable, and which package feature it feeds (see [Agents/specialist-bench.md](../Agents/specialist-bench.md))
- **Step 1 — List activities** before dispatching anything
- **Step 2 — Decide scope** — tier default read straight off `src/lib/services.ts`'s SEO package features (Basic → technical + content + cluster; Standard adds backlinks + local; Premium adds performance + schema + sitemap + SXO + visual), or an explicit customer request, flagging anything outside the paid tier
- **Step 3 — Dispatch** — independent specialists run in parallel via the Agent tool, using each specialist's plain agent name (`seo-technical`, `seo-backlinks`, etc. — no plugin prefix, they're vendored locally)
- **Step 4 — Assemble** — one coherent package, reconciling overlapping findings (e.g. both technical and schema flagging the same page) rather than listing them twice
- **Scope note**: "links from trusted sites" and "GBP setup" are delivered as target-list/guidance, never as placed links or a completed listing

See [Agents/orchestrator.md](../Agents/orchestrator.md) for the agent that loads this skill.
