"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, FileSearch, ShieldCheck } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type Step = "intro" | "consent" | "notes";

export function RequestBrandStudyForm({
  serviceSlug,
  serviceName,
  isAuthenticated,
  priceRangeHint,
  accessPlatforms,
}: {
  serviceSlug: string;
  serviceName: string;
  isAuthenticated: boolean;
  /** e.g. "≈ Rs 500 – Rs 5,000" — gives scale before the tailored proposal arrives. */
  priceRangeHint?: string;
  /** Platforms this service would benefit from view-only access to — empty for pure creative
   *  services, in which case the consent step is skipped entirely. */
  accessPlatforms: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Arriving from a "Get this package" button on the Compare tab — since real pricing only
  // comes from the tailored brief, that button routes back here instead of a direct checkout.
  const requestedPackage = searchParams.get("package");

  const [step, setStep] = useState<Step>("intro");
  const [consentToShareAccess, setConsentToShareAccess] = useState(false);
  const [message, setMessage] = useState(() =>
    requestedPackage ? `I'm interested in something like the ${requestedPackage} package.` : "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Consent only exists as a step for services with something worth asking access to — steps
  // and the progress bar both need to know the real total, not always assume 3.
  const steps: Step[] = accessPlatforms.length > 0 ? ["intro", "consent", "notes"] : ["intro", "notes"];
  const stepIndex = steps.indexOf(step);

  function handleStart() {
    if (!isAuthenticated) {
      router.push("/signup");
      return;
    }
    setStep(accessPlatforms.length > 0 ? "consent" : "notes");
  }

  function chooseConsent(agreed: boolean) {
    setConsentToShareAccess(agreed);
    setStep("notes");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceSlug, message: message.trim() || undefined, consentToShareAccess }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    router.push(`/requests/${data.id}`);
  }

  return (
    <div
      id="brand-study-form"
      className="border-border bg-card sticky top-24 space-y-4 scroll-mt-24 rounded-2xl border p-5 shadow-sm"
    >
      {steps.length > 1 && (
        <div className="space-y-1.5">
          <div className="flex gap-1" aria-hidden>
            {steps.map((s, i) => (
              <span
                key={s}
                className={`h-1.5 flex-1 rounded-full ${i <= stepIndex ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-xs">
            Step {stepIndex + 1} of {steps.length}
          </p>
        </div>
      )}

      {step === "intro" && (
        <>
          {requestedPackage && (
            <div className="border-primary/30 bg-secondary text-primary flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium">
              <span className="bg-primary size-1.5 shrink-0 rounded-full" />
              You selected: {requestedPackage}
            </div>
          )}
          <div className="space-y-1.5">
            <span className="bg-secondary text-primary flex size-9 items-center justify-center rounded-xl">
              <FileSearch className="size-4" />
            </span>
            <h3 className="font-heading text-base font-medium">Request a free {serviceName} brand study</h3>
            <p className="text-muted-foreground text-sm text-pretty">
              {requestedPackage
                ? `Real pricing is tailored to your business, so we can't sell the ${requestedPackage} package directly — the free brand study gets you exact pricing for it.`
                : "We'll research your business and send back a tailored brief with 3 package options — no charge until you pick one."}
            </p>
            {priceRangeHint && (
              <p className="text-muted-foreground text-xs">Packages on this service typically run {priceRangeHint}.</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          >
            {isAuthenticated ? "Get started" : "Sign up to get started"}
          </button>
          <p className="text-muted-foreground text-center text-xs">Free to request. Nothing charged yet.</p>
        </>
      )}

      {step === "consent" && (
        <>
          <button
            type="button"
            onClick={() => setStep("intro")}
            className="text-muted-foreground hover:text-foreground -mb-1 inline-flex items-center gap-1 text-xs font-medium"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </button>
          {requestedPackage && (
            <div className="border-primary/30 bg-secondary text-primary flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium">
              <span className="bg-primary size-1.5 shrink-0 rounded-full" />
              You selected: {requestedPackage}
            </div>
          )}
          <div className="space-y-1.5">
            <span className="bg-secondary text-primary flex size-9 items-center justify-center rounded-xl">
              <ShieldCheck className="size-4" />
            </span>
            <h3 className="font-heading text-base font-medium">Want a more accurate plan?</h3>
            <p className="text-muted-foreground text-sm text-pretty">
              For {serviceName}, the specialist can work from a much more precise brief with view-only access to:
            </p>
            <ul className="space-y-1">
              {accessPlatforms.map((platform) => (
                <li key={platform} className="text-foreground flex items-center gap-2 text-sm">
                  <span className="bg-primary size-1.5 shrink-0 rounded-full" />
                  {platform}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-xs text-pretty">
              Completely optional — say no and we&rsquo;ll still put together a study from what&rsquo;s public.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => chooseConsent(true)}
              className="bg-primary text-primary-foreground flex-1 rounded-full px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Yes, I&rsquo;m willing
            </button>
            <button
              type="button"
              onClick={() => chooseConsent(false)}
              className="text-muted-foreground hover:text-foreground flex-1 rounded-full px-4 py-2 text-sm font-medium"
            >
              No, skip this
            </button>
          </div>
        </>
      )}

      {step === "notes" && (
        <>
          <button
            type="button"
            onClick={() => setStep(accessPlatforms.length > 0 ? "consent" : "intro")}
            className="text-muted-foreground hover:text-foreground -mb-1 inline-flex items-center gap-1 text-xs font-medium"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </button>
          {requestedPackage && (
            <div className="border-primary/30 bg-secondary text-primary flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium">
              <span className="bg-primary size-1.5 shrink-0 rounded-full" />
              You selected: {requestedPackage}
            </div>
          )}
          <div className="space-y-1.5">
            <span className="bg-secondary text-primary flex size-9 items-center justify-center rounded-xl">
              <FileSearch className="size-4" />
            </span>
            <h3 className="font-heading text-base font-medium">Last thing</h3>
            <p className="text-muted-foreground text-sm text-pretty">
              Anything that&rsquo;ll help the specialist study your business faster.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <label htmlFor="request-message" className="text-muted-foreground text-xs font-medium">
                Anything we should know? (optional)
              </label>
              <textarea
                id="request-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Your goals, current site/socials, anything else useful…"
                className="border-border bg-background focus:ring-ring/50 w-full resize-none rounded-lg border px-3 py-2 text-sm focus:ring-3 focus:outline-none"
              />
            </div>

            {error && (
              <p role="alert" className="text-critical text-xs">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Spinner className="size-4" /> Sending…
                </>
              ) : (
                "Request brand study"
              )}
            </button>
            <p className="text-muted-foreground text-center text-xs">Free to request. Nothing charged yet.</p>
          </form>
        </>
      )}
    </div>
  );
}
