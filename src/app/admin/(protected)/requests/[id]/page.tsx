import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Star, CheckCircle2 } from "lucide-react";
import { getRequestForAdmin } from "@/lib/serviceRequests";
import { ProposalBuilderForm } from "@/components/admin/proposal-builder-form";

const dayMonth = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default async function AdminRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = await getRequestForAdmin(id);
  if (!request) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Link href="/admin/requests" className="text-primary mb-6 inline-flex items-center gap-1 text-sm font-medium">
        <ArrowLeft className="size-4" />
        All requests
      </Link>

      <div className="border-border bg-card mb-6 space-y-4 rounded-2xl border p-5">
        <div>
          <h1 className="font-heading text-xl font-semibold">{request.serviceName} brand study</h1>
          <p className="text-muted-foreground text-sm">
            {request.user.businessProfile?.businessName ?? request.user.businessName} · {request.user.email}
            {request.user.phone ? ` · ${request.user.phone}` : ""}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-eyebrow">Requested</p>
            <p>{dayMonth.format(request.createdAt)}</p>
          </div>
          <div>
            <p className="text-eyebrow">Status</p>
            <p>{request.status.replace("_", " ")}</p>
          </div>
          <div>
            <p className="text-eyebrow">Phone</p>
            <p>{request.user.phone ?? "—"}</p>
          </div>
        </div>

        {request.consentToShareAccess && (
          <div className="border-border bg-good-soft text-good flex items-center gap-2 rounded-xl border-0 px-3 py-2 text-xs font-medium">
            <CheckCircle2 className="size-3.5 shrink-0" />
            Customer agreed to share account access for a more accurate plan
          </div>
        )}

        {request.message && (
          <div className="border-border border-t pt-4">
            <p className="text-eyebrow mb-1">What they told us</p>
            <p className="text-muted-foreground text-sm">{request.message}</p>
          </div>
        )}
      </div>

      {request.status === "SUBMITTED" && <ProposalBuilderForm requestId={request.id} />}

      {request.status === "WITHDRAWN" && (
        <p className="text-muted-foreground text-sm">The customer withdrew this request before a proposal was sent.</p>
      )}

      {request.status !== "SUBMITTED" && request.status !== "WITHDRAWN" && (
        <div className="space-y-4">
          {request.briefName && (
            <div className="border-border bg-card flex items-center justify-between gap-4 rounded-2xl border p-4">
              <div>
                <p className="text-sm font-medium">Brief sent</p>
                <p className="text-muted-foreground text-xs">{request.briefName}</p>
              </div>
              <a
                href={`/api/requests/${request.id}/brief`}
                className="bg-foreground text-background inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium hover:opacity-90"
              >
                <Download className="size-3.5" />
                Download
              </a>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-3">
            {request.proposals.map((p) => (
              <div key={p.id} className="border-border bg-card min-w-0 space-y-2 rounded-2xl border p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{p.name}</p>
                  {p.recommended && <Star className="text-primary size-3.5" />}
                </div>
                <p className="font-mono text-sm">{p.tokenCost} tokens</p>
                <p className="text-muted-foreground text-xs">{p.deliveryDays}-day delivery</p>
              </div>
            ))}
          </div>

          {request.status === "CONVERTED" && request.order && (
            <div className="border-border bg-good-soft flex items-center gap-3 rounded-2xl border p-4">
              <CheckCircle2 className="text-good size-5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Customer picked {request.order.packageName}</p>
                <p className="text-muted-foreground text-xs">Now an order — fulfil it from the orders list.</p>
              </div>
              <Link href={`/admin/orders/${request.order.id}`} className="text-primary shrink-0 text-sm font-medium">
                Open order
              </Link>
            </div>
          )}

          {request.status === "DECLINED" && (
            <p className="text-muted-foreground text-sm">
              This proposal expired before the customer picked an option.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
