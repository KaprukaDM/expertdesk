import {
  Search,
  MousePointerClick,
  Target,
  Megaphone,
  Clapperboard,
  Palette,
  Sparkles,
  Film,
  Shapes,
  Share2,
  MessageCircle,
  Globe,
} from "lucide-react";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { ICON_OPTIONS, DEFAULT_ICON_KEY, type PackageTier, type FaqItem, type Service } from "@/lib/service-types";

export type { PackageTier, FaqItem, Service } from "@/lib/service-types";
export { ICON_OPTIONS } from "@/lib/service-types";

const upgradeFaq: FaqItem = {
  q: "Can I upgrade my package later?",
  a: "Yes — move from Basic to Standard or Premium whenever you like. Whatever you've already paid is credited toward the new package.",
};

const startFaq: FaqItem = {
  q: "How does work actually start?",
  a: "Request a free brand study — an expert researches your business and sends back a brief with 3 tailored package options. Pick one, and delivery begins — no discovery calls required.",
};

const instantStartFaq: FaqItem = {
  q: "How does work actually start?",
  a: "Pick a package and pay with tokens — no brand study needed since pricing here isn't research-dependent. Work starts right away, delivered by a fixed deadline.",
};

// Baseline catalog, shipped in code. Admins layer edits on top via ServiceOverride rows in the
// database (see listServices/getServiceBySlug below) rather than editing this array directly.
const STATIC_SERVICES: Service[] = [
  {
    slug: "seo",
    name: "SEO",
    blurb: "Rank higher, get found by people already searching for you.",
    description:
      "A technical and content audit of your site, ranked by sales impact — not jargon score. Plain-language findings, with guided fixes for what's actually costing you customers.",
    icon: Search,
    accessPlatforms: ["Google Search Console", "Google Analytics (GA4)"],
    instantCheckout: false,
    requiresWebsite: true,
    applicability: "Requires a live website — this service audits and optimizes pages you already have.",
    tint: "bg-primary/10",
    ink: "text-primary",
    packages: [
      {
        name: "Basic",
        tagline: "See why you're not ranking — and fix the worst of it.",
        price: "500 tokens",
        tokenCost: 500,
        delivery: "3-day delivery",
        deliveryDays: 3,
        revisions: "1 revision",
        features: [
          "5 target keywords",
          "3 pages optimized",
          "5 technical fixes",
          "On-page checklist",
        ],
      },
      {
        name: "Standard",
        tagline: "Get properly set up to rank.",
        price: "1500 tokens",
        tokenCost: 1500,
        delivery: "7-day delivery",
        deliveryDays: 7,
        revisions: "2 revisions",
        features: [
          "Everything in Basic",
          "15 keywords, mapped to pages",
          "Up to 10 pages optimized",
          "5–15 technical fixes",
          "Links from trusted sites",
          "Google Business Profile setup",
          "3-month content plan",
        ],
      },
      {
        name: "Premium",
        tagline: "A deep specialist pass across your whole site.",
        price: "2500 tokens",
        tokenCost: 2500,
        delivery: "14-day delivery",
        deliveryDays: 14,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "Up to 15 pages optimized",
          "Full site audit report",
          "SEO best-practices guide",
          "6-month content plan",
          "Dedicated specialist + direct line",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to give you my website login?",
        a: "No — the audit only needs your site URL. Login access is only needed if you'd rather we make the fixes ourselves.",
      },
      {
        q: "What if my site isn't ranking for anything yet?",
        a: "That's normal for a newer site. The audit still finds the fastest wins — speed, structure, and the keywords worth targeting first.",
      },
      upgradeFaq,
    ],
  },
  {
    slug: "cro",
    name: "CRO",
    blurb: "Turn more of your existing traffic into paying customers.",
    description:
      "A conversion audit of your buying path — checkout friction, trust signals, mobile UX — with the 3 changes most likely to lift your order rate, prioritized first.",
    icon: MousePointerClick,
    accessPlatforms: ["Google Analytics (GA4)"],
    instantCheckout: false,
    requiresWebsite: true,
    applicability: "Requires a website with an online checkout — built for stores, not lead-gen or brick-and-mortar sites.",
    tint: "bg-accent",
    ink: "text-primary",
    packages: [
      {
        name: "Basic",
        price: "50 tokens",
        tokenCost: 50,
        delivery: "4-day delivery",
        deliveryDays: 4,
        revisions: "1 revision",
        features: [
          "CRO audit of your top 3 pages (landing, product, checkout)",
          "Top 5 drop-off points, ranked by impact",
          "CTA + form quick fixes",
          "Written fix guide",
        ],
      },
      {
        name: "Standard",
        price: "200 tokens",
        tokenCost: 200,
        delivery: "8-day delivery",
        deliveryDays: 8,
        revisions: "2 revisions",
        features: [
          "Everything in Basic",
          "Full funnel review: landing → checkout, up to 6 pages",
          "Heatmap + session-recording analysis",
          "Mobile + desktop UX review",
          "1 verification re-scan after fixes",
        ],
      },
      {
        name: "Premium",
        price: "500 tokens",
        tokenCost: 500,
        delivery: "14-day delivery",
        deliveryDays: 14,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "GA4 + tracking-setup audit",
          "A/B test roadmap — 6 ready-to-run test ideas",
          "Competitor benchmark (2 competitors)",
          "Dedicated specialist + priority turnaround",
        ],
      },
    ],
    faq: [
      {
        q: "Does this work if I don't sell online — just collect leads?",
        a: "This service is built for shopping sites — it optimizes your buying path (cart, product pages, checkout). If you don't run a checkout, our SEO package is the better fit for lead generation.",
      },
      startFaq,
      {
        q: "Do you build the changes, or just tell me what to fix?",
        a: "Both — every finding comes with a step-by-step guide for your platform, and Premium clients can hand off the implementation to us entirely.",
      },
      upgradeFaq,
    ],
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    blurb: "Search campaigns that spend on people ready to buy.",
    description:
      "We build or audit your Google Ads account — starting from zero or fixing what's live — so budget goes to people actively searching to buy, not the wrong audience.",
    icon: Target,
    accessPlatforms: ["Google Ads account"],
    instantCheckout: false,
    requiresWebsite: false,
    applicability: "Works with your website or app as the ad destination — a Google Business Profile also works.",
    tint: "bg-[#5E8E3E]/10",
    ink: "text-[#5E8E3E]",
    packages: [
      {
        name: "Basic",
        tagline: "Find the leaks — or launch clean.",
        price: "150 tokens",
        tokenCost: 150,
        delivery: "3-day delivery",
        deliveryDays: 3,
        revisions: "1 revision",
        features: [
          "Ad account audit",
          "Or fresh setup: 1 campaign, 3 ad groups, up to 6 ads",
          "8 keywords + negative list",
          "Conversion tracking setup",
          "Ad extensions + assets",
          "Best-practices guide",
        ],
      },
      {
        name: "Standard",
        tagline: "A proper build with a plan behind it.",
        price: "400 tokens",
        tokenCost: 400,
        delivery: "6-day delivery",
        deliveryDays: 6,
        revisions: "2 revisions",
        features: [
          "Everything in Basic",
          "Deeper audit: 2 campaigns, 6 ad groups, up to 12 ads",
          "15 keywords + negatives",
          "GA4 + conversion tracking",
          "Ad strategy — targeting + budget plan",
          "14 days optimization + spend report",
        ],
      },
      {
        name: "Premium",
        tagline: "Your whole account, built to win — in one go.",
        price: "750 tokens",
        tokenCost: 750,
        delivery: "7-day delivery",
        deliveryDays: 7,
        revisions: "3 revisions",
        features: [
          "Everything in Standard",
          "Full account + competitor audit",
          "Full build — multiple campaigns, Performance Max",
          "30 keywords + negatives",
          "Strategy playbook + reporting dashboard",
          "30 days optimization + spend review",
        ],
      },
    ],
    faq: [
      startFaq,
      {
        q: "Do I need an existing Google Ads account?",
        a: "No — if you don't have one, Basic sets one up from scratch alongside the campaign. If you do have one, Basic audits it first and flags what's costing you.",
      },
      {
        q: "Do the tokens include my ad budget?",
        a: "No — tokens cover our work (audit, setup, strategy and optimization). Your actual ad spend is paid directly to Google and stays separate, so you keep full control of your budget.",
      },
      upgradeFaq,
    ],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    blurb: "Facebook & Instagram campaigns built to convert, not just reach.",
    description:
      "Facebook and Instagram campaigns built around a buying action, not vanity reach. We handle targeting, creative and budget so spend goes toward people likely to order.",
    icon: Megaphone,
    accessPlatforms: ["Meta Business Suite"],
    instantCheckout: false,
    requiresWebsite: false,
    applicability: "Works with your website or app, or a Facebook/Instagram Page as the campaign destination.",
    tint: "bg-[#002D2D]/10",
    ink: "text-[#002D2D]",
    packages: [
      {
        name: "Basic",
        price: "50 tokens",
        tokenCost: 50,
        delivery: "3-day delivery",
        deliveryDays: 3,
        revisions: "1 revision",
        features: [
          "Ad account audit",
          "Image campaign setup — 3 ads",
          "Meta Pixel install + audit",
          "Catalog audit (if applicable)",
          "Performance report",
        ],
      },
      {
        name: "Standard",
        price: "200 tokens",
        tokenCost: 200,
        delivery: "7-day delivery",
        deliveryDays: 7,
        revisions: "2 revisions",
        features: [
          "Everything in Basic",
          "1 video campaign",
          "Custom + lookalike audience setup",
          "Guide to keep up with Meta's current updates",
        ],
      },
      {
        name: "Premium",
        price: "500 tokens",
        tokenCost: 500,
        delivery: "14-day delivery",
        deliveryDays: 14,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "Advanced tracking — Pixel + CAPI",
          "Pixel & CAPI optimization",
          "Full account + competitor audit",
          "5 ad concepts for future campaigns",
        ],
      },
    ],
    faq: [
      startFaq,
      {
        q: "Can you use my existing product photos and videos?",
        a: "Yes — send what you have and we'll direct it into ad creative. If you need new creative, pair this with our Video Creation or Graphic Design service.",
      },
      upgradeFaq,
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media Growth",
    blurb: "Real growth on your pages — audited, planned, and posted for you.",
    description:
      "A full audit of your social pages, a content calendar built to fix what's holding you back, and a monthly report on what's actually working — so your pages grow instead of just sitting there.",
    icon: Share2,
    accessPlatforms: ["Instagram Business account", "Facebook Page"],
    instantCheckout: false,
    requiresWebsite: false,
    applicability: "Works for any business with a website, app, or social pages (existing or new).",
    tint: "bg-[#002D2D]/10",
    ink: "text-[#002D2D]",
    packages: [
      {
        name: "Basic",
        tagline: "Get consistent posting going.",
        price: "800 tokens",
        tokenCost: 800,
        delivery: "14-day management",
        deliveryDays: 14,
        revisions: "1 revision",
        features: [
          "Platform audit — 1 platform",
          "Content calendar",
          "5 fixes from the audit checklist",
          "15 posts, incl. carousels",
          "2 Reels",
          "6-month rolling report with actionable insights",
          "Organic growth best-practices guide",
        ],
      },
      {
        name: "Standard",
        tagline: "Grow with real engagement.",
        price: "1750 tokens",
        tokenCost: 1750,
        delivery: "30-day management",
        deliveryDays: 30,
        revisions: "2 revisions",
        features: [
          "Everything in Basic",
          "Platform audit — 2 platforms",
          "Competitor research",
          "Brand voice & style guide for social",
          "10 fixes from the audit checklist",
          "15 posts, incl. carousels",
          "8 Reels + Stories",
          "Monthly action plan",
        ],
      },
      {
        name: "Premium",
        tagline: "Full multi-platform management.",
        price: "2500 tokens",
        tokenCost: 2500,
        delivery: "30-day management",
        deliveryDays: 30,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "Platform audit — up to 5 platforms",
          "Deeper competitor benchmark",
          "15 fixes from the audit checklist",
          "18 posts, incl. carousels",
          "15 Reels + Stories",
          "Custom organic growth playbook",
          "Ads campaign strategy (recommendations)",
          "Dedicated specialist",
        ],
      },
    ],
    faq: [
      startFaq,
      {
        q: "Do you need admin access to my pages?",
        a: "It helps — with page-manager access we can post and reply directly, which is faster than sending everything to you for manual posting. Completely optional and asked as a separate consent step when you request the study.",
      },
      upgradeFaq,
    ],
  },
  {
    slug: "video-creation",
    name: "Video Creation",
    blurb: "Scroll-stopping video made for your product and audience.",
    description:
      "Concept-to-finish video made for your product and audience — planned, shot or sourced, and edited to stop the scroll on the platform it's built for.",
    icon: Clapperboard,
    accessPlatforms: [],
    instantCheckout: true,
    requiresWebsite: false,
    applicability: "Works for any business, product, app, or service.",
    tint: "bg-accent",
    ink: "text-primary",
    packages: [
      {
        name: "Basic",
        price: "50 tokens",
        tokenCost: 50,
        delivery: "5-day delivery",
        deliveryDays: 5,
        revisions: "1 revision",
        features: ["1 short-form video (up to 30s)", "Concept + script", "1 platform format"],
      },
      {
        name: "Standard",
        price: "200 tokens",
        tokenCost: 200,
        delivery: "8-day delivery",
        deliveryDays: 8,
        revisions: "2 revisions",
        features: ["Everything in Basic", "3 short-form videos", "Multi-platform formats", "Captions + sound design"],
      },
      {
        name: "Premium",
        price: "500 tokens",
        tokenCost: 500,
        delivery: "14-day delivery",
        deliveryDays: 14,
        revisions: "Unlimited in scope",
        features: ["Everything in Standard", "6 videos, batched from one shoot", "Multi-format cutdowns for every platform", "Priority turnaround"],
      },
    ],
    faq: [
      instantStartFaq,
      {
        q: "Do I need to provide footage?",
        a: "No — Standard and Premium include filming or sourcing. For Basic, sending existing footage or product photos keeps delivery fastest.",
      },
      upgradeFaq,
    ],
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    blurb: "Branding, ads and social creative that looks agency-made.",
    description:
      "Branding, ad creative and social graphics designed to one consistent visual identity — so every touchpoint looks deliberate, not thrown together last minute.",
    icon: Palette,
    accessPlatforms: [],
    instantCheckout: true,
    requiresWebsite: false,
    applicability: "Works for any business or app needing brand or social creative.",
    tint: "bg-[#5E8E3E]/10",
    ink: "text-[#5E8E3E]",
    packages: [
      {
        name: "Basic",
        tagline: "A few on-brand graphics to get posting.",
        price: "50 tokens",
        tokenCost: 50,
        delivery: "2-day delivery",
        deliveryDays: 2,
        revisions: "2 revisions",
        features: [
          "3 custom graphics",
          "1 size — IG, FB or LinkedIn",
          "High-res JPG / PNG",
          "Your brand colors & fonts",
        ],
      },
      {
        name: "Standard",
        tagline: "A content pack, ready to schedule.",
        price: "200 tokens",
        tokenCost: 200,
        delivery: "4-day delivery",
        deliveryDays: 4,
        revisions: "3 revisions",
        features: [
          "Everything in Basic",
          "10 custom graphics",
          "Multiple platform sizes",
          "Editable source files (AI / PSD / Canva)",
          "Consistent branded style",
        ],
      },
      {
        name: "Premium",
        tagline: "A full brand pack you can reuse.",
        price: "500 tokens",
        tokenCost: 500,
        delivery: "7-day delivery",
        deliveryDays: 7,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "25 custom graphics",
          "Social media kit — reusable templates",
          "Full brand style sheet",
          "All source files included",
        ],
      },
    ],
    faq: [
      instantStartFaq,
      {
        q: "Do I choose the look and style?",
        a: "Yes — you set the direction in a short brief after ordering (references, vibe, any must-haves) and the designer works to your brand colors and fonts. Send a logo/brand kit if you have one; if not, we'll match what you send.",
      },
      {
        q: "Do you design logos too?",
        a: "Yes — mention it in your brief and it can be scoped into any tier alongside your ad and social creative.",
      },
      upgradeFaq,
    ],
  },
  {
    slug: "geo",
    name: "GEO — AI Search",
    blurb: "Get cited by ChatGPT, Gemini and AI search results.",
    description:
      "Generative Engine Optimization — structuring your content and site so AI answer engines like ChatGPT, Gemini and AI Overviews can find, understand and cite your business when people ask.",
    icon: Sparkles,
    accessPlatforms: ["Google Search Console", "Google Analytics (GA4)"],
    instantCheckout: false,
    requiresWebsite: true,
    applicability: "Requires a live website — AI answer engines need indexable pages to read and cite.",
    tint: "bg-[#002D2D]/10",
    ink: "text-[#002D2D]",
    packages: [
      {
        name: "Basic",
        tagline: "See if AI ever recommends you — and start fixing it.",
        price: "300 tokens",
        tokenCost: 300,
        delivery: "4-day delivery",
        deliveryDays: 4,
        revisions: "1 revision",
        features: [
          "AI visibility check — ChatGPT, Gemini & AI search",
          "AI crawler accessibility check (robots.txt / llms.txt)",
          "5 questions customers ask AI",
          "5 pages rewritten to be quotable",
          "AI-friendly checklist",
          "1 competitor check",
        ],
      },
      {
        name: "Standard",
        tagline: "Get properly set up to be recommended by AI.",
        price: "600 tokens",
        tokenCost: 600,
        delivery: "10-day delivery",
        deliveryDays: 10,
        revisions: "2 revisions",
        features: [
          "Everything in Basic",
          "15 customer questions answered",
          "Up to 15 pages rewritten for AI",
          "Schema + FAQ optimization",
          "llms.txt file created",
          "Competitor check — who AI recommends instead",
          "AI-search action plan / roadmap",
        ],
      },
      {
        name: "Premium",
        price: "1050 tokens",
        tokenCost: 1050,
        delivery: "21-day delivery",
        deliveryDays: 21,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "Up to 30 pages rewritten for AI",
          "Citation tracking report across AI platforms",
          "Competitor AI-visibility check",
          "Dedicated specialist + priority turnaround",
        ],
      },
    ],
    faq: [
      {
        q: "What's the difference between this and SEO?",
        a: "SEO optimizes for Google's search results page. GEO optimizes for AI answers — ChatGPT, Gemini, Perplexity — which read and cite content differently. Most sites need both.",
      },
      startFaq,
      upgradeFaq,
    ],
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    blurb: "Raw footage turned into polished, ready-to-post video.",
    description:
      "Send your raw footage — we handle the cut, pacing, captions, sound and color so it's ready to post, not stuck in a folder.",
    icon: Film,
    accessPlatforms: [],
    instantCheckout: true,
    requiresWebsite: false,
    applicability: "Works for any business or app that has raw footage to edit.",
    tint: "bg-primary/10",
    ink: "text-primary",
    packages: [
      {
        name: "Basic",
        tagline: "A quick, clean cut for one post.",
        price: "50 tokens",
        tokenCost: 50,
        delivery: "2-day delivery",
        deliveryDays: 2,
        revisions: "2 revisions",
        features: [
          "1 video, up to 60 sec",
          "Footage you send in: up to 15 min",
          "Cuts, transitions & music sync",
          "Captions + basic color correction",
          "1 platform export",
        ],
      },
      {
        name: "Standard",
        tagline: "Polished edits across your platforms.",
        price: "200 tokens",
        tokenCost: 200,
        delivery: "4-day delivery",
        deliveryDays: 4,
        revisions: "3 revisions",
        features: [
          "Everything in Basic",
          "3 videos, up to 2–3 min each",
          "Footage you send in: up to 30 min",
          "Full color grading + sound design & mixing",
          "Text overlays",
          "Multi-platform exports (Reels / TikTok / YouTube)",
        ],
      },
      {
        name: "Premium",
        tagline: "A full pack of your best content, in one go.",
        price: "500 tokens",
        tokenCost: 500,
        delivery: "7-day delivery",
        deliveryDays: 7,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "5 videos, up to 3 min each",
          "Footage you send in: up to 45 min per video",
          "Animated titles, lower-thirds & transitions",
          "Cinematic effects + custom thumbnails",
          "Source files included",
        ],
      },
    ],
    faq: [
      instantStartFaq,
      {
        q: "Do I choose the video style?",
        a: "Yes — you set the direction in a short brief after ordering (vibe, pacing, references) and your editor confirms it before starting. Every package covers the editing itself; the style is yours.",
      },
      {
        q: "What footage formats do you accept?",
        a: "Phone footage is fine — send it however you have it (WhatsApp, Drive link, raw files) and we'll work with it.",
      },
      upgradeFaq,
    ],
  },
  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    blurb: "Fully animated videos built from a script — no footage needed.",
    description:
      "Animated explainers and kinetic-text video built from scratch — no filming needed. Send a script or short brief and we animate it to your brand, ready to post or drop into an ad.",
    icon: Shapes,
    accessPlatforms: [],
    instantCheckout: true,
    requiresWebsite: false,
    applicability: "Works for any business or app, even pre-launch with no footage yet.",
    tint: "bg-accent",
    ink: "text-primary",
    packages: [
      {
        name: "Basic",
        tagline: "A punchy animated clip for social.",
        price: "50 tokens",
        tokenCost: 50,
        delivery: "3-day delivery",
        deliveryDays: 3,
        revisions: "2 revisions",
        features: [
          "1 animated video, up to 15 sec",
          "Kinetic text + simple shapes",
          "Built from your script — no footage needed",
          "Licensed music track",
          "1 platform export",
        ],
      },
      {
        name: "Standard",
        tagline: "An illustrated explainer that sells.",
        price: "200 tokens",
        tokenCost: 200,
        delivery: "6-day delivery",
        deliveryDays: 6,
        revisions: "3 revisions",
        features: [
          "Everything in Basic",
          "1 video, up to 60 sec",
          "Custom illustrated graphics + icons",
          "Up to 3 scenes",
          "Captions + sound design",
          "Built to your brand (logo, colors, fonts)",
        ],
      },
      {
        name: "Premium",
        tagline: "A full animated explainer, start to finish.",
        price: "500 tokens",
        tokenCost: 500,
        delivery: "9-day delivery",
        deliveryDays: 9,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "1 video, up to 2 min",
          "Character & scene animation",
          "Multi-scene storyboard",
          "Voiceover + full sound design",
          "Source files included",
        ],
      },
    ],
    faq: [
      instantStartFaq,
      {
        q: "Do I need to send any footage?",
        a: "No — motion graphics videos are animated from scratch. You just send a script or a short brief (plus your logo, colors and fonts if you have them) and we build it.",
      },
      {
        q: "What's the difference between this and Video Editing?",
        a: "Video Editing cuts footage you already have into a finished video. Motion Graphics has no footage — it's fully animated from a script, for explainers, ads and kinetic-text posts.",
      },
      upgradeFaq,
    ],
  },
  {
    slug: "ai-chatbot",
    name: "AI Service Request Chatbot",
    blurb: "An AI chatbot on Meta and WhatsApp that qualifies requests while you sleep.",
    description:
      "An AI-powered chatbot for Meta (Facebook/Instagram) and WhatsApp that answers common questions, qualifies service requests, and hands off to a human when it can't help — so leads aren't waiting on office hours.",
    icon: MessageCircle,
    accessPlatforms: ["Meta Business Suite", "WhatsApp Business"],
    instantCheckout: true,
    requiresWebsite: false,
    applicability: "Works with your Meta (Facebook/Instagram) and WhatsApp Business accounts — no website needed.",
    tint: "bg-primary/10",
    ink: "text-primary",
    packages: [
      {
        name: "Basic",
        tagline: "One platform, live and answering.",
        price: "$50",
        tokenCost: 50,
        delivery: "5-day delivery",
        deliveryDays: 5,
        revisions: "1 revision",
        features: [
          "1 chatbot — Meta (FB/IG) or WhatsApp",
          "Trained on your services, pricing & FAQs",
          "Collects name, need and contact details",
          "Hands off to a human for anything it can't answer",
        ],
      },
      {
        name: "Standard",
        tagline: "Both platforms, working together.",
        price: "$200",
        tokenCost: 200,
        delivery: "8-day delivery",
        deliveryDays: 8,
        revisions: "2 revisions",
        features: [
          "Everything in Basic",
          "2 platforms — Meta (FB/IG) + WhatsApp",
          "Quick-reply menu for common requests",
          "2 weeks of post-launch tuning",
        ],
      },
      {
        name: "Premium",
        tagline: "A fully tuned chatbot across both platforms.",
        price: "$500",
        tokenCost: 500,
        delivery: "14-day delivery",
        deliveryDays: 14,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "Multi-language replies",
          "Escalation rules + priority routing to your team",
          "Monthly performance report",
          "Dedicated specialist + priority turnaround",
        ],
      },
    ],
    faq: [
      {
        q: "How is this priced — is it really $50?",
        a: "Basic is a single chatbot on one platform (Meta or WhatsApp) for $50, billed as tokens like every other service. Covering both platforms or adding tuning and reporting moves you into Standard or Premium.",
      },
      {
        q: "Does it just auto-reply, or actually qualify leads?",
        a: "It's trained on your services, pricing and FAQs so it can answer real questions and collect the details your team needs — not just a canned greeting. Anything it can't handle is handed off to a human.",
      },
      instantStartFaq,
      upgradeFaq,
    ],
  },
  {
    slug: "website-development",
    name: "Website Development",
    blurb: "A fast, modern website built to convert — not just look nice.",
    description:
      "A responsive, conversion-ready website built from scratch or rebuilt from what you have — pages that load fast, work on mobile, and give customers a clear reason to buy or enquire.",
    icon: Globe,
    accessPlatforms: [],
    instantCheckout: true,
    requiresWebsite: false,
    applicability: "Works for any business needing a new site or a rebuild of an outdated one.",
    tint: "bg-primary/10",
    ink: "text-primary",
    packages: [
      {
        name: "Basic",
        tagline: "A clean, fast landing page.",
        price: "$50",
        tokenCost: 50,
        delivery: "5-day delivery",
        deliveryDays: 5,
        revisions: "1 revision",
        features: [
          "1-page responsive site",
          "Mobile-optimized",
          "Contact form",
          "Basic on-page SEO setup",
        ],
      },
      {
        name: "Standard",
        tagline: "A full multi-page site.",
        price: "$200",
        tokenCost: 200,
        delivery: "10-day delivery",
        deliveryDays: 10,
        revisions: "2 revisions",
        features: [
          "Everything in Basic",
          "Up to 5 pages",
          "CMS for easy updates",
          "Analytics setup (GA4)",
          "Speed-optimized build",
        ],
      },
      {
        name: "Premium",
        tagline: "A full site, built to scale.",
        price: "$500",
        tokenCost: 500,
        delivery: "18-day delivery",
        deliveryDays: 18,
        revisions: "Unlimited in scope",
        features: [
          "Everything in Standard",
          "Up to 10 pages",
          "E-commerce or booking integration",
          "Custom design system",
          "Dedicated specialist + priority turnaround",
        ],
      },
    ],
    faq: [
      {
        q: "How is this priced — is it really $50?",
        a: "Basic is a single responsive landing page for $50, billed as tokens like every other service. More pages, a CMS, or e-commerce/booking integration move you into Standard or Premium.",
      },
      {
        q: "Do I need to already have a domain or hosting?",
        a: "No — if you don't have either yet, we'll guide you through getting them. If you already have a domain, we build and point the new site to it.",
      },
      instantStartFaq,
      upgradeFaq,
    ],
  },
];

const DEFAULT_TINT = "bg-secondary";
const DEFAULT_INK = "text-primary";

type ServiceOverrideRow = {
  slug: string;
  active: boolean;
  name: string | null;
  blurb: string | null;
  description: string | null;
  applicability: string | null;
  icon: string | null;
  accessPlatforms: unknown;
  requiresWebsite: boolean | null;
  instantCheckout: boolean | null;
  faq: unknown;
  packages: unknown;
};

function mergeService(base: Service | null, override: ServiceOverrideRow | null): Service | null {
  if (!base && !override) return null;
  if (!override) return base;
  if (override.active === false) return null;

  const packages = (override.packages as [PackageTier, PackageTier, PackageTier] | null) ?? base?.packages;
  if (!packages) return null; // a DB-only service with no packages yet isn't ready to show

  const resolvedIcon = override.icon ? ICON_OPTIONS[override.icon] : undefined;

  return {
    slug: override.slug,
    name: override.name ?? base?.name ?? override.slug,
    blurb: override.blurb ?? base?.blurb ?? "",
    description: override.description ?? base?.description ?? "",
    icon: resolvedIcon ?? base?.icon ?? ICON_OPTIONS[DEFAULT_ICON_KEY],
    tint: base?.tint ?? DEFAULT_TINT,
    ink: base?.ink ?? DEFAULT_INK,
    packages,
    faq: (override.faq as FaqItem[] | null) ?? base?.faq ?? [],
    accessPlatforms: (override.accessPlatforms as string[] | null) ?? base?.accessPlatforms ?? [],
    requiresWebsite: override.requiresWebsite ?? base?.requiresWebsite ?? false,
    applicability: override.applicability ?? base?.applicability ?? "",
    instantCheckout: override.instantCheckout ?? base?.instantCheckout ?? false,
  };
}

/** All services visible on the public site — static catalog with admin overrides applied,
 *  plus any admin-created services, minus anything deactivated. Cached per-request. */
export const listServices = cache(async (): Promise<Service[]> => {
  const overrides = await prisma.serviceOverride.findMany();
  const overrideBySlug = new Map(overrides.map((o) => [o.slug, o]));

  const merged = STATIC_SERVICES.map((base) => mergeService(base, overrideBySlug.get(base.slug) ?? null)).filter(
    (s): s is Service => s !== null,
  );

  const staticSlugs = new Set(STATIC_SERVICES.map((s) => s.slug));
  const custom = overrides
    .filter((o) => !staticSlugs.has(o.slug))
    .map((o) => mergeService(null, o))
    .filter((s): s is Service => s !== null);

  return [...merged, ...custom];
});

export const getServiceBySlug = cache(async (slug: string): Promise<Service | undefined> => {
  const override = await prisma.serviceOverride.findUnique({ where: { slug } });
  const base = STATIC_SERVICES.find((s) => s.slug === slug) ?? null;
  return mergeService(base, override) ?? undefined;
});

// --- Admin ---

export type ServiceListItem = Service & { isCustom: boolean; overrideActive: boolean };

function forceActive(row: ServiceOverrideRow | null): ServiceOverrideRow | null {
  return row ? { ...row, active: true } : null;
}

/** Every service for the admin catalog view, including inactive ones, with source flags. */
export async function listServicesForAdmin(): Promise<ServiceListItem[]> {
  const overrides = await prisma.serviceOverride.findMany({ orderBy: { createdAt: "asc" } });
  const overrideBySlug = new Map(overrides.map((o) => [o.slug, o]));

  const items: ServiceListItem[] = [];
  for (const base of STATIC_SERVICES) {
    const override = overrideBySlug.get(base.slug) ?? null;
    const merged = mergeService(base, forceActive(override)) ?? base;
    items.push({ ...merged, isCustom: false, overrideActive: override?.active ?? true });
  }
  const staticSlugs = new Set(STATIC_SERVICES.map((s) => s.slug));
  for (const override of overrides) {
    if (staticSlugs.has(override.slug)) continue;
    const merged = mergeService(null, forceActive(override));
    if (merged) items.push({ ...merged, isCustom: true, overrideActive: override.active });
  }
  return items;
}

export async function getServiceOverride(slug: string) {
  return prisma.serviceOverride.findUnique({ where: { slug } });
}

export function isStaticServiceSlug(slug: string) {
  return STATIC_SERVICES.some((s) => s.slug === slug);
}

export type ServiceOverrideInput = {
  slug: string;
  active: boolean;
  name?: string;
  blurb?: string;
  description?: string;
  applicability?: string;
  icon?: string;
  accessPlatforms?: string[];
  requiresWebsite?: boolean;
  instantCheckout?: boolean;
  faq?: FaqItem[];
  packages: [PackageTier, PackageTier, PackageTier];
};

export async function upsertServiceOverride(input: ServiceOverrideInput) {
  const data = {
    active: input.active,
    name: input.name ?? null,
    blurb: input.blurb ?? null,
    description: input.description ?? null,
    applicability: input.applicability ?? null,
    icon: input.icon ?? null,
    accessPlatforms: input.accessPlatforms ?? undefined,
    requiresWebsite: input.requiresWebsite ?? null,
    instantCheckout: input.instantCheckout ?? null,
    faq: input.faq ?? undefined,
    packages: input.packages,
  };
  return prisma.serviceOverride.upsert({
    where: { slug: input.slug },
    create: { slug: input.slug, ...data },
    update: data,
  });
}

export async function deleteServiceOverride(slug: string) {
  if (isStaticServiceSlug(slug)) {
    throw new Error("Cannot delete a built-in service — deactivate it instead.");
  }
  return prisma.serviceOverride.delete({ where: { slug } });
}
