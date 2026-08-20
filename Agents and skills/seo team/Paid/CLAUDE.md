This folder documents the **paid, post-purchase** SEO fulfillment path only. If you're working here, you're looking at what runs after a package is picked and tokens are deducted.

This folder mirrors that split one level further: [Agents/](Agents/) holds the agent doc, [Skills/](Skills/) holds the skill doc it loads.

Source of truth (this doc folder is a human-readable mirror, not what Claude Code actually loads):
- `.claude/agents/seo-orchestrator.md` + `.claude/skills/seo-team/SKILL.md`
- The 15-of-18 vendored specialist agents it dispatches by tier — see `../specialist-bench.md`

Do not confuse this with `../Free/` — that's the research step that runs before purchase and never deducts tokens. This path always reads the picked tier's feature list straight from `src/lib/services.ts` before deciding which specialists to dispatch — never assume "the customer bought SEO" means every specialist runs; it means the tier-mapped subset does.

If asked to change what a tier delivers, edit `src/lib/services.ts` and `.claude/skills/seo-team/SKILL.md` together — then update this folder's README to stay in sync.
