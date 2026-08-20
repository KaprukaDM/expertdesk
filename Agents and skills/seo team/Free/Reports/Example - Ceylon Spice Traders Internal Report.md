# Ceylon Spice Traders — SEO Brand Study (Internal Report)

## Site-Type Classification

**E-commerce**, secondary **Content/Publisher** signal (an active recipe/education blog exists but isn't structurally connected to product pages). Site sells whole spices, tea, and gift hampers direct-to-consumer, ships internationally, WooCommerce storefront, ~340 product URLs across 6 categories. Classification drives weighting toward `seo-ecommerce` and `seo-schema`, with `seo-cluster`/`seo-content` in support for the blog's untapped authority value.

## Technical Audit (`seo-technical`)

- Site is crawlable, robots.txt is clean, but **112 of 340 product pages return a 200 while carrying a `noindex` tag left over from a 2025 staging migration** — the single largest ranking blocker on the site
- Category pages use `?sort=` and `?filter=` query parameters without canonical tags, creating an estimated 800+ duplicate-content URL variants Google is currently crawling
- Mobile rendering is clean; no JS-rendering issues found on product or category templates
- **[Quick]** Strip the stale `noindex` tags, **[Quick]** add self-referencing canonicals to filtered category URLs

## Core Web Vitals / Performance (`seo-performance`)

- LCP on category pages averages 3.9s (mobile) — driven by unoptimized hero banner images (avg. 1.4MB, no WebP, no lazy-load below the fold)
- CLS is stable (0.04) — no layout-shift issues
- **[Medium]** Convert hero banners to WebP + lazy-load below-fold images — realistic path to sub-2.5s LCP

## On-Page & Content Audit (`seo-content`)

- Product descriptions are largely manufacturer-boilerplate, duplicated near-verbatim across 40+ SKUs in the same category (e.g., all 12 cinnamon-stick variants share one paragraph)
- Title tags follow `{Product Name} | Ceylon Spice Traders` with no commercial-intent modifiers ("buy," "organic," "wholesale") that competitors are ranking on
- The blog (18 posts, genuinely well-written recipe content) has zero internal links pointing to the product pages it's implicitly selling
- **[Involved]** Rewrite the top 40 highest-traffic-potential product descriptions with unique, keyword-aware copy
- **[Quick]** Add 2-3 contextual product links into each existing blog post

## Structured Data Audit (`seo-schema`)

- `Product` schema is present but **missing `aggregateRating` and `review` properties** on all 340 products despite the site genuinely having customer reviews (via a third-party widget that isn't schema-connected) — this is actively costing star-rating rich results competitors are winning
- No `BreadcrumbList` schema anywhere on the site
- **[Quick]** Connect the review widget's data into `Product` schema, **[Quick]** add `BreadcrumbList` site-wide via the theme's template

## Keyword & Topical Gap (`seo-cluster`)

- Site ranks for its own brand name and a handful of exact long-tail SKU names, but not for the head terms driving category volume ("ceylon cinnamon sticks," "organic ceylon tea gift set")
- SERP-overlap clustering surfaces 6 content gaps where a hub page (e.g., "Ceylon Cinnamon: True vs. Cassia Guide") could unify 4-5 existing blog posts and 8+ product pages into one topical cluster — currently these compete against each other instead of reinforcing one target page
- **[Involved]** Build the hub page + internal-link the cluster together

## Backlink Profile (`seo-backlinks`)

- Domain authority is modest; the link profile is almost entirely directory/marketplace listings (Etsy-style aggregators), with no editorial coverage
- 3 competitors in the category have been covered by food/lifestyle publications the site has never pitched
- **[Involved — target list, not delivered links]** Prioritized outreach target list: 8 food/lifestyle sites with existing coverage of comparable brands, ranked by realistic acquisition likelihood

## Sitemap / Indexation (`seo-sitemap`)

- XML sitemap exists and validates, but hasn't been resubmitted since the 2025 migration — still lists 30+ retired product URLs as live
- **[Quick]** Regenerate and resubmit sitemap

## Search Experience (`seo-sxo`)

- For "ceylon tea gift set," the top 3 ranking pages are all gift-guide/roundup content, not single-product pages — the site's product-only pages structurally can't compete for that query as currently built
- **[Medium]** Build a "Gift Sets" landing/roundup page matching the intent actually ranking

## E-commerce Audit (`seo-ecommerce`)

- No Google Merchant Center feed connected — zero Shopping placement despite eligible products
- Category page structure is reasonable; breadcrumb depth is consistent
- **[Involved]** Set up product feed + Merchant Center connection

## SWOT

- **Strengths**: Genuinely good blog content nobody else in the category has; clean technical foundation once the migration debris is cleared
- **Weaknesses**: Duplicated product copy; schema not connected to real review data; blog and product catalog operating as two disconnected sites
- **Opportunities**: Zero Shopping presence is a wide-open channel; the cinnamon/cassia content cluster nobody else owns
- **Threats**: Competitors already winning star-rating rich results and gift-guide SERP real estate

## Fix Checklist (prioritized)

**Technical (5)**: strip stale noindex tags · canonical filtered URLs · connect review schema · add BreadcrumbList · resubmit sitemap

**Page/Content (6)**: rewrite top 40 product descriptions · add commercial-intent title tag modifiers · WebP + lazy-load hero images · build cinnamon/cassia hub page · internal-link blog → products · build Gift Sets landing page

**Link/Authority (2)**: outreach target list (8 sites) · Merchant Center feed setup

Total: 13 fixes identified.
