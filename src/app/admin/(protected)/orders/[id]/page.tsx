import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ReportUploadForm } from "@/components/admin/report-upload-form";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { user: { include: { businessProfile: true } } },
  });
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Link href="/admin/orders" className="text-primary mb-6 inline-flex items-center gap-1 text-sm font-medium">
        <ArrowLeft className="size-4" />
        All orders
      </Link>

      <div className="border-border bg-card mb-6 space-y-4 rounded-2xl border p-5">
        <div>
          <h1 className="font-heading text-xl font-semibold">
            {order.serviceName} — {order.packageName}
          </h1>
          <p className="text-muted-foreground text-sm">
            {order.user.businessProfile?.businessName ?? order.user.businessName} · {order.user.email}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-eyebrow">Token cost</p>
            <p className="font-mono">{order.tokenCost} tokens</p>
          </div>
          <div>
            <p className="text-eyebrow">Deadline</p>
            <p>
              {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(
                order.deadlineAt,
              )}
            </p>
          </div>
          <div>
            <p className="text-eyebrow">Ordered</p>
            <p>{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-eyebrow">Status</p>
            <p>{order.status === "PENDING" ? "Pending" : "Delivered"}</p>
          </div>
        </div>
      </div>

      {order.status === "DELIVERED" ? (
        <div className="border-border bg-card rounded-2xl border p-4 text-sm">
          <p className="font-medium">Report already submitted</p>
          <p className="text-muted-foreground mt-1">
            {order.reportName} — delivered{" "}
            {order.deliveredAt && new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(order.deliveredAt)}
          </p>
        </div>
      ) : (
        <ReportUploadForm orderId={order.id} />
      )}
    </div>
  );
}
