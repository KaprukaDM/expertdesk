---
name: ux-laws-audit
description: When auditing a website's key pages against established UI/UX laws, heuristics, and persuasion principles — Nielsen's usability heuristics, Laws of UX (Fitts's Law, Hick's Law, Jakob's Law, etc.), Gestalt principles, Shneiderman's Golden Rules, Cialdini's persuasion principles, and core accessibility principles. Use when the user says "UX audit," "usability heuristics," "UX laws," "does this page follow UX best practices," or asks for a page to be checked against known design/usability principles. Not tool-dependent — doesn't require heatmap/analytics access, just the ability to view the page. For CRO's conversion-specific funnel audit (drop-off points, checkout friction), see cro-brand-study/cro-fulfillment; this skill is the page-level usability-law cross-check that feeds into it.
metadata:
  version: 1.0.0
---

# UX Laws Audit

Cross-checks a website's key pages against a curated set of established, citable UI/UX laws and principles — not a vague "this feels off" review. Every finding names the specific law it violates or satisfies, so it's teachable and defensible, not just an opinion.

**This audit has no external dependency** — unlike heatmap/session-recording analysis, it doesn't require the client to already have a tool connected. That's deliberate: it's the reliable, always-available core of a UX review, with heatmap data as a bonus layer on top when it exists.

## The Corpus

Not every law applies to every page — **apply judgment, not a checklist run mechanically**. A single-product landing page doesn't need Hick's Law scrutiny (no complex choice to simplify); a category/filter page does. Pick the laws relevant to what the page actually asks the visitor to do.

### Usability Heuristics (Nielsen's 10)
Visibility of system status · Match between system and the real world · User control and freedom · Consistency and standards · Error prevention · Recognition rather than recall · Flexibility and efficiency of use · Aesthetic and minimalist design · Help users recognize/diagnose/recover from errors · Help and documentation

### Interaction Design Rules (Shneiderman's 8 Golden Rules — beyond overlap with Nielsen)
Strive for consistency · Enable frequent users to use shortcuts · Offer informative feedback · Design dialogs to yield closure · Offer simple error handling · Permit easy reversal of actions · Support internal locus of control · Reduce short-term memory load

### Cognitive & Perceptual Laws (Laws of UX)
Fitts's Law (target size/distance vs. speed of selection) · Hick's Law (more choices = slower decisions) · Jakob's Law (users expect your site to work like others they know) · Miller's Law (7±2 items in working memory) · Aesthetic-Usability Effect (attractive design reads as more usable) · Doherty Threshold (system response under 400ms keeps attention) · Peak-End Rule (an experience is judged by its peak and its end, not its average) · Serial Position Effect (first and last items are best remembered) · Von Restorff Effect (the item that stands out is the item remembered) · Zeigarnik Effect (incomplete tasks are remembered better than completed ones — relevant to progress indicators) · Goal-Gradient Effect (motivation increases as the goal nears — relevant to checkout progress bars) · Tesler's Law (complexity can be moved but not eliminated — someone has to handle it) · Occam's Razor (the simplest solution that works is usually right) · Parkinson's Law (work expands to fill the time given — relevant to form completion time) · Postel's Law (be liberal in what you accept from users — lenient input validation) · Selective Attention (users filter out what looks like an ad or isn't relevant to their goal) · Mental Model (design should match the user's existing expectation of how something works) · Paradox of the Active User (users start using something immediately rather than reading instructions first — don't rely on onboarding text)

### Gestalt Principles (visual grouping)
Law of Proximity · Law of Similarity · Law of Common Region · Law of Uniform Connectedness · Law of Prägnanz (simplest interpretation wins) · Figure-Ground · Closure · Continuity

### Persuasion Principles (Cialdini)
Reciprocity · Commitment & Consistency · Social Proof · Authority · Liking · Scarcity · Unity — directly relevant to trust signals and CRO findings; cross-reference with `cro-fulfillment` when auditing a checkout/product page.

### Accessibility (WCAG POUR, foundation level)
Perceivable · Operable · Understandable · Robust — flag anything that would fail a basic accessibility pass (contrast, alt text, keyboard navigation, focus states) since these are usability issues for a meaningful share of visitors, not edge cases.

That's ~45-50 named, citable principles across 6 categories — the "50 laws" scope.

## How to Audit a Page

1. **Identify what the page is asking the visitor to do** (buy, sign up, compare, read, navigate) — this determines which laws are even relevant.
2. **Walk the page like a first-time visitor**, not a designer looking for flaws in the abstract.
3. For each finding: name the **specific law**, describe **what's actually on the page**, and state **why it matters for this page's goal** — never "this violates Hick's Law" without saying what choice is overloading the visitor and what completing that choice was supposed to lead to.
4. Prioritize findings that block or slow the page's actual goal over cosmetic nitpicks — a Fitts's-Law-violating CTA button on the checkout page outranks an aesthetic inconsistency in the footer.
5. Don't force every law onto every page. A finding that requires straining to make a law fit is worse than no finding.

## Output

A findings list per page, each tagged with the specific law/principle, the observation, and the impact — feeds into `cro-fulfillment`'s Funnel Audit / UX Review sections the same way any other CRO finding does, through the conversion lens.

## Common Mistakes to Avoid

- Running the full 50-law list against every page regardless of relevance — apply judgment
- Citing a law without explaining the actual on-page observation and its consequence
- Treating this as a replacement for the funnel-level conversion audit — it's a complementary page-level lens, not the whole CRO audit
- Vague findings ("poor UX here") instead of a named, specific principle
