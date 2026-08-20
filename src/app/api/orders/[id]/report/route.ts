import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { readReportFile } from "@/lib/reportStorage";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  const isOwner = order.userId === session.user.id;
  const isAdmin = user?.role === "ADMIN";
  if (!isOwner && !isAdmin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  if (order.status !== "DELIVERED" || !order.reportPath || !order.reportName) {
    return NextResponse.json({ error: "Report not ready yet." }, { status: 404 });
  }

  const buffer = await readReportFile(order.reportPath);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${order.reportName}"`,
    },
  });
}
