# cro-ux-laws-auditor

**Definition:** `.claude/agents/cro-ux-laws-auditor.md`
**Skill it loads:** `.claude/skills/ux-laws-audit/SKILL.md`

Produces the **UX Laws Audit** deliverable — Standard tier and above. Cross-checks the key funnel pages against a curated corpus of ~50 established, citable UI/UX laws and principles, across 6 categories:

- Nielsen's 10 Usability Heuristics
- Shneiderman's 8 Golden Rules
- Cognitive/perceptual Laws of UX (Fitts's Law, Hick's Law, Jakob's Law, Miller's Law, Peak-End Rule, and ~13 more)
- Gestalt principles (Proximity, Similarity, Common Region, Prägnanz, Closure, etc.)
- Cialdini's persuasion principles (Reciprocity, Social Proof, Scarcity, etc.)
- WCAG accessibility basics (Perceivable, Operable, Understandable, Robust)

**Not every law is applied to every page** — the agent uses judgment to pick the laws relevant to what each page is actually asking the visitor to do, rather than mechanically running the full list against everything.

**Why this exists**: it replaced heatmap/session-recording analysis as the core Standard-tier UX deliverable, because heatmap analysis silently degrades to "install a tool" for any client without Hotjar/Clarity already connected. This audit has no external dependency — it only needs page access.

Tools: `Read, Grep, Glob, Write, WebFetch`
