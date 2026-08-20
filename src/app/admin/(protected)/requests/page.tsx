import Link from "next/link";
import { listRequestsForAdmin } from "@/lib/serviceRequests";

const STATUS_STYLE: Record<string, string> = {
  SUBMITTED: "bg-warning-soft text-warning",
  PROPOSAL_READY: "bg-primary/10 text-primary",
  CONVERTED: "bg-good-soft text-good",
  DECLINED: "bg-muted text-muted-foreground",
  WITHDRAWN: "bg-muted text-muted-foreground",
};

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: "Needs proposal",
  PROPOSAL_READY: "Awaiting customer",
  CONVERTED: "Converted",
  DECLINED: "Expired",
  WITHDRAWN: "Withdrawn by customer",
};

// SUBMITTED requests need agency action first — bubble them to the top regardless of date.
const STATUS_ORDER: Record<string, number> = {
  SUBMITTED: 0,
  PROPOSAL_READY: 1,
  CONVERTED: 2,
  DECLINED: 3,
  WITHDRAWN: 4,
};

export default async function AdminRequestsPage() {
  const requests = (await listRequestsForAdmin()).sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Brand study requests</h1>
          <p className="text-muted-foreground mt-1 text-sm">Every request, across every business</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="border-border bg-card rounded-2xl border border-dashed p-10 text-center">
          <p className="text-sm font-medium">No requests yet</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Requests will appear here once a customer asks for a free brand study.
          </p>
        </div>
      ) : (
        <div className="border-border overflow-hidden rounded-2xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Business</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Requested</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y bg-card">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium">
                      {request.user.businessProfile?.businessName ?? request.user.businessName ?? "—"}
                    </p>
                    <p className="text-muted-foreground text-xs">{request.user.email}</p>
                  </td>
                  <td className="px-4 py-3">{request.user.phone ?? "—"}</td>
                  <td className="px-4 py-3">{request.serviceName}</td>
                  <td className="px-4 py-3">
                    {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(request.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[request.status]}`}>
                      {STATUS_LABEL[request.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/requests/${request.id}`} className="text-primary font-medium">
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
