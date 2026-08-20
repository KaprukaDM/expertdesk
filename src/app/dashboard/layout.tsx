import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/users";
import { prisma } from "@/lib/prisma";
import { getOrCreateWallet } from "@/lib/tokens";
import { listServiceRequestsForUser } from "@/lib/serviceRequests";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { NavCounts } from "@/components/dashboard/nav-items";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const [user, wallet, activeOrderCount, requests] = await Promise.all([
    getCurrentUser(userId),
    getOrCreateWallet(userId),
    prisma.order.count({ where: { userId, status: "PENDING" } }),
    listServiceRequestsForUser(userId),
  ]);
  if (user?.role === "ADMIN") redirect("/admin");

  const openRequestCount = requests.filter((r) => r.status === "SUBMITTED" || r.status === "PROPOSAL_READY").length;
  const proposalsReadyCount = requests.filter((r) => r.status === "PROPOSAL_READY").length;

  const counts: NavCounts = {
    "/dashboard/requests": openRequestCount ? { count: openRequestCount, alert: proposalsReadyCount > 0 } : undefined,
    "/dashboard/orders": activeOrderCount ? { count: activeOrderCount } : undefined,
  };

  return (
    <DashboardShell
      name={user?.name ?? "there"}
      businessName={user?.businessName}
      walletBalance={wallet.balance}
      counts={counts}
    >
      {children}
    </DashboardShell>
  );
}
