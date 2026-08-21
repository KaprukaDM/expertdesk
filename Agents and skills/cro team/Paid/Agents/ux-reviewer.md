# cro-ux-reviewer

**Definition:** `.claude/agents/cro-ux-reviewer.md`
**Skills it loads:** `.claude/skills/cro-fulfillment/SKILL.md` (§2), `.claude/skills/ux-laws-audit/SKILL.md` (incl. its Page-Type Playbooks for Delivery/Shipping, Checkout, Account/Login, and Payment pages)

Produces the **UX Review** deliverable — Standard and Premium tier only. Reviews like a curious QA tester, not a source-code reader: `scripts/capture-ux-screenshots.ts` (Playwright/Chromium, already installed in this project) captures a real desktop (1920×1080) and mobile (375×812) full-page screenshot of each key page, plus an objective horizontal-scroll check, so findings come from what a visitor actually sees rather than inferred from HTML/CSS. A mobile + desktop review weighted toward mobile since that's most traffic for most stores, with each key page evaluated against a curated corpus of ~50 established, citable UI/UX laws and principles, across 6 categories:

- Nielsen's 10 Usability Heuristics
- Shneiderman's 8 Golden Rules
- Cognitive/perceptual Laws of UX (Fitts's Law, Hick's Law, Jakob's Law, Miller's Law, Peak-End Rule, and ~13 more)
- Gestalt principles (Proximity, Similarity, Common Region, Prägnanz, Closure, etc.)
- Cialdini's persuasion principles (Reciprocity, Social Proof, Scarcity, etc.)
- WCAG accessibility basics (Perceivable, Operable, Understandable, Robust)

**Not every law is applied to every page** — the agent uses judgment to pick the laws relevant to what each page is actually asking the visitor to do (a single-product landing page doesn't need Hick's Law scrutiny; a category/filter page does), rather than mechanically running the full list against everything. Every finding names the specific law, the actual observation, and why it matters for that page's goal.

(Standard) the 1 verification re-scan confirming the Funnel Audit's flagged drop-off points actually improved after fixes shipped — a before/after comparison, not a fresh audit, including a **lift analysis**: a real % change if GA4 access + before/after data exists, otherwise a clearly-labeled estimate — never presented as measured when it's a guess.

Heatmap + session-recording analysis is a **bonus, not guaranteed** — checked against `cro-funnel-auditor`'s tool stack check (which scans the page source for Clarity/Hotjar signatures) rather than just taking the client's word for it; real data only if a tool is actually detected or access was explicitly supplied, flagged as a gap with a recommendation (Microsoft Clarity — free, no traffic cap) if not, never fabricated. This used to be the headline Standard-tier deliverable, but it silently degrades to "install a tool" for any client without one connected. The laws-based review is what makes this deliverable reliable without any external dependency — it only needs page access.

Tools: `Read, Grep, Glob, Write, WebFetch, Bash`
