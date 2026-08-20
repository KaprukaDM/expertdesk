import Link from "next/link";
import { Wallet, PackageCheck, PackageOpen, FileClock, Users, ArrowUpRight } from "lucide-react";
import { getAdminStats, getRecentOrders, getRecentRequestsNeedingAction, getMonthlySeries } from "@/lib/adminStats";
import { estimateLkr } from "@/lib/tokenConstants";
import { RevenueTrendChart, OrdersTrendChart } from "@/components/admin/dashboard-charts";

const dayMonth = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

export default async function AdminDashboardPage() {
  const [stats, recentOrders, requestsNeedingAction, monthlySeries] = await Promise.all([
    getAdminStats(),
    getRecentOrders(),
    getRecentRequestsNeedingAction(),
    getMonthlySeries(),
  ]);
  const hasAnyActivity = monthlySeries.some((m) => m.tokensToppedUp > 0 || m.ordersCount > 0);

  const statCards = [
    {
      label: "Revenue (top-ups)",
      value: estimateLkr(stats.tokensToppedUpTotal),
      detail: `${stats.tokensToppedUpTotal.toLocaleString()} tokens purchased`,
      icon: Wallet,
    },
    {
      label: "Open orders",
      value: stats.ordersOpen.toLocaleString(),
      detail: `${stats.ordersTotal.toLocaleString()} orders total`,
      icon: PackageOpen,
      href: "/admin/orders",
    },
    {
      label: "Delivered orders",
      value: stats.ordersDelivered.toLocaleString(),
      detail: `${estimateLkr(stats.tokensSoldTotal)} in work sold`,
      icon: PackageCheck,
      href: "/admin/orders",
    },
    {
      label: "Requests needing a proposal",
      value: stats.requestsNeedingProposal.toLocaleString(),
      detail: `${stats.requestsAwaitingCustomer.toLocaleString()} awaiting customer pick`,
      icon: FileClock,
      href: "/admin/requests",
    },
    {
      label: "Customers",
      value: stats.customerCount.toLocaleString(),
      detail: "Signed-up businesses",
      icon: Users,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">How the agency is doing, at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          const content = (
            <div className="border-border bg-card group flex h-full flex-col gap-3 rounded-2xl border p-5">
              <div className="flex items-center justify-between">
                <span className="bg-secondary text-primary flex size-9 items-center justify-center rounded-xl">
                  <Icon className="size-4" />
                </span>
                {card.href && (
                  <ArrowUpRight className="text-muted-foreground size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{card.label}</p>
                <p className="font-heading mt-0.5 text-2xl font-semibold tabular-nums">{card.value}</p>
                <p className="text-muted-foreground mt-1 text-xs">{card.detail}</p>
              </div>
            </div>
          );
          return card.href ? (
            <Link key={card.label} href={card.href} className="block">
              {content}
            </Link>
          ) : (
            <div key={card.label}>{content}</div>
          );
        })}
      </div>

      {hasAnyActivity ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="border-border bg-card rounded-2xl border p-5">
            <p className="text-sm font-medium">Revenue — last 6 months</p>
            <p className="text-muted-foreground text-xs">Wallet top-ups, by month</p>
            <div className="mt-2">
              <RevenueTrendChart data={monthlySeries} />
            </div>
          </div>
          <div className="border-border bg-card rounded-2xl border p-5">
            <p className="text-sm font-medium">Orders placed — last 6 months</p>
            <p className="text-muted-foreground text-xs">Count of orders, by month</p>
            <div className="mt-2">
              <OrdersTrendChart data={monthlySeries} />
            </div>
          </div>
        </div>
      ) : (
        <div className="border-border bg-card mt-8 rounded-2xl border border-dashed p-8 text-center">
          <p className="text-muted-foreground text-sm">
            No activity in the last 6 months yet — trend charts will appear here once top-ups or orders come in.
          </p>
        </div>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-base font-medium">Needs a proposal</h2>
            <Link href="/admin/requests" className="text-primary text-sm font-medium">
              View all
            </Link>
          </div>
          {requestsNeedingAction.length === 0 ? (
            <div className="border-border bg-card rounded-2xl border border-dashed p-6 text-center">
              <p className="text-muted-foreground text-sm">Nothing waiting — all caught up.</p>
            </div>
          ) : (
            <div className="border-border divide-border divide-y overflow-hidden rounded-2xl border">
              {requestsNeedingAction.map((request) => (
                <Link
                  key={request.id}
                  href={`/admin/requests/${request.id}`}
                  className="bg-card hover:bg-muted/40 flex items-center justify-between gap-3 p-4 text-sm transition-colors"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {request.user.businessProfile?.businessName ?? request.user.businessName ?? request.user.email}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {request.serviceName} · requested {dayMonth.format(request.createdAt)}
                    </p>
                  </div>
                  <span className="bg-warning-soft text-warning shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
                    Needs proposal
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-base font-medium">Recent orders</h2>
            <Link href="/admin/orders" className="text-primary text-sm font-medium">
              View all
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="border-border bg-card rounded-2xl border border-dashed p-6 text-center">
              <p className="text-muted-foreground text-sm">No orders yet.</p>
            </div>
          ) : (
            <div className="border-border divide-border divide-y overflow-hidden rounded-2xl border">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="bg-card hover:bg-muted/40 flex items-center justify-between gap-3 p-4 text-sm transition-colors"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {order.user.businessProfile?.businessName ?? order.user.businessName ?? order.user.email}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {order.serviceName} — {order.packageName} · {dayMonth.format(order.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      order.status === "PENDING" ? "bg-warning-soft text-warning" : "bg-good-soft text-good"
                    }`}
                  >
                    {order.status === "PENDING" ? "Pending" : "Delivered"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
