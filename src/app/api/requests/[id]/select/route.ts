import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { selectProposedPackage, RequestError } from "@/lib/serviceRequests";

export const runtime = "nodejs";

const bodySchema = z.object({
  proposalId: z.string(),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const order = await selectProposedPackage({
      requestId: id,
      userId: session.user.id,
      proposalId: parsed.data.proposalId,
    });
    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    if (err instanceof RequestError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
