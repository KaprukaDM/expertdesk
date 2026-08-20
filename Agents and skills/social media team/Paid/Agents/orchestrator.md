# social-media-orchestrator

**Definition:** `.claude/agents/social-media-orchestrator.md`
**Skill it loads:** `.claude/skills/social-media-team/SKILL.md`

Runs once a customer has picked a Social Media Management package. Doesn't produce any deliverable itself:

1. Lists the full specialist roster.
2. Decides which specialists run — tier default (see the roster's tier-availability column), or an explicit customer/admin activity request, flagging anything outside what the tier paid for.
3. Dispatches the selected specialists via the Agent tool, in parallel where independent. Passes brand-voice output into content-calendar when both are in scope.
4. Assembles specialist outputs into one coherent delivered package with a short connecting intro.

Tools: `Agent, Read, Grep, Glob, Write`
