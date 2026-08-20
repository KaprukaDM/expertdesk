---
name: social-media-management
description: When fulfilling a client's Social Media Management order (platform audit, content calendar, competitor research, brand voice guide, posts/carousels/Reels, organic growth best practices, reporting, or ads strategy recommendations). Also use when the user mentions "SMM package," "social media management deliverable," "content calendar," "platform audit," "brand voice guide," "social media report," or asks to draft deliverables for the Social Media Management service defined in src/lib/services.ts. For paid campaign execution, see ads. For one-off video/graphic assets outside a management retainer, see the Video Creation / Graphic Design services instead.
metadata:
  version: 1.0.0
---

# Social Media Management — Fulfillment

You are a social media manager delivering against this project's **Social Media Management** package (defined in [src/lib/services.ts](../../../src/lib/services.ts), slug `social-media-management`). Your job is to produce the actual deliverables promised in the tier the client bought — not generic advice.

## Before Starting

Identify which tier the order is for, since scope differs materially:

| Deliverable | Basic (800 tokens / Rs 8,000, 14 days, 1 platform) | Standard (1,750 tokens / Rs 17,500, 30 days, 2 platforms) | Premium (2,500 tokens / Rs 25,000, 30 days, up to 5 platforms) |
|---|---|---|---|
| Platform audit | 1 platform | 2 platforms | Up to 5 platforms |
| Fixes implemented (from the brand study's checklist) | 5 fixes | 10 fixes | 15 fixes |
| Content calendar | Yes | Yes (inherited) | Yes (inherited) |
| Competitor research | — | Yes | Deeper competitor benchmark |
| Brand voice & style guide | — | Yes | Yes (inherited) |
| Posts, incl. carousels | 15 | 15 | 18 |
| Reels / Stories | 2 Reels | 8 Reels + Stories | 15 Reels + Stories |
| Reporting | 6-month rolling report w/ actionable insights | Monthly action plan (adds to Basic's report) | Custom organic growth playbook |
| Ads strategy | — | — | Ads campaign strategy (recommendations only — not execution) |
| Specialist | — | — | Dedicated specialist |

**On "fixes implemented":** the specialists' current tools (`Read, Write, WebSearch, WebFetch` — no live platform-write access) mean a "fix" is delivered as a **ready-to-apply artifact** — the exact bio copy, the specific CTA button to select, a ready caption template — not a change made directly on the client's live account. An operator or the client applies it. This will change once live write access exists (see Live Data section below); until then, treat every fix as "here's exactly what to change it to," not "already changed."

### Agent capabilities by tier

What the agent actually does for each package, in one place — use this to answer "what does the agent do for a Basic/Standard/Premium order" without cross-referencing every section below.

**Basic**
- Platform audit of 1 platform (public data, or live Insights if a token has been supplied for that client)
- Implements the top **5 fixes** from the brand study's prioritized Fix Checklist (lowest-effort/highest-impact first — see `social-media-brand-study`)
- Content calendar covering 15 posts (incl. carousels) + 2 Reels across the 14-day window
- 6-month rolling report with actionable insights (reach, engagement rate, follower-growth trend, 2-3 next steps)
- Organic growth best-practices guide (general, not custom)

**Standard** — everything in Basic, plus:
- Platform audit extended to 2 platforms
- Implements **10 fixes** total from the checklist (the same 5 as Basic, plus the next 5 in priority order)
- Competitor research on 2-3 named/identified competitors
- Brand voice & style guide
- Content calendar holds at 15 posts (same as Basic) but adds 8 Reels/Stories across the 30-day window — Standard's differentiation is competitor research, brand voice, and 2-platform scope, not extra post volume
- Monthly action plan layered onto the reporting

**Premium** — everything in Standard, plus:
- Platform audit extended to up to 5 platforms
- Implements **15 fixes** total from the checklist (the full Standard set, plus the next 5 in priority order — if the checklist has fewer than 15 items, note that in the delivered report rather than padding with invented fixes)
- Deeper competitor benchmark (growth trend, paid-ad presence via Ad Library, positioning summary)
- Content calendar scaled to 18 posts + 15 Reels/Stories — only a modest step up in posts (15→18) but a much bigger jump in Reels (8→15), weighting Premium's value toward the higher-effort Reels format rather than static post volume
- Custom organic growth playbook (tailored, not general)
- Ads campaign strategy — recommendations only, no execution (route execution to the **ads** skill)
- Dedicated specialist framing in all deliverables/communication

None of these currently include replying to comments/DMs or scheduling — both were removed from the package scope (see Common Mistakes below).

Gather this context before producing anything (ask if not provided):

1. **Brand basics** — business name, what they sell, existing brand colors/fonts/logo if any
2. **Platform access** — which platform(s), and whether you have view-only or manager access (see `accessPlatforms` in the service definition: Instagram Business account, Facebook Page)
3. **Existing presence** — links to current profiles, or confirmation this is a fresh setup
4. **Goals** — awareness, engagement, leads, or sales — this shapes the content calendar and report framing
5. **Competitors** — 2-3 named competitors, or ask permission to identify likely ones from the industry

### Live data via Meta Business Portfolio (opt-in only, not yet built)

**Target architecture** (not implemented in the app yet — described here so deliverables and the eventual build stay aligned):

1. One Meta App registered under our own **Business Portfolio** (Business Manager).
2. When a client consents to share access (`consentToShareAccess` in the request flow — see `accessPlatforms` in `src/lib/services.ts`), their Page/IG account is added as a **client asset** in our Business Portfolio.
3. A **System User** in Business Manager is assigned that asset.
4. The operator (not the agent) generates the **System User access token** scoped to the assigned assets, through Business Manager's own UI — long-lived, not tied to any individual's personal login, centrally revocable from the Business Portfolio.
5. The operator supplies that already-generated token to the agent. **The agent never generates, requests generation of, or handles the OAuth/Business Manager flow itself** — it only consumes a token it's been handed and uses it to call the Graph API server-side for real Page/IG Insights.

Real API access is only ever available if the client explicitly opts in via the existing consent step, and the token exists only once the operator has generated it out-of-band and provided it. If no token has been supplied, the agent uses the manual, public-profile-based process below — never blocking delivery waiting on one, never asking the client for the token directly.

Once supplied, prefer the token over manual scraping for the **platform audit** (§1) and **reporting** (§6) — pull actual reach, impressions, engagement rate, and follower-growth numbers rather than estimating from public view. Treat any token as a credential: never print it in full in any deliverable, log, or output; reference it only as "connected" / "asset on file."

Until a token is supplied for a given client, always use the manual, public-profile-based process for that client's tier.

---

## 1. Platform Audit

Scope scales with tier (1 / 2 / up to 5 platforms). For each platform, check and report on:

- **Profile completeness** — bio, link-in-bio, contact info, category, profile/cover images
- **Posting cadence** — how often they've posted over the last 30-90 days
- **Content mix** — ratio of static posts / carousels / Reels / Stories
- **Engagement rate** — (likes + comments) / followers, benchmarked against their industry if known
- **Highlights/pinned content** (Instagram) or pinned posts (Facebook)
- **Gaps** — missing link-in-bio, no CTA in bio, inconsistent posting, stale content, broken links

Output as a short findings table (platform → what's working → what's broken → fix priority), not a wall of prose.

## 2. Content Calendar

Produce a calendar mapped to the delivery window (14 or 30 days), covering exactly the post/Reel counts sold in that tier. For each entry:

- Date/day
- Format (static post / carousel / Reel / Story)
- Topic/hook
- Caption draft or caption direction
- CTA

Group into weekly themes rather than a flat list — makes the plan scannable and gives the client a narrative arc across the period.

## 3. Competitor Research (Standard & Premium)

For 2-3 competitors (client-named or identified from their industry):

- Posting frequency and best-performing formats
- Recurring content themes/pillars
- Engagement patterns (what gets the most comments/shares, not just likes)
- Gaps — what they're *not* doing that the client could own

Premium's "deeper competitor benchmark" adds: follower growth trend if visible, ad presence (are they running paid alongside organic — check Meta Ad Library), and a side-by-side positioning summary against the client.

## 4. Brand Voice & Style Guide (Standard & Premium)

A short, usable reference — not a 20-page brand book:

- **Tone** — 3-4 adjectives with a "sounds like / doesn't sound like" example pair
- **Do's and don'ts** — language, emoji use, formality level
- **Visual notes** — color palette, font pairing if known, photo/graphic style direction
- **Caption structure** — hook style, CTA pattern, hashtag approach

## 5. Organic Growth Best Practices

Basic and Standard get a general best-practices guide; Premium gets a **custom playbook** tailored to the client's platform mix and audience. This isn't a generic listicle — ground it in what the `social-media-brand-study` universal checklist and this client's own platform audit actually found, so the guide reads as "how to run *your* pages well," not a stock document handed to every client.

Cover:

- **Maintaining strong pages, day to day** — the operating discipline behind everything else on this list: a real posting cadence (not sporadic bursts), timely response to comments/DMs, keeping bio/link-in-bio current, and periodically re-auditing against the same checklist the brand study used
- **Creative pipeline — multiple sources, not one bottleneck** — don't rely on a single source for content (e.g., only staged shoots). Build from several: staff/behind-the-scenes footage, customer UGC and reposts, process/BTS content (see the brand-study skill's "content about making content" finding), repurposing existing photo/video assets into new cuts, and trend-driven quick content. A pipeline with multiple sources doesn't run dry the way a single-source one does
- **Different placements reach different audiences — use them deliberately, not interchangeably**: feed posts build the permanent grid/discovery surface, Reels drive reach to non-followers via the algorithm, Stories drive daily engagement with existing followers, and each has a different job — don't treat them as the same content resized three ways
- **Content mix** — balance across formats (static/carousel/Reel/Story) and across purpose (see next point), matching the format-mix finding from the platform audit
- **Value content for building authority** — content that teaches, entertains, or answers a real question the audience has, not just promotional posts; this is what earns saves/shares and builds the account as a trusted source, not just a storefront (ties directly to the brand-study's value-vs-sales-ratio finding)
- **Consistency (NAP)** — Name, Address, Phone (and other core business facts — hours, category) must match exactly across every platform and every profile field; inconsistent NAP undermines trust and hurts discoverability, and it's a five-minute fix worth calling out explicitly if the platform audit found any mismatch
- **Keywords in text** — real search terms a customer would type, worked naturally into bios and captions, not just hashtags (same searchability logic as the brand-study's bio/caption keyword checks)
- **Question-and-answer phrasing** — structure some captions/posts as a direct question a customer would ask, answered in the post itself ("Do you deliver to Colombo 5? Yes — here's how it works…"); this format tends to perform well because it mirrors how people actually search and think, and doubles as FAQ content
- **Inspiration folder — steal like an artist, then adapt** — maintain a running swipe file of formats/hooks/structures that are working, pulled from **cross-industry** sources, not just direct competitors (a bakery can learn a hook structure from a fitness creator). The output is never a copy — take the *structure* (pacing, hook type, format), rebuild it with this brand's own subject matter, voice, and visuals, so the result is genuinely original despite being inspired
- **Interest media, not just social media** — modern platforms surface content to an interest graph (people who don't follow you but who the algorithm thinks will care), not just a social graph (your existing followers). Plan content to earn distribution on its own merit — hook, pacing, relevance — rather than assuming only followers will ever see it
- **Content volume** — enough output for the algorithm to find winners at all; a handful of posts a month can't produce a breakout the way a real cadence can (see the `ads` skill's "Modern Meta playbook" for the paid-side version of this same principle — creative volume is the constraint there too)
- **Creator-style content volume, specifically** — native, personality-led, lower-production content (talking straight to camera, day-in-the-life, process clips) needs to run at higher frequency than polished brand content — it's cheap to produce and is what "interest media" placements reward, so don't let production quality bottleneck volume
- **Boost only winning content** — when recommending or executing paid amplification (Premium's ads strategy, §7), only put budget behind content that's already proven itself organically; boosting untested creative is a "creative vulnerability" — you're paying to find out something a free organic post could have told you for nothing
- **Tight hooks and CTAs in every creative brief** — when briefing out content production (whether to a specialist, a freelancer, or the client's own team), never leave the hook (first 1-3 seconds of a Reel, first line of a caption) or the CTA loose or generic — write the exact hook line and exact CTA in the brief itself; these two elements carry disproportionate weight in performance, so ambiguity here is the single most common way a brief produces weak content
- **Content flywheel — break one piece into many** — a single piece of source content (one shoot, one long-form video, one customer story) gets atomized into multiple posts across formats: the full Reel, a 3-slide carousel of key stills, a Story sequence, a quote-card static, a caption-only text post reusing the same story. One unit of production effort becomes 4-6+ pieces of distinct content, instead of one shoot producing one post. This is what makes the content-volume and creator-content-volume points above actually achievable without a proportional production budget increase — plan every shoot/session with this breakdown in mind from the start, not as an afterthought once the "main" post is done
- Optimal posting times/frequency for their audience
- Hook structures that stop the scroll in the first 1-2 seconds (Reels) or first line (captions)
- Hashtag strategy — mix of broad/niche/branded, not just volume
- Algorithm notes relevant to the current platform version (e.g., what each platform is currently rewarding — saves, shares, watch time, comments)
- Cross-posting/repurposing guidance across their platform mix

## 6. Reporting

- **Basic** — 6-month rolling report with actionable insights: reach, engagement rate, follower growth trend, and 2-3 concrete next-step recommendations. If the account has less than 6 months of history, report on what exists and note the account is still building baseline data.
- **Standard** — adds a monthly action plan: what changes based on the last period's data, going into the next.
- **Premium** — a custom organic growth playbook derived from the reporting data, not just a report — i.e., the recommendations become a structured plan the client can execute even without ongoing management.

Never hand back raw metrics without interpretation — every number needs a "so what."

## 7. Ads Campaign Strategy (Premium only)

This is **strategy and recommendations only** — targeting approach, budget allocation guidance, creative direction, and platform choice. It is explicitly not paid execution; if the client wants campaigns actually built and run, route them to the **Meta Ads** or **Google Ads** service (see [src/lib/services.ts](../../../src/lib/services.ts)) to avoid scope creep into a separate paid service.

---

## Tool Integrations

- **Meta Business Suite** access (per `accessPlatforms` in the service definition) — needed for posting/replying if the client grants page-manager access; audits and research can be done from public profile views without it.
- If Meta's ad-platform MCP tools are connected, they can pull live Ad Library data for competitor paid-presence checks (Premium) — otherwise fall back to manual `site:facebook.com/ads/library` style lookups via web search.

## Common Mistakes to Avoid

- Delivering generic "10 social media tips" instead of content mapped to the client's actual brand and audience
- Promising engagement/reply management ("comments & DMs") — this was removed from the current package scope; don't include it unless the client's tier explicitly lists it
- Padding the report with vanity metrics (raw like counts) instead of rates and trends
- Scoping ad campaign execution into Premium's "ads strategy" line — that's recommendations only

## Related Skills

- **ads** — for actually building and running the Premium tier's recommended ad campaigns
- **content-strategy** — for deeper topic/pillar planning beyond the calendar's scope
- **brand** — for a fuller brand identity system if the client needs more than the style-guide summary here
