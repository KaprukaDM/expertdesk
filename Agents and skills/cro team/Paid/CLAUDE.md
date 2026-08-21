This folder documents the **paid, post-purchase** CRO fulfillment path only. If you're working here, you're looking at what runs after a package is picked and tokens are deducted.

This folder mirrors that split one level further: [Agents/](Agents/) holds all 7 agent docs (orchestrator + 6 specialists), [Skills/](Skills/) holds the 4 skill docs they load.

Source of truth (this doc folder is a human-readable mirror, not what Claude Code actually loads):
- `.claude/agents/cro-orchestrator.md` + `.claude/skills/cro-team/SKILL.md`
- The 6 project-built specialist agents it dispatches by tier — see `Agents/`

Do not confuse this with `../Free/` — that's the research step that runs before purchase and never deducts tokens. This path always reads the picked tier's feature list straight from `src/lib/services.ts` before deciding which specialists to dispatch — Basic only gets the funnel audit, check the roster table before assuming a specialist runs.

If asked to change what a tier delivers, edit `src/lib/services.ts` and `.claude/skills/cro-team/SKILL.md` together — then update this folder's README to stay in sync.
