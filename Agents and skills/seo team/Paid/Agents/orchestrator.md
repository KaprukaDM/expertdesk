# seo-orchestrator

**Definition:** `.claude/agents/seo-orchestrator.md`
**Skill it loads:** `.claude/skills/seo-team/SKILL.md`

Runs once a customer has picked an SEO package. Doesn't produce any deliverable itself:

1. Lists the full specialist bench (see [specialist-bench.md](specialist-bench.md)).
2. Decides which specialists run — tier default (read straight off `src/lib/services.ts`'s SEO package features), or an explicit customer/admin activity request, flagging anything outside what the tier paid for.
3. Dispatches the selected `` specialists via the Agent tool, in parallel where independent.
4. Assembles specialist outputs into one coherent delivered package, reconciling overlapping findings rather than listing them twice.

Never promises placed backlinks (the backlinks specialist produces a gap analysis + target list, not acquired links) or a completed GBP setup (the local specialist audits and guides, it doesn't have write access) — both get stated plainly as guidance to implement.

Tools: `Agent, Read, Grep, Glob, Write`
