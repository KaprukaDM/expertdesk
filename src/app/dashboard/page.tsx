import Link from "next/link";
import type { ReactNode } from "react";
import {
  Wallet as WalletIcon,
  ChevronRight,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Plus,
  Download,
  Store,
  Package,
  FileSearch,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/users";
import { prisma } from "@/lib/prisma";
import { getOrCreateWallet } from "@/lib/tokens";
import { listServiceRequestsForUser } from "@/lib/serviceRequests";
import { OrderCountdown } from "@/components/site/order-countdown";

const STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-warning-soft text-warning",
  DELIVERED: "bg-good-soft text-good",
};

const dayMonth = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** Compact KPI tile. Renders as a link when `href` is given, a plain card otherwise. */
function StatCard({
  label,
  value,
  hint,
  icon,
  href,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon: ReactNode;
  href?: string;
  tone?: "default" | "good" | "warning";
}) {
  const toneIcon =
    tone === "good"
      ? "bg-good-soft text-good"
      : tone === "warning"
        ? "bg-warning-soft text-warning"
        : "bg-secondary text-primary";

  const toneBar = tone === "good" ? "bg-good" : tone === "warning" ? "bg-warning" : "bg-primary/30";

  const inner = (
    <>
      <span className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl ${toneBar}`} />
      <div className="flex items-center justify-between">
        <span className={`flex size-9 items-center justify-center rounded-xl ${toneIcon}`}>{icon}</span>
        {href && <ChevronRight className="text-muted-foreground size-4" />}
      </div>
      <p className="font-heading mt-3 font-mono text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-eyebrow mt-0.5">{label}</p>
      {hint && <p className="text-muted-foreground mt-1 text-xs">{hint}</p>}
    </>
  );

  const className =
    "border-border bg-card shadow-xs relative block overflow-hidden rounded-2xl border p-4 transition duration-200";

  return href ? (
    <Link href={href} className={`${className} hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5`}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [wallet, user, orders, requests] = await Promise.all([
    getOrCreateWallet(userId),
    getCurrentUser(userId),
    prisma.order.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
    listServiceRequestsForUser(userId),
  ]);

  const activeOrders = orders.filter((o) => o.status === "PENDING");
  const deliveredCount = orders.length - activeOrders.length;
  const recentOrders = orders.slice(0, 4);
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const hello = greeting(new Date().getHours());

  const proposalsReady = requests.filter((r) => r.status === "PROPOSAL_READY");
  const openRequests = requests.filter((r) => r.status === "SUBMITTED" || r.status === "PROPOSAL_READY");

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#002D2D_0%,#0B3B3B_55%,#002D2D_100%)] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-white/70 uppercase">
              {user?.businessName ?? "Your workspace"}
            </p>
            <h1 className="font-heading mt-1 text-3xl font-semibold">
              {hello}, {firstName}
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/75">
              Here&rsquo;s where things stand today — balance, active work and briefs waiting on you.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-medium text-[#008060] shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md sm:self-auto"
          >
            Browse services
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      {proposalsReady.length > 0 && (
        <Link
          href={proposalsReady.length === 1 ? `/requests/${proposalsReady[0].id}` : "/dashboard/requests"}
          className="border-primary bg-secondary shadow-xs hover:shadow-md relative z-10 mx-2 -mt-4 flex items-center gap-4 rounded-2xl border p-4 transition-shadow sm:mx-4"
        >
          <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-xl">
            <FileSearch className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">
              {proposalsReady.length === 1
                ? `Your ${proposalsReady[0].serviceName} brief is ready`
                : `${proposalsReady.length} briefs are ready for you`}
            </span>
            <span className="text-muted-foreground mt-0.5 block text-xs">
              Review the tailored options and pick one to get started.
            </span>
          </span>
          <ChevronRight className="text-muted-foreground size-4 shrink-0" />
        </Link>
      )}

      <section
        className={`relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-4 ${
          proposalsReady.length > 0 ? "mt-4" : "-mt-6"
        }`}
      >
        <StatCard
          label="Token balance"
          value={wallet.balance}
          hint="works across every expert"
          icon={<WalletIcon className="size-4" />}
          href="/dashboard/wallet"
        />
        <StatCard
          label="In progress"
          value={activeOrders.length}
          hint={activeOrders.length ? "being worked on" : "nothing running"}
          icon={<Clock className="size-4" />}
          href={activeOrders.length ? "/dashboard/orders" : undefined}
          tone={activeOrders.length ? "warning" : "default"}
        />
        <StatCard
          label="Delivered"
          value={deliveredCount}
          hint={deliveredCount ? "reports ready" : "none yet"}
          icon={<CheckCircle2 className="size-4" />}
          href={deliveredCount ? "/dashboard/orders" : undefined}
          tone={deliveredCount ? "good" : "default"}
        />
        <StatCard
          label="Open requests"
          value={openRequests.length}
          hint={proposalsReady.length ? "brief ready to review" : openRequests.length ? "brand study in progress" : "none right now"}
          icon={<FileSearch className="size-4" />}
          href={openRequests.length ? "/dashboard/requests" : undefined}
          tone={proposalsReady.length ? "warning" : "default"}
        />
      </section>

      <section className="mt-8 mb-8 grid gap-3 sm:grid-cols-3">
        <Link
          href="/services"
          className="border-border bg-card hover:border-primary/40 shadow-xs hover:shadow-lg group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5 sm:col-span-2"
        >
          <div className="via-primary/60 absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent to-transparent" />
          <div className="relative">
            <span className="bg-secondary text-primary mb-3 inline-flex size-9 items-center justify-center rounded-xl">
              <Store className="size-4" />
            </span>
            <p className="text-sm font-semibold">Browse services</p>
            <p className="text-muted-foreground mt-0.5 text-sm">
              SEO, ads, content, design and video — request a free brand study to get started.
            </p>
          </div>
          <span className="text-primary relative inline-flex items-center gap-1 text-sm font-medium">
            Explore services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/wallet"
          className="border-border bg-card hover:border-primary/40 shadow-xs hover:shadow-lg group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5"
        >
          <div className="via-primary/60 absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent to-transparent" />
          <div className="relative">
            <span className="bg-secondary text-primary mb-3 inline-flex size-9 items-center justify-center rounded-xl">
              <Plus className="size-4" />
            </span>
            <p className="text-sm font-semibold">Top up tokens</p>
            <p className="text-muted-foreground mt-0.5 text-sm">Add balance to run more work.</p>
          </div>
          <span className="text-primary relative inline-flex items-center gap-1 text-sm font-medium">
            Add tokens
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>

      {openRequests.length > 0 && (
        <>
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-eyebrow">Brand study requests</p>
            <Link href="/dashboard/requests" className="text-primary flex items-center gap-1 text-xs font-medium">
              View all
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
          <ul className="mb-8 space-y-3">
            {openRequests.slice(0, 3).map((request) => (
              <li key={request.id}>
                <Link
                  href={`/requests/${request.id}`}
                  className="border-border bg-card hover:border-primary/40 flex items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-colors"
                >
                  <span
                    className={`h-9 w-1 shrink-0 rounded-full ${
                      request.status === "PROPOSAL_READY" ? "bg-warning" : "bg-primary/30"
                    }`}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{request.serviceName} brand study</span>
                    <span className="text-muted-foreground mt-0.5 block text-xs">
                      Requested {dayMonth.format(request.createdAt)}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      request.status === "PROPOSAL_READY" ? "bg-primary/10 text-primary" : "bg-warning-soft text-warning"
                    }`}
                  >
                    {request.status === "PROPOSAL_READY" ? "Brief ready" : "In progress"}
                  </span>
                  <ChevronRight className="text-muted-foreground size-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-eyebrow">Recent activity</p>
        {orders.length > 0 && (
          <Link href="/dashboard/orders" className="text-primary flex items-center gap-1 text-xs font-medium">
            View all
            <ChevronRight className="size-3.5" />
          </Link>
        )}
      </div>

      {recentOrders.length === 0 ? (
        <div className="border-border bg-card rounded-2xl border border-dashed p-8 text-center">
          <span className="bg-secondary text-primary mx-auto mb-3 flex size-10 items-center justify-center rounded-xl">
            <Package className="size-5" />
          </span>
          <p className="text-sm font-semibold">No orders yet</p>
          <p className="text-muted-foreground mx-auto mt-1 max-w-xs text-sm">
            Pick a service to see the 3 things costing you sales — fixed, not just found.
          </p>
          <Link
            href="/services"
            className="bg-primary text-primary-foreground shadow-sm hover:opacity-90 mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
          >
            Browse services
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {recentOrders.map((order) => (
            <li
              key={order.id}
              className="border-border bg-card hover:border-primary/40 overflow-hidden rounded-2xl border p-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`h-9 w-1 shrink-0 rounded-full ${order.status === "PENDING" ? "bg-warning" : "bg-good"}`}
                  aria-hidden
                />
                <Link href={`/orders/${order.id}`} className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">
                    {order.serviceName} — {order.packageName}
                  </span>
                  <span className="text-muted-foreground mt-0.5 block text-xs">
                    Ordered {dayMonth.format(order.createdAt)} · <span className="font-mono">{order.tokenCost}</span> tokens
                  </span>
                </Link>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[order.status]}`}
                >
                  {order.status === "PENDING" ? "In progress" : "Delivered"}
                </span>
                {order.status === "DELIVERED" ? (
                  <a
                    href={`/api/orders/${order.id}/report`}
                    className="text-muted-foreground hover:text-primary shrink-0"
                    aria-label="Download report"
                  >
                    <Download className="size-4" />
                  </a>
                ) : (
                  <Link href={`/orders/${order.id}`} className="text-muted-foreground shrink-0" aria-label="View order">
                    <ChevronRight className="size-4" />
                  </Link>
                )}
              </div>

              {order.status === "PENDING" && (
                <div className="mt-3">
                  <OrderCountdown deadlineAt={order.deadlineAt.toISOString()} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
