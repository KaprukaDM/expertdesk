import { LandingHero } from "@/components/site/landing-hero";
import { ProofStrip } from "@/components/site/proof-strip";
import { HowItWorks } from "@/components/site/how-it-works";
import { PopularServices } from "@/components/site/popular-services";
import { BenefitsBar } from "@/components/site/benefits-bar";
import { AgencyProblem } from "@/components/site/agency-problem";
import { SiteFooter } from "@/components/site/site-footer";

export default function LandingPage() {
  return (
    <>
      <main className="flex-1">
        <LandingHero />
        <ProofStrip />
        <section className="border-border border-t px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <HowItWorks index={1} />
          </div>
        </section>
        <PopularServices />
        <BenefitsBar />
        <AgencyProblem />
      </main>
      <SiteFooter />
    </>
  );
}
