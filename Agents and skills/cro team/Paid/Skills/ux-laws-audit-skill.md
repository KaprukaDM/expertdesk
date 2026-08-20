# ux-laws-audit (skill)

**Definition:** `.claude/skills/ux-laws-audit/SKILL.md`
**Loaded by:** `cro-ux-laws-auditor` agent

Defines the full corpus and the audit process:

- **The corpus** (~45-50 named principles): Nielsen's 10 heuristics, Shneiderman's 8 Golden Rules, ~18 cognitive/perceptual Laws of UX, ~8 Gestalt principles, Cialdini's 7 persuasion principles, WCAG's 4 accessibility pillars
- **Process**: identify what the page is asking the visitor to do → walk it like a first-time visitor → for each finding, name the specific law, the actual observation, and why it matters for that page's goal → prioritize findings that block the page's goal over cosmetic nitpicks
- **Judgment rule**: not every law fits every page — a single-product landing page doesn't need Hick's Law scrutiny; a category/filter page does. Skip laws that don't genuinely apply rather than forcing them.
- No external tool dependency — unlike heatmap/session-recording analysis, this only needs the ability to view the page.

See [Agents/ux-laws-auditor.md](../Agents/ux-laws-auditor.md) for the agent that loads this skill.
