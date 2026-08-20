import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { createOrder, OrderError } from "@/lib/orders";

export const runtime = "nodejs";

const bodySchema = z.object({
  serviceSlug: z.string(),
  packageName: z.enum(["Basic", "Standard", "Premium"]),
});

export async function POST(req: Request) {
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
    const order = await createOrder({ userId: session.user.id, ...parsed.data });
    return NextResponse.json({ id: order.id });
  } catch (err) {
    if (err instanceof OrderError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
