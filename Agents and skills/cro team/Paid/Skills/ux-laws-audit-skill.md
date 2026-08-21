# ux-laws-audit (skill)

**Definition:** `.claude/skills/ux-laws-audit/SKILL.md`
**Loaded by:** `cro-ux-reviewer` agent (its UX Review deliverable is evaluated against this corpus — folded in rather than a separate deliverable, since a "UX review" and a "UX laws audit" are the same page-level lens)

Defines the full corpus and the audit process:

- **The corpus** (~45-50 named principles): Nielsen's 10 heuristics, Shneiderman's 8 Golden Rules, ~18 cognitive/perceptual Laws of UX, ~8 Gestalt principles, Cialdini's 7 persuasion principles, WCAG's 4 accessibility pillars
- **Process**: identify what the page is asking the visitor to do → walk it like a first-time visitor → for each finding, name the specific law, the actual observation, and why it matters for that page's goal → prioritize findings that block the page's goal over cosmetic nitpicks
- **Judgment rule**: not every law fits every page — a single-product landing page doesn't need Hick's Law scrutiny; a category/filter page does. Skip laws that don't genuinely apply rather than forcing them.
- **Page-Type Playbooks**: concrete, law-grounded best practices for Delivery/Shipping, Checkout, Account/Login, and Payment pages specifically — e.g. guest checkout offered (Jakob's/Tesler's Law), shipping cost shown before the final step (Visibility of System Status), password requirements shown upfront (Error Prevention). Used by both `cro-funnel-auditor` (every tier) and `cro-ux-reviewer` (Standard+) so findings on these pages cite a specific check, not a generic impression.
- No external tool dependency — unlike heatmap/session-recording analysis, this only needs the ability to view the page.

See [Agents/ux-laws-auditor.md](../Agents/ux-laws-auditor.md) for the agent that loads this skill.
