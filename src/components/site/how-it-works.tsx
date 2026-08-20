import { SectionBadge } from "@/components/site/section-badge";

const BRAND_STUDY_STEPS = [
  {
    step: "Step 1",
    title: "Send one message, get 3 proposals",
    detail: "A specialist researches your business and sends back three tailored packages — priced and scoped for you specifically.",
  },
  {
    step: "Step 2",
    title: "Pick the package that fits",
    detail: "Choose one of the three options. Tokens are only charged once you pick — no discovery calls needed.",
  },
  {
    step: "Step 3",
    title: "Work starts, delivered on schedule",
    detail: "Your specialist gets to work on the agreed scope and delivers by the deadline shown for that package.",
  },
];

// This service's pricing is fixed by count/length, not by a business audit — so there's
// nothing for a brand study to change. Skip straight to picking a package.
const INSTANT_STEPS = [
  {
    step: "Step 1",
    title: "Pick a package — priced upfront",
    detail: "Fixed pricing based on scope (count, length), not a business audit — so there's no research step to wait on.",
  },
  {
    step: "Step 2",
    title: "Work starts right away",
    detail: "Tokens are charged when you buy, then delivery begins — no discovery calls, no waiting on a brief.",
  },
];

/** Shared on the homepage and every gig page — one consistent explanation of the mechanism,
 *  written once instead of drifting between two versions of the same steps. Gig pages for
 *  instant-checkout services (fixed-scope creative work) pass variant="instant" since the
 *  brand-study framing doesn't apply to them. */
export function HowItWorks({ index = 1, variant = "brand-study" }: { index?: number; variant?: "brand-study" | "instant" }) {
  const steps = variant === "instant" ? INSTANT_STEPS : BRAND_STUDY_STEPS;
  return (
    <div>
      <h2 className="sr-only">How it works</h2>
      <SectionBadge index={index} label="How it works" />
      <div className={`grid gap-4 sm:grid-cols-2 ${steps.length >= 3 ? "lg:grid-cols-3" : ""}`}>
        {steps.map(({ step, title, detail }) => (
          <div key={step} className="border-border bg-card space-y-1.5 rounded-2xl border p-5">
            <p className="text-primary text-xs font-semibold tracking-wide uppercase">{step}</p>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-muted-foreground text-sm text-pretty">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
