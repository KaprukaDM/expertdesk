import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { SectionBadge } from "@/components/site/section-badge";
import { getServiceBySlug } from "@/lib/services";

// Curated running order for the home page. Every card uses ONE standard treatment — a Kapruka
// purple header + a light panel showing the service's own icon — so the row reads as one
// consistent set (no external images, self-contained and licence-free).
const POPULAR_SLUGS = [
  "seo",
  "google-ads",
  "meta-ads",
  "video-editing",
  "graphic-design",
  "motion-graphics",
  "geo",
];

export async function PopularServices() {
  const resolved = await Promise.all(POPULAR_SLUGS.map((slug) => getServiceBySlug(slug)));
  const cards = resolved.filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section className="border-border border-t px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionBadge index={2} label="Popular services" />
            <h2
              className="font-heading max-w-lg font-medium tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.12 }}
            >
              Start with what most businesses need first.
            </h2>
          </div>
          <Link
            href="/services"
            className="text-primary hidden shrink-0 items-center gap-1 text-sm font-medium sm:inline-flex"
          >
            View all
            <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {cards.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="border-border bg-card shadow-xs group flex w-[210px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg"
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
                  sizes="220px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <ArrowUpRight className="text-foreground/40 absolute right-3 top-3 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
