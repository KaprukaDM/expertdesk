"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { CtaButton } from "@/components/site/cta-button";
import { SiteHeader } from "@/components/site/site-header";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST_ITEMS = [
  { label: "No retainers", detail: "Fixed price per package" },
  { label: "Work starts within days", detail: "No discovery calls" },
  { label: "Direct line to your expert", detail: "No account managers" },
];

export function LandingHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { data: session, status } = useSession();
  const authed = status === "authenticated";
  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/services?q=${encodeURIComponent(q)}` : "/services");
  }

  return (
    <section className="bg-background relative flex flex-col overflow-hidden">
      <SiteHeader />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 sm:py-16 lg:flex-row lg:items-start">
        <div className="max-w-lg space-y-6 lg:shrink-0">
          <motion.span
            className="bg-secondary text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <span className="bg-primary size-1.5 rounded-full" />
            Built for Sri Lankan SMEs
          </motion.span>

          <motion.h1
            className="font-heading text-foreground text-balance font-semibold tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)", lineHeight: 1.08 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            Get expert marketing without the <span className="text-primary">agency cost.</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground max-w-md text-lg text-pretty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            Real experts. Fixed prices. Work starts this week — no retainers, no runaround.
          </motion.p>

          <motion.form
            onSubmit={onSearch}
            className="border-border bg-card flex items-center gap-2 rounded-full border p-2 pl-5 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          >
            <input
              name="q"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a service…"
              aria-label="Search services"
              className="text-foreground placeholder:text-muted-foreground focus-visible:ring-ring/50 min-w-0 flex-1 rounded-full bg-transparent text-sm focus:outline-none focus-visible:ring-3"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-opacity hover:opacity-90"
            >
              <Search className="size-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          >
            {authed ? (
              <CtaButton href={dashboardHref} size="lg">
                Go to dashboard
              </CtaButton>
            ) : (
              <CtaButton href="/services" size="lg">
                Explore services
              </CtaButton>
            )}
          </motion.div>

          <motion.div
            className="border-border grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3 lg:grid-cols-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          >
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span className="bg-secondary text-primary flex size-7 shrink-0 items-center justify-center rounded-full">
                  <ShieldCheck className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm leading-tight font-medium">{item.label}</p>
                  <p className="text-muted-foreground text-xs leading-tight">{item.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="w-full lg:flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <Image
              src="/hero-photo.jpg"
              alt="Sri Lankan small business owners working with their marketing specialists"
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <p className="text-muted-foreground mt-2 text-center text-xs">
            Example results shown for illustration — not guaranteed outcomes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
