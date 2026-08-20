# social-media-brand-study (skill)

**Definition:** `.claude/skills/social-media-brand-study/SKILL.md`
**Loaded by:** `social-media-brand-study` agent

Defines the full agency-grade onboarding audit run on every incoming Social Media Management brand-study request:

- **Step 0 — Industry Filter**: classify the business into an archetype (Automotive, Service-Based, Retail/E-commerce, F&B, Real Estate, Hospitality) before auditing, so findings weight toward what actually matters for that industry instead of a flat checklist
- **Universal checks** run regardless of archetype: content format mix, value-vs-sales ratio, bio/keyword optimization, response time, posting frequency, raw/unfiltered vs. polished content, "content about making content," trend participation, brand consistency, image quality/format (1080×1350 primary feed size), logo placement, hashtags, Reels frame structure, subtitles, ad-to-landing-page scent congruency, profile picture optimization
- **9 audits**: Page, Industry, Competitor Analysis, Content, Gap, 6-Month Performance, Missing Functions, plus a "what's missing" synthesis and SWOT mapping
- **Diagnosis-vs-execution boundary**: this skill produces findings and a prioritized checklist, never literal fix content (no rewritten bios, no ready captions) — that boundary is what keeps the free report from giving away the paid package's work
- Hands off raw findings to `social-media-brand-study-reporter` rather than writing the final documents itself

See [Agents/brand-study-research.md](../Agents/brand-study-research.md) for the agent that loads this skill.
