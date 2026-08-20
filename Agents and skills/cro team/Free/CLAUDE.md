This folder documents the **free, pre-purchase** CRO brand-study path only. If you're working here, you're looking at what runs before a customer has paid anything.

This folder mirrors that split one level further: [Agents/](Agents/) holds the agent docs, [Skills/](Skills/) holds the skill docs each agent loads.

Source of truth (this doc folder is a human-readable mirror, not what Claude Code actually loads):
- `.claude/agents/cro-brand-study.md` + `.claude/skills/cro-brand-study/SKILL.md`
- `.claude/agents/cro-brand-study-reporter.md` + `.claude/skills/cro-brand-study-reporter/SKILL.md`
- `.claude/agents/brand-study.md` + `.claude/skills/brand-study/SKILL.md` (cross-service, not CRO-specific)

Do not confuse this with `../Paid/` — that's the fulfillment path that runs after a package is picked and tokens are deducted. This path never creates an `Order`, never deducts tokens, and — critically — never produces literal fix content (no rewritten CTA copy, no built A/B test, no finished tracking setup); it diagnoses, it doesn't execute.

If asked to change what the free study covers, edit the source files above, not just this folder — then update this folder's README to stay in sync.
