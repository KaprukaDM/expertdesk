import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveBriefFile } from "@/lib/briefStorage";
import { submitProposal, RequestError, type ProposalInput } from "@/lib/serviceRequests";

export const runtime = "nodejs";

const packageSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  tagline: z.string().trim().optional(),
  tokenCost: z.coerce.number().int().positive("Tokens must be a positive number."),
  deliveryDays: z.coerce.number().int().positive("Delivery days must be a positive number."),
  features: z
    .string()
    .transform((s) =>
      s
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    )
    .refine((arr) => arr.length > 0, "Add at least one feature."),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.role !== "ADMIN") return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const request = await prisma.serviceRequest.findUnique({ where: { id } });
  if (!request) return NextResponse.json({ error: "Request not found." }, { status: 404 });

  const formData = await req.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Invalid form." }, { status: 400 });

  const file = formData.get("brief");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Attach a brief document." }, { status: 400 });
  }

  const recommendedIndex = Number(formData.get("recommendedIndex") ?? "1");

  const packages: ProposalInput[] = [];
  for (let i = 0; i < 3; i++) {
    const raw = {
      name: formData.get(`pkg${i}_name`),
      tagline: formData.get(`pkg${i}_tagline`) || undefined,
      tokenCost: formData.get(`pkg${i}_tokenCost`),
      deliveryDays: formData.get(`pkg${i}_deliveryDays`),
      features: formData.get(`pkg${i}_features`),
    };
    const parsed = packageSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: `Package ${i + 1}: ${parsed.error.issues[0]?.message ?? "invalid."}` },
        { status: 400 },
      );
    }
    packages.push({ ...parsed.data, recommended: i === recommendedIndex });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const briefPath = await saveBriefFile(request.id, file.name, buffer);

  try {
    await submitProposal({
      requestId: request.id,
      briefPath,
      briefName: file.name,
      packages: packages as [ProposalInput, ProposalInput, ProposalInput],
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof RequestError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
