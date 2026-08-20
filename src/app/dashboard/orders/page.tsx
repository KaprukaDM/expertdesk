import Link from "next/link";
import { Download } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { OrderCountdown } from "@/components/site/order-countdown";
import { PageHeader } from "@/components/dashboard/page-header";

const STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-warning-soft text-warning",
  DELIVERED: "bg-good-soft text-good",
};

export default async function PurchaseActivityPage() {
  const session = await auth();
  const userId = session!.user.id;

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PageHeader title="Purchase activity" description="Every order you've placed, in one place." />

      {orders.length === 0 ? (
        <div className="border-border bg-card rounded-2xl border border-dashed p-8 text-center">
          <p className="text-sm font-semibold">No orders yet</p>
          <p className="text-muted-foreground mx-auto mt-1 max-w-xs text-sm">
            Browse services to request a free brand study and get started.
          </p>
          <Link
            href="/services"
            className="bg-primary text-primary-foreground shadow-sm hover:opacity-90 mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
          >
            Browse services
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="border-border bg-card space-y-3 rounded-2xl border p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">
                    {order.serviceName} — {order.packageName}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    Ordered {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(order.createdAt)} ·{" "}
                    <span className="font-mono">{order.tokenCost}</span> tokens
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[order.status]}`}>
                  {order.status === "PENDING" ? "In progress" : "Delivered"}
                </span>
              </div>

              {order.status === "PENDING" ? (
                <OrderCountdown deadlineAt={order.deadlineAt.toISOString()} />
              ) : (
                <a
                  href={`/api/orders/${order.id}/report`}
                  className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
                >
                  <Download className="size-3.5" />
                  Download report
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
