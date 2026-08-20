"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Package as PackageIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type Tier = { name: "Basic" | "Standard" | "Premium"; price: string; delivery: string };

export function BuyPackageForm({
  serviceSlug,
  serviceName,
  isAuthenticated,
  packages,
}: {
  serviceSlug: string;
  serviceName: string;
  isAuthenticated: boolean;
  packages: Tier[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Arriving from a "Buy this package" link on the Compare tab — preselect it here.
  const requestedPackage = searchParams.get("package");

  const [selected, setSelected] = useState<Tier | null>(
    () => packages.find((p) => p.name === requestedPackage) ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    if (!isAuthenticated) {
      router.push("/signup");
      return;
    }
    if (!selected) return;
    setError(null);
    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceSlug, packageName: selected.name }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    router.push(`/orders/${data.id}`);
  }

  return (
    <div
      id="buy-form"
      className="border-border bg-card sticky top-24 space-y-4 scroll-mt-24 rounded-2xl border p-5 shadow-sm"
    >
      <div className="space-y-1.5">
        <span className="bg-secondary text-primary flex size-9 items-center justify-center rounded-xl">
          <PackageIcon className="size-4" />
        </span>
        <h3 className="font-heading text-base font-medium">Buy {serviceName}</h3>
        <p className="text-muted-foreground text-sm text-pretty">
          Fixed pricing — pick a package and pay with tokens. Work starts right away.
        </p>
      </div>

      <div className="space-y-2">
        {packages.map((tier) => (
          <button
            key={tier.name}
            type="button"
            onClick={() => setSelected(tier)}
            aria-pressed={selected?.name === tier.name}
            className={`focus-visible:ring-ring/50 w-full rounded-xl border p-3 text-left transition-colors focus-visible:ring-3 focus-visible:outline-none ${
              selected?.name === tier.name
                ? "border-primary bg-secondary"
                : "border-border hover:border-primary/40"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{tier.name}</span>
              <span className="font-mono text-sm font-semibold tabular-nums">{tier.price}</span>
            </div>
            <p className="text-muted-foreground mt-0.5 text-xs">{tier.delivery}</p>
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="text-critical text-xs">
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={loading || (isAuthenticated && !selected)}
        onClick={handleBuy}
        className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Spinner className="size-4" /> Placing order…
          </>
        ) : !isAuthenticated ? (
          "Sign up to buy"
        ) : selected ? (
          `Buy ${selected.name} — ${selected.price}`
        ) : (
          "Select a package"
        )}
      </button>
      <p className="text-muted-foreground text-center text-xs">
        Tokens are charged immediately — no brand study needed.
      </p>
    </div>
  );
}
