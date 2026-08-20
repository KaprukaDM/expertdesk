"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ArrowUpRight } from "lucide-react";
import { SectionBadge } from "@/components/site/section-badge";
import type { Service } from "@/lib/service-types";

// icon is a component reference and can't cross the server -> client boundary as a prop.
export type ServiceCard = Omit<Service, "icon">;

export function ServicesGrid({ services }: { services: ServiceCard[] }) {
  const searchParams = useSearchParams();
  // Seed from the hero search's ?q=, then filter live as the user types — no submit needed.
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const query = q.trim().toLowerCase();

  const filtered = query
    ? services.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.blurb.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query),
      )
    : services;

  return (
    <section id="services" className="border-border scroll-mt-24 border-t px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionBadge index={2} label={`${services.length} services, one team`} />
        <h2
          className="font-heading max-w-lg font-medium tracking-[-0.02em]"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.12 }}
        >
          Every marketing service, one expert away.
        </h2>

        <div className="border-border bg-card shadow-xs mt-6 flex max-w-md items-center gap-2 rounded-full border p-1.5 pl-4">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            name="q"
            autoComplete="off"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services…"
            aria-label="Search services"
            className="text-foreground placeholder:text-muted-foreground focus-visible:ring-ring/50 min-w-0 flex-1 rounded-full bg-transparent text-sm focus:outline-none focus-visible:ring-3"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="text-muted-foreground hover:text-foreground pr-2 text-xs font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {query && (
          <p className="text-muted-foreground mt-3 text-sm">
            {filtered.length
              ? `Showing ${filtered.length} result${filtered.length > 1 ? "s" : ""} for "${q.trim()}"`
              : `No services match "${q.trim()}".`}
          </p>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="border-border bg-card shadow-xs group flex flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg"
            >
              <div className="bg-gradient-to-br from-[#008060] to-[#002D2D] p-4">
                <p className="font-heading font-semibold leading-tight text-white">{service.name}</p>
                <p className="mt-1 font-mono text-xs text-white/70">From {service.packages[0].price}</p>
              </div>
              <div className="relative aspect-[5/4] overflow-hidden bg-white">
                <Image
                  src={`/services/${service.slug}.png`}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <ArrowUpRight className="text-foreground/40 absolute right-3 top-3 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-muted-foreground flex-1 p-4 text-sm text-pretty">{service.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
