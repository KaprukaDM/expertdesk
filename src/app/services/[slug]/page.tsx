import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowUpRight, Star, Check, Globe, CircleCheck, Clock, RotateCcw } from "lucide-react";
import { auth } from "@/lib/auth";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RequestBrandStudyForm } from "@/components/site/request-brand-study-form";
import { BuyPackageForm } from "@/components/site/buy-package-form";
import { HowItWorks } from "@/components/site/how-it-works";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { listServices, getServiceBySlug } from "@/lib/services";
import { estimateLkr } from "@/lib/tokenConstants";

export async function generateStaticParams() {
  const services = await listServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} — Expert Desk`,
    description: service.blurb,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const session = await auth();
  const allServices = await listServices();
  const related = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <main className="flex-1">
        <SiteHeader />

        <div className="mx-auto max-w-5xl px-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
          <nav className="text-muted-foreground mb-6 flex items-center gap-2 text-xs">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{service.name}</span>
          </nav>

          {/* Explicit grid placement so desktop keeps [intro | sidebar] over [details | sidebar],
              while the single-column mobile stack becomes intro → CTA → details. Without this
              the <aside> fell after ~2.4 screens of content on a phone. */}
          <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[1fr_340px]">
            <div className="order-1 min-w-0 space-y-4 lg:order-none lg:col-start-1 lg:row-start-1">
              <h1
                className="font-heading font-semibold tracking-[-0.02em] text-balance"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.1 }}
              >
                {service.name} — done for you, by a real specialist.
              </h1>
              <p className="text-muted-foreground max-w-lg text-base text-pretty">{service.description}</p>
              <div
                className={`flex max-w-lg items-start gap-2 rounded-xl border px-3.5 py-2.5 text-sm ${
                  service.requiresWebsite
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200"
                    : "border-border bg-secondary text-muted-foreground"
                }`}
              >
                {service.requiresWebsite ? (
                  <Globe className="mt-0.5 size-4 shrink-0" />
                ) : (
                  <CircleCheck className="mt-0.5 size-4 shrink-0" />
                )}
                <span className="text-pretty">{service.applicability}</span>
              </div>
            </div>

            <div className="order-3 min-w-0 space-y-10 lg:order-none lg:col-start-1 lg:row-start-2">
              <div className="border-border bg-secondary relative aspect-[2/1] overflow-hidden rounded-2xl border">
                <Image
                  src={`/services/${service.slug}.png`}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>

              <HowItWorks variant={service.instantCheckout ? "instant" : "brand-study"} />

              <Tabs defaultValue="compare">
                <TabsList className="w-full sm:w-fit">
                  <TabsTrigger value="compare">Compare packages</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="compare" className="pt-6">
                  <p className="text-muted-foreground mb-4 text-sm">
                    {service.instantCheckout
                      ? "Fixed pricing — pay with tokens and work starts right away, no brand study needed."
                      : "A starting point — your actual brief and pricing are tailored to your business after the free brand study."}
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {service.packages.map((tier, i) => {
                      const featured = i === 1; // Standard is always the highlighted middle option.
                      return (
                        <div
                          key={tier.name}
                          className={`flex min-w-0 flex-col gap-5 rounded-2xl border p-6 ${
                            featured ? "border-primary bg-secondary" : "border-border bg-card"
                          }`}
                        >
                          <div className="space-y-3">
                            {featured && (
                              <span className="bg-primary text-primary-foreground inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase">
                                Most popular
                              </span>
                            )}
                            <h3 className="font-heading text-muted-foreground text-sm font-medium tracking-wide uppercase">
                              {tier.name}
                            </h3>
                            <div className="space-y-0.5">
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-mono text-2xl font-semibold tabular-nums">{tier.tokenCost}</span>
                                <span className="text-muted-foreground text-sm">tokens</span>
                              </div>
                              <p className="text-muted-foreground text-sm">≈ {estimateLkr(tier.tokenCost)}</p>
                            </div>
                            {tier.tagline && (
                              <p className="text-muted-foreground text-sm text-pretty">{tier.tagline}</p>
                            )}
                          </div>

                          <div className="border-border flex flex-wrap items-center gap-x-4 gap-y-1.5 border-y py-3 text-xs">
                            <span className="text-muted-foreground flex min-w-0 items-center gap-1.5">
                              <Clock className="size-3.5 shrink-0" />
                              <span className="truncate">{tier.delivery}</span>
                            </span>
                            <span className="text-muted-foreground flex min-w-0 items-center gap-1.5">
                              <RotateCcw className="size-3.5 shrink-0" />
                              <span className="truncate">{tier.revisions}</span>
                            </span>
                          </div>

                          <ul className="flex-1 space-y-3 text-sm">
                            {tier.features.map((feature, fi) => (
                              <li key={feature} className="flex items-start gap-2.5">
                                <Check className="text-primary mt-0.5 size-4 shrink-0" />
                                <span className={`text-pretty ${fi === 0 && i > 0 ? "font-semibold" : ""}`}>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href={`?package=${encodeURIComponent(tier.name)}#${service.instantCheckout ? "buy-form" : "brand-study-form"}`}
                            className={`block rounded-full px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                              featured
                                ? "bg-primary text-primary-foreground hover:opacity-90"
                                : i === 2
                                  ? "bg-foreground text-background hover:opacity-90"
                                  : "border-border hover:border-primary/40 hover:bg-secondary border"
                            }`}
                          >
                            {service.instantCheckout ? `Buy the ${tier.name} package` : `Get the ${tier.name} package`}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="pt-6">
                  <div className="border-border divide-border divide-y rounded-2xl border">
                    {service.faq.map((item) => (
                      <details key={item.q} className="group px-5 py-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                          {item.q}
                          <span className="text-muted-foreground shrink-0 text-lg leading-none group-open:hidden">+</span>
                          <span className="text-muted-foreground hidden shrink-0 text-lg leading-none group-open:inline">
                            −
                          </span>
                        </summary>
                        <p className="text-muted-foreground mt-3 text-sm text-pretty">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="pt-6">
                  <div className="border-border bg-card flex flex-col items-center gap-2 rounded-2xl border p-10 text-center">
                    <Star className="text-muted-foreground size-6" />
                    <p className="text-sm font-medium">No reviews yet</p>
                    <p className="text-muted-foreground max-w-xs text-sm text-pretty">
                      {service.name} is newly launched — reviews will appear here once clients complete their first
                      orders.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* order-2 puts this right after the H1 on mobile — previously it fell after
                ~2.4 screens of "How you'll work with us" / Compare / FAQ content. */}
            <aside className="order-2 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <Suspense fallback={null}>
                {service.instantCheckout ? (
                  <BuyPackageForm
                    serviceSlug={service.slug}
                    serviceName={service.name}
                    isAuthenticated={Boolean(session?.user?.id)}
                    packages={service.packages.map((p) => ({ name: p.name, price: p.price, delivery: p.delivery }))}
                  />
                ) : (
                  <RequestBrandStudyForm
                    serviceSlug={service.slug}
                    serviceName={service.name}
                    priceRangeHint={`${estimateLkr(service.packages[0].tokenCost)} – ${estimateLkr(service.packages[2].tokenCost)}`}
                    isAuthenticated={Boolean(session?.user?.id)}
                    accessPlatforms={service.accessPlatforms}
                  />
                )}
              </Suspense>
            </aside>
          </div>

          <div className="mt-16">
            <h2 className="font-heading mb-5 text-xl font-medium">Other services</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="border-border bg-card group flex flex-col gap-3 overflow-hidden rounded-2xl border transition-shadow hover:shadow-md"
                >
                  <div className="border-border bg-secondary relative aspect-[2/1] overflow-hidden border-b">
                    <Image
                      src={`/services/${r.slug}.png`}
                      alt={r.name}
                      fill
                      sizes="(min-width: 1024px) 240px, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5 pt-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading text-sm font-medium">{r.name}</h3>
                      <ArrowUpRight className="text-muted-foreground size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="text-muted-foreground text-xs text-pretty">{r.blurb}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
