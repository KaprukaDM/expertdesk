import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOrCreateWallet, TOPUP_PACKAGES } from "@/lib/tokens";

export const runtime = "nodejs";

const bodySchema = z.object({ tokens: z.number().int() });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  const pkg = parsed.success ? TOPUP_PACKAGES.find((p) => p.tokens === parsed.data.tokens) : undefined;
  if (!pkg) {
    return NextResponse.json({ error: "Choose a valid top-up package." }, { status: 400 });
  }

  const wallet = await getOrCreateWallet(session.user.id);

  const updated = await prisma.wallet.update({
    where: { id: wallet.id },
    data: {
      balance: { increment: pkg.tokens },
      transactions: { create: { delta: pkg.tokens, reason: "TOPUP" } },
    },
  });

  return NextResponse.json({ balance: updated.balance });
}
