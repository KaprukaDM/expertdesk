import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { upsertServiceOverride, deleteServiceOverride, isStaticServiceSlug } from "@/lib/services";

export const runtime = "nodejs";

const packageSchema = z.object({
  name: z.enum(["Basic", "Standard", "Premium"]),
  tagline: z.string().trim().optional(),
  price: z.string().trim().min(1, "Price label is required."),
  tokenCost: z.coerce.number().int().positive("Token cost must be a positive number."),
  delivery: z.string().trim().min(1, "Delivery label is required."),
  deliveryDays: z.coerce.number().int().positive("Delivery days must be a positive number."),
  revisions: z.string().trim().min(1, "Revisions label is required."),
  features: z.array(z.string().trim().min(1)).min(1, "Add at least one feature."),
});

const updateSchema = z.object({
  slug: z.string().trim().min(1),
  active: z.boolean(),
  name: z.string().trim().optional(),
  blurb: z.string().trim().optional(),
  description: z.string().trim().optional(),
  applicability: z.string().trim().optional(),
  icon: z.string().trim().optional(),
  requiresWebsite: z.boolean(),
  instantCheckout: z.boolean(),
  packages: z.tuple([packageSchema, packageSchema, packageSchema]),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  return user?.role === "ADMIN" ? user : null;
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const { slug } = await params;
  const json = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }
  if (parsed.data.slug !== slug) {
    return NextResponse.json({ error: "Slug mismatch." }, { status: 400 });
  }
  if (!isStaticServiceSlug(slug)) {
    // Custom service — name/blurb/description are required since there's no static fallback.
    if (!parsed.data.name || !parsed.data.blurb || !parsed.data.description) {
      return NextResponse.json({ error: "Name, blurb and description are required." }, { status: 400 });
    }
  }

  await upsertServiceOverride(parsed.data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const { slug } = await params;
  try {
    await deleteServiceOverride(slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not delete service.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
