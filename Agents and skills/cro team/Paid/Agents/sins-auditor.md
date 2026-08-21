# cro-sins-auditor

**Definition:** `.claude/agents/cro-sins-auditor.md`
**Skill it loads:** `.claude/skills/cro-seven-sins/SKILL.md`

Produces the **7 Deadly Sins of CRO** scan — every tier, including Basic. A fast pass/fail/minor scorecard against the 7 most common conversion killers:

1. Too Much Text
2. Poor Layout / Visual Hierarchy
3. Bad Eye Flow
4. Weak or Buried CTA
5. Missing Social Proof / Trust Signals
6. Slow Load / Performance Friction — checked objectively via `scripts/check-page-speed.ts`, not guessed
7. Too Many Choices / Distractions

Deliberately simpler and cheaper than `cro-ux-reviewer`'s 55-law audit (Standard+), which is what makes a real UX-quality check affordable at Basic. It covers some of the same underlying failure modes as the laws corpus — that overlap is expected, since they're the same problems named at different depths — but it's scored independently as its own quick, client-readable checklist, not folded into the deeper review.

Tools: `Read, Grep, Glob, Write, WebFetch, Bash`
