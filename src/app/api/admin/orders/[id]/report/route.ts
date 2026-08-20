import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveReportFile } from "@/lib/reportStorage";

export const runtime = "nodejs";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.role !== "ADMIN") return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Attach a file." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const path = await saveReportFile(order.id, file.name, buffer);

  await prisma.order.update({
    where: { id: order.id },
    data: { status: "DELIVERED", reportPath: path, reportName: file.name, deliveredAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
