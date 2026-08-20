import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOrCreateWallet } from "@/lib/tokens";
import { TopupButtons } from "@/components/dashboard/topup-buttons";
import { PageHeader } from "@/components/dashboard/page-header";

const REASON_LABEL: Record<string, string> = {
  SIGNUP_BONUS: "Welcome bonus",
  TOPUP: "Top up",
  AUDIT_RUN: "Audit run",
  REFUND: "Refund",
  ORDER_PLACED: "Order placed",
  ORDER_REFUND: "Order refund",
};

export default async function WalletPage() {
  const session = await auth();
  const wallet = await getOrCreateWallet(session!.user.id);
  const txns = await prisma.tokenTransaction.findMany({
    where: { walletId: wallet.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div>
      <PageHeader title="Wallet" description="Top up tokens and track where they've gone." />

      <div className="border-border bg-card shadow-lg relative mx-auto mb-8 max-w-md overflow-hidden rounded-2xl border p-6 text-center">
        <div className="via-primary/70 absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent to-transparent" />
        <p className="text-eyebrow">Balance</p>
        <p className="font-heading text-primary my-1 font-mono text-4xl font-semibold tabular-nums">
          {wallet.balance}
        </p>
        <p className="text-muted-foreground text-xs">tokens · works across every expert</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <p className="text-eyebrow mb-3 px-1">Top up</p>
        <TopupButtons />

        <p className="text-eyebrow mt-8 mb-3 px-1">Recent activity</p>
        {txns.length === 0 ? (
          <p className="text-muted-foreground px-1 text-sm">Nothing yet.</p>
        ) : (
          <ul className="divide-border bg-card divide-y rounded-2xl border">
            {txns.map((t) => (
              <li key={t.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{REASON_LABEL[t.reason] ?? t.reason}</p>
                  <p className="text-muted-foreground text-xs">
                    {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(t.createdAt)}
                  </p>
                </div>
                <span
                  className={`font-mono text-sm font-semibold tabular-nums ${t.delta > 0 ? "text-good" : "text-muted-foreground"}`}
                >
                  {t.delta > 0 ? "+" : ""}
                  {t.delta}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
