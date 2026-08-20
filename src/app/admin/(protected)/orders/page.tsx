import Link from "next/link";
import { prisma } from "@/lib/prisma";

const STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-warning-soft text-warning",
  DELIVERED: "bg-good-soft text-good",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: { include: { businessProfile: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Orders</h1>
          <p className="text-muted-foreground mt-1 text-sm">All orders across every business</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="border-border bg-card rounded-2xl border border-dashed p-10 text-center">
          <p className="text-sm font-medium">No orders yet</p>
          <p className="text-muted-foreground mt-1 text-sm">Orders will appear here once a customer picks a package.</p>
        </div>
      ) : (
        <div className="border-border overflow-hidden rounded-2xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Business</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Package</th>
                <th className="px-4 py-3 font-medium">Deadline</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y bg-card">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium">{order.user.businessProfile?.businessName ?? order.user.businessName ?? "—"}</p>
                    <p className="text-muted-foreground text-xs">{order.user.email}</p>
                  </td>
                  <td className="px-4 py-3">{order.serviceName}</td>
                  <td className="px-4 py-3">
                    {order.packageName} · <span className="font-mono">{order.tokenCost}</span> tokens
                  </td>
                  <td className="px-4 py-3">
                    {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(
                      order.deadlineAt,
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[order.status]}`}>
                      {order.status === "PENDING" ? "Pending" : "Delivered"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/orders/${order.id}`} className="text-primary font-medium">
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
