import { Clock, MessageCircle, Wallet } from "lucide-react";
import { SectionBadge } from "@/components/site/section-badge";

const COMPARISONS = [
  {
    icon: Clock,
    label: "Time",
    agency: "Weeks of onboarding calls before anything actually ships.",
    us: "Request a free brand study, pick your option, work starts the same week.",
  },
  {
    icon: Wallet,
    label: "Cost",
    agency: "A retainer from day one, whether you need 40 hours or 4.",
    us: "One fixed price per package — you pay for the deliverable, not the overhead.",
  },
  {
    icon: MessageCircle,
    label: "Communication",
    agency: "Your brief passes through an account manager before it reaches whoever does the work.",
    us: "You talk straight to the expert doing your work, every time.",
  },
];

export function AgencyProblem() {
  return (
    <section className="border-border border-t px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionBadge index={3} label="Why not just hire an agency?" />
        <h2
          className="font-heading max-w-lg font-medium tracking-[-0.02em]"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.12 }}
        >
          The 3 things that make agencies painful — gone.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {COMPARISONS.map(({ icon: Icon, label, agency, us }) => (
            <div key={label} className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-5">
              <span className="bg-accent text-primary flex size-9 items-center justify-center rounded-full">
                <Icon className="size-4" />
              </span>
              <p className="text-eyebrow">{label}</p>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground line-through decoration-1">{agency}</p>
                <p className="text-foreground font-medium">{us}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
