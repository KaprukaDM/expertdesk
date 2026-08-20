"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

type PackageDraft = {
  name: string;
  tagline: string;
  tokenCost: string;
  deliveryDays: string;
  features: string;
};

const EMPTY_PACKAGE: PackageDraft = { name: "", tagline: "", tokenCost: "", deliveryDays: "", features: "" };

const DEFAULTS: [PackageDraft, PackageDraft, PackageDraft] = [
  { ...EMPTY_PACKAGE, name: "Basic" },
  { ...EMPTY_PACKAGE, name: "Standard" },
  { ...EMPTY_PACKAGE, name: "Premium" },
];

export function ProposalBuilderForm({ requestId }: { requestId: string }) {
  const router = useRouter();
  const [brief, setBrief] = useState<File | null>(null);
  const [packages, setPackages] = useState<[PackageDraft, PackageDraft, PackageDraft]>(DEFAULTS);
  const [recommendedIndex, setRecommendedIndex] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updatePackage(index: number, field: keyof PackageDraft, value: string) {
    setPackages((prev) => {
      const next = [...prev] as [PackageDraft, PackageDraft, PackageDraft];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!brief) {
      setError("Attach the brief document.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const formData = new FormData();
    formData.append("brief", brief);
    formData.append("recommendedIndex", String(recommendedIndex));
    packages.forEach((pkg, i) => {
      formData.append(`pkg${i}_name`, pkg.name);
      formData.append(`pkg${i}_tagline`, pkg.tagline);
      formData.append(`pkg${i}_tokenCost`, pkg.tokenCost);
      formData.append(`pkg${i}_deliveryDays`, pkg.deliveryDays);
      formData.append(`pkg${i}_features`, pkg.features);
    });

    const res = await fetch(`/api/admin/requests/${requestId}/proposal`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Try again.");
      setSubmitting(false);
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-border bg-card space-y-3 rounded-2xl border p-4">
        <Label htmlFor="brief-file">Brief document</Label>
        <input
          id="brief-file"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setBrief(e.target.files?.[0] ?? null)}
          className="border-border file:bg-foreground file:text-background w-full rounded-lg border px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:px-3 file:py-1.5 file:text-xs file:font-medium"
        />
        <p className="text-muted-foreground text-xs">PDF or Word document.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {packages.map((pkg, i) => (
          <div key={i} className="border-border bg-card space-y-3 rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <p className="text-eyebrow">Option {i + 1}</p>
              <label className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <input
                  type="radio"
                  name="recommended"
                  checked={recommendedIndex === i}
                  onChange={() => setRecommendedIndex(i)}
                  className="accent-primary"
                />
                Recommended
              </label>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`pkg${i}-name`}>Name</Label>
              <Input
                id={`pkg${i}-name`}
                value={pkg.name}
                onChange={(e) => updatePackage(i, "name", e.target.value)}
                placeholder="e.g. Starter Fix"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`pkg${i}-tagline`}>Tagline (optional)</Label>
              <Input
                id={`pkg${i}-tagline`}
                value={pkg.tagline}
                onChange={(e) => updatePackage(i, "tagline", e.target.value)}
                placeholder="One line describing this option"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor={`pkg${i}-tokens`}>Tokens</Label>
                <Input
                  id={`pkg${i}-tokens`}
                  type="number"
                  min={1}
                  value={pkg.tokenCost}
                  onChange={(e) => updatePackage(i, "tokenCost", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`pkg${i}-days`}>Delivery days</Label>
                <Input
                  id={`pkg${i}-days`}
                  type="number"
                  min={1}
                  value={pkg.deliveryDays}
                  onChange={(e) => updatePackage(i, "deliveryDays", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`pkg${i}-features`}>Features (one per line)</Label>
              <Textarea
                id={`pkg${i}-features`}
                value={pkg.features}
                onChange={(e) => updatePackage(i, "features", e.target.value)}
                rows={4}
                placeholder={"Fix indexation on live pages\nProduct schema markup\n5 technical fixes"}
                required
              />
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p role="alert" className="text-critical text-sm">
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? (
          <>
            <Spinner className="size-4" /> Sending proposal…
          </>
        ) : (
          "Send brief + 3 options to customer"
        )}
      </Button>
    </form>
  );
}
