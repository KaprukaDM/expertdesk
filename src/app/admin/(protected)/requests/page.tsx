import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { LogoutButton } from "@/components/site/logout-button";
import { AdminTabs } from "@/components/admin/admin-tabs";
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
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Logo href="/admin" />
        <LogoutButton callbackUrl="/admin/login" />
      </div>

      <div className="mb-8 flex items-center justify-between">
        <AdminTabs />
        <p className="text-muted-foreground text-sm">Every brand study request, across every business</p>
      </div>

      {requests.length === 0 ? (
        <p className="text-muted-foreground text-sm">No requests yet.</p>
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
                <tr key={request.id}>
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
