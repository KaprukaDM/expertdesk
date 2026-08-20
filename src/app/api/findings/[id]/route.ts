import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const bodySchema = z.object({ status: z.enum(["OPEN", "DONE", "VERIFIED"]) });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const finding = await prisma.finding.findUnique({
    where: { id },
    include: { audit: true },
  });
  if (!finding || finding.audit.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const updated = await prisma.finding.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json(updated);
}
