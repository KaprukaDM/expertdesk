import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { cancelServiceRequest, RequestError } from "@/lib/serviceRequests";

export const runtime = "nodejs";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    await cancelServiceRequest({ requestId: id, userId: session.user.id });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof RequestError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
