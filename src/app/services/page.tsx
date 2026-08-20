import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { ServicesGrid } from "@/components/site/services-grid";
import { SiteFooter } from "@/components/site/site-footer";
import { listServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — Expert Desk",
  description: "SEO, ads, content, design and video — done by real experts on fixed, priced packages.",
};

export default async function ServicesPage() {
  const services = (await listServices()).map(({ icon: _icon, ...rest }) => rest);
  return (
    <>
      <main className="flex-1">
        <SiteHeader />
        <Suspense fallback={null}>
          <ServicesGrid services={services} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
