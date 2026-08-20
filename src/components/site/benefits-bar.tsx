import Link from "next/link";
import { BadgeCheck, Wallet, Zap, MessageCircle } from "lucide-react";

// Expert Desk's real value props (adapted from the Fiverr "Make it all happen" row, but
// true to this product: real experts, fixed prices, fast, direct).
const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "Real experts, every service",
    desc: "A specialist does the work — not AI, not juniors.",
  },
  {
    icon: Wallet,
    title: "Fixed price per package",
    desc: "No retainers, no surprise invoices. Pay only for what you order.",
  },
  {
    icon: Zap,
    title: "Work starts this week",
    desc: "Brief it in one form and delivery begins, with a clear deadline.",
  },
  {
    icon: MessageCircle,
    title: "Talk to the person doing it",
    desc: "No account managers in the middle — straight to your expert.",
  },
];

export function BenefitsBar() {
  return (
    <section className="border-border border-t px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="border-border flex flex-col items-start justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
          <h2
            className="font-heading font-medium tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.35rem, 3vw, 2rem)", lineHeight: 1.15 }}
          >
            Everything you need to grow — handled.
          </h2>
          <Link
            href="/services"
            className="bg-foreground text-background shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3">
              <span className="bg-secondary text-primary flex size-10 items-center justify-center rounded-xl">
                <Icon className="size-5" />
              </span>
              <p className="font-medium">{title}</p>
              <p className="text-muted-foreground text-sm text-pretty">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
