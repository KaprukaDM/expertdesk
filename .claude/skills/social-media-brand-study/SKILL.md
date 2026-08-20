---
name: social-media-brand-study
description: When given a brand/business to research for a Social Media Management brand study — produces a full agency-grade onboarding audit (page audit, industry audit, competitor analysis, content audit, gap audit, 6-month performance audit, missing-functions audit, SWOT, and a prioritized fix checklist) as raw findings, ahead of proposing the 3 tailored Social Media Management packages. Also use when the user mentions "social media audit," "SWOT for social," "onboarding audit," "fix checklist," or asks what an award-winning agency would check when onboarding a new brand's social presence. This skill produces findings only — for compiling them into the internal report + client report, see social-media-brand-study-reporter. For the general cross-service brand-study process and proposal output format, see brand-study. For fulfilling the order after a package is picked, see social-media-management.
metadata:
  version: 1.0.0
---

# Social Media Research & Brand Study

You are given a brand to study for social media purposes. Your job is to do the full research and hand back findings structured the way an award-winning agency would present a brand's first onboarding audit — not a shallow scan. **You produce the findings, not the final documents** — hand your completed audits to the `social-media-brand-study-reporter` skill/agent, which compiles them into the internal report and the client report (see "Output Format" below). That reporter's client report is what later feeds into the `brand-study` skill's output format for sizing the 3 tailored Social Media Management packages.

## Before Starting

Confirm what you're working with:

- **Brand identity** — business name, what they sell, target audience if known
- **Industry archetype** — see "Step 0 — Lock the Industry Filter" below; classify this before running any audit
- **Platform(s) in scope** — which account(s) to study (Instagram, Facebook, others)
- **Live data availability** — has an access token + Page ID been supplied? See "Live Data" below. If not, every audit below runs on public information only — never block on this.
- **Competitors** — named by the client, or identify 3-5 real ones from the industry if not given

## Live Data (opt-in, operator-supplied only)

The operator may supply an already-generated Meta access token together with the Page ID (and IG Business Account ID if linked), obtained through the Business Portfolio / System User flow. When supplied:

- Use it to pull real Page/IG Insights for the **Page Performance Audit** (§6) — actual reach, impressions, engagement rate, follower growth over the trailing 6 months, not public-view estimates.
- **You never generate, request, or handle token creation.** You only consume a token you've been handed. If none is supplied, run every audit below on public profile data instead — this never blocks delivery.
- Treat the token and Page ID as credentials: never print the token in full in any output; the Page ID itself is not sensitive and can be referenced normally.

---

## Step 0 — Lock the Industry Filter

Before running any audit, classify the business into one industry archetype and **lock it in** — every audit below reads through that lens, not a generic one. Two businesses can have identical follower counts and posting frequency and still need completely different findings, because what "good" looks like, what functions matter, and who the real competitors are, differ by archetype. A car dealership and a hair salon are not judged by the same yardstick even though both are "local businesses on Instagram."

| Archetype | Content pillars to expect | Missing Functions to check | Typical CTA | Competitor set |
|---|---|---|---|---|
| **Automotive / Vehicle Sales** | Vehicle walkaround videos, financing offers, delivery-day moments, service-department tips | Catalog/inventory tab, "Enquire about this vehicle" quick-reply, financing calculator link, test-drive booking | "Book a test drive," "Enquire now," "Check financing" | Other dealerships/showrooms in the same city and price tier |
| **Service-Based Business** (salon, repair, consulting, agency, clinic-adjacent trades) | Before/after or case-study proof, behind-the-scenes of the service itself, testimonials, staff/expertise spotlights, availability | Booking/appointment link, WhatsApp quick-reply for quote requests, service-area info, review-aggregator link | "Book now," "Get a quote," "DM for availability" | Other providers of the same service in the same geography |
| **Retail / E-commerce** | Product features, UGC/unboxing, promos, restock announcements | Shop/catalog tab, product tagging in posts, checkout-in-bio link | "Shop now," "Add to cart" | Other sellers of comparable products, same price tier |
| **Food & Beverage** | Menu items, behind-the-kitchen process, specials, table/atmosphere shots | Order/delivery link, table-reservation link, menu link-in-bio | "Order now," "Reserve a table" | Nearby venues in the same cuisine/price bracket |
| **Real Estate** | Listing walkthroughs, neighborhood spotlights, market updates, client testimonials | Listing catalog, WhatsApp enquiry quick-reply, virtual-tour link | "Enquire about this listing," "Book a viewing" | Other agents/agencies active in the same area |
| **Hospitality / Travel** | Property/experience showcases, guest stories, seasonal packages | Booking-engine link, WhatsApp enquiry, review-aggregator link | "Book your stay," "Check availability" | Comparable properties/experiences in the same category and region |

This table isn't exhaustive — if the business doesn't fit cleanly, name the closest archetype and note where it diverges, rather than forcing a bad fit or defaulting to a generic checklist.

**Concretely, why this matters (the car dealership vs. service business case):** a car dealership's Missing Functions Audit should flag a missing "Enquire about this vehicle" quick-reply and no financing-calculator link — a booking-appointment link would be irrelevant to them. A hair salon's audit should flag a missing booking link and no client testimonials in the content mix — a vehicle-inventory catalog would be irrelevant to them. Their competitor sets don't overlap at all (other dealerships vs. other salons in the neighborhood), and their expected content pillars are entirely different (vehicle walkarounds and financing offers vs. before/after transformations and availability posts). Running the same generic audit against both would surface half-relevant findings for each.

### Universal vs. archetype-specific

Not everything varies by industry — don't over-apply the filter to checks that are the same for every business. Split each audit's items this way:

**Universal — run identically regardless of archetype:**

- **Bio optimization** — not just clarity, but whether it's written to actually surface in search (real keywords a customer would type, not just brand name) (Page Audit)
- **Keyword use in posts/captions** — same searchability logic applied to caption copy, not just the bio (Content Audit)
- **Profile picture optimization** — recognizable at thumbnail size, on-brand (logo mark or a real face for personal-brand accounts, not a generic default), consistent across platforms (Page Audit)
- Profile/cover image quality, business hours/contact info completeness, broken links/dead redirects (Page Audit)
- **Content format mix** — balance across static/carousel/Reel/Story, not over-reliance on one format (Content Audit)
- **Value content vs. sales content ratio** — is the feed mostly "buy this" or does it actually teach/entertain/inform first (Content Audit) — a feed that's constant selling reads worse regardless of industry
- **Raw/unfiltered vs. over-polished content** — native, native-feeling content consistently outperforms studio-polished output across virtually every industry; flag over-production as a finding, not a strength (Content Audit)
- **"Content about making content"** — behind-the-scenes/process content (how a post gets made, not just the finished product) as its own recurring pillar, since it reliably outperforms pure finished-product content (Content Audit)
- **Sticking with trends** — whether the account participates in current trending formats/audio/challenges at all, and how recently (Content Audit)
- **Posting frequency** — cadence trend on its own, in addition to the industry benchmark comparison in the Industry Audit (Content Audit / Performance Audit)
- Caption grammar and clarity, hashtag spam vs. relevance (Content Audit)
- Whether analytics/tracking exists at all, engagement-rate math, follower-growth trend direction (Performance Audit)
- **Response time** — whether comments/DMs are being responded to at all, and how quickly
- **Scent congruency** — does what a post/ad promises match where it actually sends someone (link-in-bio destination, WhatsApp chat, landing page)? A caption promising "20% off" landing on a generic homepage breaks the promise at the exact moment of highest intent. This is the same headline-mirror principle in the `ads` skill's Landing Page Alignment section, applied to organic posts and bio links, not just paid ads — check it on every CTA-bearing post and on the bio link itself, and flag it explicitly if this order includes Premium's ads strategy (§7), since ad-to-landing-page congruency there is the single highest-leverage lever available
- Accessibility basics — alt text usage, caption legibility on small screens
- General SWOT structure and Fix Checklist prioritization method (effort vs. impact ordering applies the same way everywhere)

**Production/technical quality — also universal:**

- **Image quality** — resolution, lighting, composition; blurry or under-lit images are a finding regardless of industry (Content Audit)
- **Image formats — checked post by post, against real spec** — feed is **1080×1350** (4:5 portrait, the current default recommended size — takes up more screen space than square and should be the default choice, not an occasional variant); square 1080×1080 (1:1) is acceptable but suboptimal for feed; Stories & Reels are 1080×1920 (9:16). Don't just note the general ratio is "roughly right" — go through the recent post history and flag every specific post/Reel that's stretched, cropped, or exported at the wrong dimension for its placement (a square-exported Reel displays letterboxed, for example) — name the exact posts affected, not a vague summary (Content Audit)
- **Logo placement** — present, consistent position, not fighting with the platform's own UI overlays (captions, engagement icons) or covering key visual content (Content Audit)
- **Hashtags** — count and mix (broad/niche/branded), not just presence; overstuffed or entirely generic hashtag blocks both count as findings (Content Audit)
- **Reels script/frame structure** — the algorithm scans frame-by-frame, so pacing and hook placement inside the first 1-3 frames matter as much as the caption; check for a clear hook-beat-payoff structure rather than a single unbroken clip, and flag Reels with a slow or buried opening (Content Audit)
- **Subtitles/captions burned into video** — most viewing happens sound-off; a Reel or video post with no on-screen text is a finding regardless of how good the content otherwise is (Content Audit)
- **Brand consistency** — same color palette, fonts, and filter/tone applied across posts so the grid reads as one brand rather than a grab-bag; check this across formats too (do Reels/Stories match the feed's visual identity, or do they look like a different account) (Content Audit)

**Archetype-specific — driven by the Step 0 classification:**

- Which content pillars are *expected* to exist (Content Audit, §4)
- Which platform functions count as "missing" (Missing Functions Audit, §7)
- Who counts as a real competitor (Competitor Analysis, §3)
- What benchmark engagement rate and posting cadence looks like for this category (Industry Audit, §2)
- Which CTA the Page Audit should be checking for

When in doubt about whether a specific check belongs in one bucket or the other, default to universal — it's better to run a check everywhere than to accidentally skip a real issue because it wasn't in the locked archetype's table.

Once locked, reference the archetype explicitly wherever it drives a finding — the Industry Audit (§2), Missing Functions Audit (§7), Content Audit's pillar expectations (§4), and Competitor Analysis's competitor selection (§3) all read through it. Everything else in the report runs the same way regardless of what business walked in.

---

## The Audits

Run all of these for every platform in scope. Each becomes its own section in the final report.

### 1. Page Audit

Profile-level setup, the first thing any agency checks on onboarding:

- Bio quality — clear, on-brand, includes a reason to follow
- CTA / contact button configured (Call, WhatsApp, Email, Book, Shop)
- Category correct and specific
- Link-in-bio — present, working, pointing somewhere useful (not just a dead homepage link)
- Profile photo and cover/highlight-cover consistency and quality
- Verification badge status (if applicable/available)
- Business hours, address, contact info completeness
- Pinned post/content — is the first thing a new visitor sees actually the best pitch

### 2. Industry Audit

Context the brand sits inside — without this, every other audit misreads what "good" looks like:

- What formats and cadence actually work in this specific industry (e.g., high-frequency Reels for F&B, lower-frequency polished content for B2B/professional services)
- Seasonal patterns relevant to the business (e.g., retail spikes, tourism seasons)
- Which platforms the industry's audience actually lives on — is the brand even on the right platform(s)
- Typical benchmark engagement rate for this industry/size, so later findings aren't judged against a generic global average

### 3. Competitor Analysis Audit

3-5 real, named competitors:

- Posting frequency and format mix
- What's actually resonating for them (highest-engagement posts, and why — hook, format, topic)
- Recurring content themes/pillars they own
- Tone/positioning — how they talk to their audience
- Where they're weak — the opening this brand could take

### 4. Content Audit

Everything the brand has posted, assessed as a body of work:

- Content pillars/themes actually present vs. absent
- Visual consistency — do posts look like one brand or a grab-bag
- Caption quality — hook strength, CTA presence, voice consistency
- Format mix — over-reliance on one format (e.g., all static, no video)
- Best- and worst-performing posts, with a hypothesis for why
- Hashtag strategy — present, relevant, or generic/spammy

### 5. Gap Audit

What's missing relative to both the industry audit and the competitor audit:

- Content types competitors use that this brand doesn't (Reels, UGC, behind-the-scenes, testimonials)
- Platforms the audience is on that the brand isn't
- Messaging/topics competitors own that are open ground here
- Paid support — is organic doing all the work with zero paid amplification where competitors are running ads

### 6. Page Performance — Past 6 Months Audit

Trend, not a snapshot:

- Reach and impressions trend (up/down/flat)
- Engagement rate trend
- Follower growth rate and any inflection points (spikes/drops — investigate what caused them if visible)
- Best time-of-day/day-of-week patterns if data allows
- If live data was supplied (see above), use real Insights numbers; otherwise note the account's public follower-count trend and visible engagement as the closest available proxy, and flag that estimates are directional, not exact

### 7. Missing Functions Audit

Platform features and functionality the brand isn't using — the technical/functional layer above content:

- Shop/catalog tab (if e-commerce)
- WhatsApp/Direct message quick-reply or automated responses
- Link stickers in Stories, saved highlight structure
- Broadcast channel, subscriber content, close-friends usage where relevant
- Collab posts, cross-tagging with partners/influencers
- Any platform-native tool the industry audit suggests peers are using that this brand isn't

### 8. What's Missing — Synthesis

A short, pulled-together summary combining the Gap Audit (§5) and Missing Functions Audit (§7) into one clear "here's what a fully set-up competitor has that you don't" list — this is the section that makes the case for the proposal.

### 9. SWOT Analysis

Map everything above into a standard SWOT, each point traceable back to a specific audit finding (not generic boilerplate):

- **Strengths** — what's already working (from Content Audit, Page Audit)
- **Weaknesses** — what's broken or absent (from Gap Audit, Missing Functions Audit, Page Audit)
- **Opportunities** — open ground competitors haven't taken (from Competitor Analysis, Industry Audit)
- **Threats** — where competitors or platform shifts put the brand at risk (from Competitor Analysis, Industry Audit)

---

## Fix Checklist (the deliverable)

The output that actually drives the proposal. Structure as a **prioritized checklist**, low-hanging fruit first, split into three clearly divided sections:

1. **Page fixes** — profile/setup items from the Page Audit and Missing Functions Audit (bio, CTA button, link-in-bio, shop tab, etc.)
2. **Content fixes** — items from the Content Audit and Gap Audit (content pillars to add, format mix to fix, hashtag strategy, caption improvements)
3. **Ads fixes** — items from the Gap Audit's paid-support finding and any Pixel/tracking gaps if ads are already running

Within each section, order by **effort vs. impact** — genuine 5-minute fixes (turn on a CTA button, fix a broken bio link) come before larger undertakings (rebuild the content pillar strategy). Tag each item with a rough effort level (Quick / Medium / Involved) so the reader can triage at a glance.

### Diagnosis, not execution — where the free/paid line sits

The free brand study sells the *diagnosis*; the paid package sells the *cure*. Every checklist item **names the problem, why it matters, and its priority** — it does not include the actual fix content. Compare:

- ✅ Free checklist: "Bio isn't written for search — currently just the business name, no location or specialty keywords a customer would actually type. Quick fix."
- ❌ Not in the free checklist: the literal rewritten bio text, ready to paste in
- ✅ Free checklist: "No CTA button configured — should be 'Order Food' or 'Call.' Quick fix."
- ❌ Not in the free checklist: a full CTA/caption template pack

This isn't withholding for its own sake — a business owner can trivially fix "add a CTA button" themselves in two minutes once told it's missing; that costs nothing to give away and builds trust in the diagnosis. What's actually valuable — and what the packages charge for — is the **produced execution**: the exact copy, the content calendar, the ongoing management. Once a package is picked, the `social-media-platform-auditor` and `social-media-content-calendar` specialists (see `social-media-management` / `social-media-team`) produce the literal ready-to-apply content for the tier's fix count (5/10/15). The free study never does that work.

## Output Format — two documents, not one

Produce **two separate Markdown files** from the same research. Don't merge them, and don't produce only one — each has a different audience and a different amount of restraint applied.

### 1. Internal report (full detail — everything)

Every audit, unredacted, in this order: Industry Filter classification (Step 0) → Page Audit → Industry Audit → Competitor Analysis → Content Audit → Gap Audit → Page Performance (6mo) → Missing Functions → What's Missing (synthesis) → SWOT → Fix Checklist. Unlike the client version, this one **can** include draft fix content where you already have it half-formed from doing the research (a rough bio rewrite idea, a first-pass CTA suggestion, raw competitor notes, live-data source numbers, confidence caveats) — so whoever delivers the paid package later isn't redoing the thinking from scratch. This is for the admin/specialist team only; it is never sent to the client. Save/reference it as the working document the delivery specialists (`social-media-platform-auditor`, `social-media-content-calendar`, etc.) pick up from once a package is purchased.

### 2. Client report (the brief — a short teaser, not a walkthrough)

**This is not a trimmed copy of the internal report's 11 sections.** It's a short, punchy document — 1-2 line summary, an Opportunity Score, 3-5 headline findings, a SWOT snapshot, a fix count (not the fix list itself), and a Projected Improved Score per tier — built to create urgency and trust in under two minutes, not to walk the client through every audit.

**This skill produces the raw findings; compiling them into the two finished documents is a separate job.** Hand your completed audits (Step 0 classification through the Fix Checklist) to the `social-media-brand-study-reporter` skill/agent, which owns the exact structure of both documents, the Opportunity Score methodology, and the write-internal-first-then-trim process. Don't write the final internal/client reports yourself — produce the findings, and let the reporter compile them.

## Common Mistakes to Avoid

- Generic findings that could apply to any brand ("post more consistently") instead of specific, numbered observations tied to this brand's actual profile/content
- Skipping Step 0 and running a one-size-fits-all checklist — a car dealership and a service business need genuinely different Missing Functions, content pillars, and competitor sets, not the same audit with different names swapped in
- Skipping the Industry Audit and then judging engagement against a generic benchmark that doesn't fit this business type
- A SWOT that doesn't trace back to the audits above it — every point should be justified by a specific finding
- A flat fix list with no effort/impact ordering — the whole value of the checklist is knowing what to do first
- Blocking on live data — always produce the full report from public information when no token has been supplied
- Writing the actual fix content into your findings (a full rewritten bio, ready-to-post captions, a built-out calendar) — save that half-formed thinking for the internal report the reporter compiles, don't skip straight to finished execution during research
- Compiling the final internal/client documents yourself instead of handing findings to `social-media-brand-study-reporter` — keeping research and compilation separate is what stops execution content or internal-only notes from accidentally reaching the client

## Related Skills

- **social-media-brand-study-reporter** — compiles this skill's raw findings into the internal report and the client report; always the next step after research is done
- **brand-study** — the general cross-service process the reporter's client report feeds into for producing the 3 tailored package options and admin-ready output format
- **social-media-management** — for fulfilling the order once a package built from this study is picked
