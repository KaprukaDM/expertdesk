"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TOPUP_PACKAGES } from "@/lib/tokenConstants";

export function TopupButtons() {
  const router = useRouter();
  const [loadingTokens, setLoadingTokens] = useState<number | null>(null);

  async function handleTopup(tokens: number) {
    setLoadingTokens(tokens);
    await fetch("/api/wallet/topup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokens }),
    });
    setLoadingTokens(null);
    router.refresh();
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {TOPUP_PACKAGES.map((pkg) => (
        <div
          key={pkg.tokens}
          className="border-border bg-card shadow-xs hover:shadow-md rounded-xl border p-3 text-center transition-shadow"
        >
          <p className="font-mono text-lg font-semibold tabular-nums">{pkg.tokens}</p>
          <p className="text-muted-foreground text-xs">Rs {pkg.priceLkr.toLocaleString()}</p>
          {pkg.saveLabel && (
            <span className="bg-good-soft text-good mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold">
              {pkg.saveLabel}
            </span>
          )}
          <Button
            size="sm"
            variant="outline"
            className="mt-2 w-full"
            disabled={loadingTokens !== null}
            onClick={() => handleTopup(pkg.tokens)}
          >
            {loadingTokens === pkg.tokens ? (
              <>
                <Spinner className="size-3.5" /> Adding…
              </>
            ) : (
              "Top up"
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
