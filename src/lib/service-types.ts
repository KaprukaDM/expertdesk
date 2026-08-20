// Types and constants shared between server-side catalog logic (src/lib/services.ts, which
// touches Prisma) and client components (e.g. the admin service editor). Keep this file free of
// server-only imports (prisma, fs, etc.) so client components can import it directly.
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
  Package,
  Globe,
  type LucideIcon,
} from "lucide-react";

export type PackageTier = {
  name: "Basic" | "Standard" | "Premium";
  tagline?: string;
  price: string;
  tokenCost: number;
  delivery: string;
  deliveryDays: number;
  revisions: string;
  features: string[];
};

export type FaqItem = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  icon: LucideIcon;
  tint: string;
  ink: string;
  packages: [PackageTier, PackageTier, PackageTier];
  faq: FaqItem[];
  /** Platforms the specialist would benefit from view-only access to, for a more accurate
   *  brand study — asked as an optional consent step when requesting. Empty for services that
   *  don't touch a live account (pure creative/deliverable work). */
  accessPlatforms: string[];
  /** Whether this service needs a live website to work (e.g. SEO/GEO optimize existing pages). */
  requiresWebsite: boolean;
  /** One-line note on what kind of business this service fits, shown as a key callout on the service page. */
  applicability: string;
  /** True for catalog-priced deliverable work (video/graphics/copy) where scope is fixed by
   *  count/length, not by researching the customer's business — these skip the brand-study
   *  wait and go straight to checkout. False for services whose scope depends on an audit
   *  (SEO, ads, CRO, GEO) or an existing account/audience (Social Media Management). */
  instantCheckout: boolean;
};

// Icons an admin can pick for a brand-new (DB-only) service. Keyed by name so it can be stored
// as a plain string in ServiceOverride.icon.
export const ICON_OPTIONS: Record<string, LucideIcon> = {
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
  Package,
  Globe,
};
export const DEFAULT_ICON_KEY = "Package";
