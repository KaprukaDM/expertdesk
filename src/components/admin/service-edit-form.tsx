"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { ICON_OPTIONS, type Service } from "@/lib/service-types";

type PackageDraft = {
  tagline: string;
  price: string;
  tokenCost: string;
  delivery: string;
  deliveryDays: string;
  revisions: string;
  features: string;
};

const TIER_NAMES = ["Basic", "Standard", "Premium"] as const;

function toDraft(pkg?: Service["packages"][number]): PackageDraft {
  return {
    tagline: pkg?.tagline ?? "",
    price: pkg?.price ?? "",
    tokenCost: pkg?.tokenCost ? String(pkg.tokenCost) : "",
    delivery: pkg?.delivery ?? "",
    deliveryDays: pkg?.deliveryDays ? String(pkg.deliveryDays) : "",
    revisions: pkg?.revisions ?? "",
    features: pkg?.features?.join("\n") ?? "",
  };
}

type ServiceCardData = Omit<Service, "icon"> & { overrideActive?: boolean; isCustom?: boolean };

export function ServiceEditForm({
  mode,
  service,
}: {
  mode: "create" | "edit";
  service?: ServiceCardData;
}) {
  const router = useRouter();
  const isCustom = mode === "create" || Boolean(service?.isCustom);

  const [slug, setSlug] = useState(service?.slug ?? "");
  const [active, setActive] = useState(service?.overrideActive ?? true);
  const [name, setName] = useState(service?.name ?? "");
  const [blurb, setBlurb] = useState(service?.blurb ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [applicability, setApplicability] = useState(service?.applicability ?? "");
  const [icon, setIcon] = useState(Object.keys(ICON_OPTIONS)[0]);
  const [requiresWebsite, setRequiresWebsite] = useState(service?.requiresWebsite ?? false);
  const [instantCheckout, setInstantCheckout] = useState(service?.instantCheckout ?? false);
  const [packages, setPackages] = useState<[PackageDraft, PackageDraft, PackageDraft]>([
    toDraft(service?.packages?.[0]),
    toDraft(service?.packages?.[1]),
    toDraft(service?.packages?.[2]),
  ]);
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
    setError(null);

    if (isCustom && !slug.trim()) {
      setError("Slug is required.");
      return;
    }

    setSubmitting(true);

    const body = {
      slug: slug.trim(),
      active,
      name: name.trim() || undefined,
      blurb: blurb.trim() || undefined,
      description: description.trim() || undefined,
      applicability: applicability.trim() || undefined,
      icon: isCustom ? icon : undefined,
      requiresWebsite,
      instantCheckout,
      packages: packages.map((pkg, i) => ({
        name: TIER_NAMES[i],
        tagline: pkg.tagline.trim() || undefined,
        price: pkg.price.trim(),
        tokenCost: Number(pkg.tokenCost),
        delivery: pkg.delivery.trim(),
        deliveryDays: Number(pkg.deliveryDays),
        revisions: pkg.revisions.trim(),
        features: pkg.features
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      })),
    };

    const res = await fetch(
      mode === "create" ? "/api/admin/services" : `/api/admin/services/${service!.slug}`,
      {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Try again.");
      setSubmitting(false);
      return;
    }

    router.push("/admin/services");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-border bg-card space-y-4 rounded-2xl border p-4">
        <div className="flex items-center justify-between">
          <p className="text-eyebrow">Service details</p>
          <label className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="accent-primary"
            />
            Active (visible on site)
          </label>
        </div>

        {isCustom && (
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"))}
              placeholder="e.g. email-marketing"
              disabled={mode === "edit"}
              required
            />
            <p className="text-muted-foreground text-xs">Used in the URL: /services/{slug || "your-slug"}</p>
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="name">Name {!isCustom && "(leave blank to keep default)"}</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={service?.name} required={isCustom} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="blurb">Blurb</Label>
          <Input id="blurb" value={blurb} onChange={(e) => setBlurb(e.target.value)} placeholder={service?.blurb} required={isCustom} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder={service?.description}
            required={isCustom}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="applicability">Applicability note</Label>
          <Input
            id="applicability"
            value={applicability}
            onChange={(e) => setApplicability(e.target.value)}
            placeholder={service?.applicability || "e.g. Works for any business or app."}
          />
        </div>

        {isCustom && (
          <div className="space-y-1.5">
            <Label htmlFor="icon">Icon</Label>
            <select
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="border-border w-full rounded-lg border px-3 py-2 text-sm"
            >
              {Object.keys(ICON_OPTIONS).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-6">
          <label className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={requiresWebsite}
              onChange={(e) => setRequiresWebsite(e.target.checked)}
              className="accent-primary"
            />
            Requires a website
          </label>
          <label className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={instantCheckout}
              onChange={(e) => setInstantCheckout(e.target.checked)}
              className="accent-primary"
            />
            Instant checkout (no brand study)
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {packages.map((pkg, i) => (
          <div key={i} className="border-border bg-card space-y-3 rounded-2xl border p-4">
            <p className="text-eyebrow">{TIER_NAMES[i]}</p>

            <div className="space-y-1.5">
              <Label htmlFor={`pkg${i}-tagline`}>Tagline (optional)</Label>
              <Input
                id={`pkg${i}-tagline`}
                value={pkg.tagline}
                onChange={(e) => updatePackage(i, "tagline", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor={`pkg${i}-price`}>Price label</Label>
                <Input
                  id={`pkg${i}-price`}
                  value={pkg.price}
                  onChange={(e) => updatePackage(i, "price", e.target.value)}
                  placeholder="e.g. 200 tokens"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`pkg${i}-tokens`}>Token cost</Label>
                <Input
                  id={`pkg${i}-tokens`}
                  type="number"
                  min={1}
                  value={pkg.tokenCost}
                  onChange={(e) => updatePackage(i, "tokenCost", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor={`pkg${i}-delivery`}>Delivery label</Label>
                <Input
                  id={`pkg${i}-delivery`}
                  value={pkg.delivery}
                  onChange={(e) => updatePackage(i, "delivery", e.target.value)}
                  placeholder="e.g. 7-day delivery"
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
              <Label htmlFor={`pkg${i}-revisions`}>Revisions label</Label>
              <Input
                id={`pkg${i}-revisions`}
                value={pkg.revisions}
                onChange={(e) => updatePackage(i, "revisions", e.target.value)}
                placeholder="e.g. 2 revisions"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`pkg${i}-features`}>Features (one per line)</Label>
              <Textarea
                id={`pkg${i}-features`}
                value={pkg.features}
                onChange={(e) => updatePackage(i, "features", e.target.value)}
                rows={4}
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
            <Spinner className="size-4" /> Saving…
          </>
        ) : mode === "create" ? (
          "Create service"
        ) : (
          "Save changes"
        )}
      </Button>
    </form>
  );
}
