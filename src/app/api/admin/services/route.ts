import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { upsertServiceOverride, isStaticServiceSlug } from "@/lib/services";

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

const createSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens."),
  active: z.boolean(),
  name: z.string().trim().min(1, "Name is required."),
  blurb: z.string().trim().min(1, "Blurb is required."),
  description: z.string().trim().min(1, "Description is required."),
  applicability: z.string().trim().optional(),
  icon: z.string().trim().min(1, "Icon is required."),
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

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const json = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  if (isStaticServiceSlug(parsed.data.slug)) {
    return NextResponse.json({ error: "That slug is already used by a built-in service." }, { status: 400 });
  }

  const existing = await prisma.serviceOverride.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "A service with that slug already exists." }, { status: 400 });
  }

  await upsertServiceOverride(parsed.data);
  return NextResponse.json({ ok: true });
}
