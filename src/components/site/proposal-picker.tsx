"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Star } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type Proposal = {
  id: string;
  name: string;
  tagline: string | null;
  tokenCost: number;
  deliveryDays: number;
  features: string[];
  recommended: boolean;
};

export function ProposalPicker({ requestId, proposals }: { requestId: string; proposals: Proposal[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSelect(proposalId: string) {
    setError(null);
    setPendingId(proposalId);

    const res = await fetch(`/api/requests/${requestId}/select`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposalId }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Try again.");
      setPendingId(null);
      return;
    }

    router.push(`/orders/${data.orderId}`);
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {proposals.map((p) => (
          <div
            key={p.id}
            className={`bg-card relative flex flex-col gap-4 rounded-2xl border p-5 ${
              p.recommended ? "border-primary shadow-md" : "border-border"
            }`}
          >
            {p.recommended && (
              <span className="bg-primary text-primary-foreground absolute -top-3 left-5 flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium">
                <Star className="size-3" />
                Recommended
              </span>
            )}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-lg font-medium">{p.name}</h3>
                <span className="font-mono text-lg font-semibold tabular-nums">{p.tokenCost} tokens</span>
              </div>
              {p.tagline && <p className="text-muted-foreground text-sm">{p.tagline}</p>}
            </div>

            <p className="text-muted-foreground border-border border-y py-2 text-xs">
              {p.deliveryDays}-day delivery
            </p>

            <ul className="flex-1 space-y-2.5 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="text-primary mt-0.5 size-4 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              disabled={pendingId !== null}
              onClick={() => handleSelect(p.id)}
              className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {pendingId === p.id ? (
                <>
                  <Spinner className="size-4" /> Confirming…
                </>
              ) : (
                "Choose this plan"
              )}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <p role="alert" className="text-critical text-center text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
