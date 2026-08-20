import Link from "next/link";
import { auth } from "@/lib/auth";
import { listServiceRequestsForUser, getProposalExpiry } from "@/lib/serviceRequests";
import { PageHeader } from "@/components/dashboard/page-header";

const STATUS_STYLE: Record<string, string> = {
  SUBMITTED: "bg-warning-soft text-warning",
  PROPOSAL_READY: "bg-primary/10 text-primary",
  CONVERTED: "bg-good-soft text-good",
  DECLINED: "bg-muted text-muted-foreground",
  WITHDRAWN: "bg-muted text-muted-foreground",
};

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: "In progress",
  PROPOSAL_READY: "Brief ready",
  CONVERTED: "Converted to order",
  DECLINED: "Expired",
  WITHDRAWN: "Withdrawn",
};

// Brief-ready requests need the customer to act — bubble them to the top regardless of date,
// mirroring how the admin console bubbles SUBMITTED requests for the agency side.
const STATUS_ORDER: Record<string, number> = {
  PROPOSAL_READY: 0,
  SUBMITTED: 1,
  CONVERTED: 2,
  DECLINED: 3,
  WITHDRAWN: 4,
};

const dayMonth = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

export default async function DashboardRequestsPage() {
  const session = await auth();
  const requests = (await listServiceRequestsForUser(session!.user.id)).sort(
    (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
  );

  return (
    <div>
      <PageHeader title="Brand study requests" description="Every request you've sent in, and where it stands." />

      {requests.length === 0 ? (
        <div className="border-border bg-card rounded-2xl border border-dashed p-8 text-center">
          <p className="text-sm font-semibold">No requests yet</p>
          <p className="text-muted-foreground mx-auto mt-1 max-w-xs text-sm">
            Browse services to request a free brand study.
          </p>
          <Link
            href="/services"
            className="bg-primary text-primary-foreground shadow-sm hover:opacity-90 mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
          >
            Browse services
          </Link>
        </div>
      ) : (
        <ul className="mx-auto max-w-2xl space-y-3">
          {requests.map((request) => {
            const expiry = getProposalExpiry(request);
            return (
              <li key={request.id}>
                <Link
                  href={`/requests/${request.id}`}
                  className="border-border bg-card hover:border-primary/40 flex items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-colors"
                >
                  <span
                    className={`h-9 w-1 shrink-0 rounded-full ${
                      request.status === "PROPOSAL_READY" ? "bg-warning" : "bg-primary/20"
                    }`}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{request.serviceName} brand study</span>
                    <span className="text-muted-foreground mt-0.5 block text-xs">
                      Requested {dayMonth.format(request.createdAt)}
                      {expiry && (
                        <>
                          {" · "}
                          <span className={expiry.daysLeft <= 3 ? "text-warning font-medium" : undefined}>
                            {expiry.daysLeft <= 0 ? "expires today" : `expires in ${expiry.daysLeft}d`}
                          </span>
                        </>
                      )}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[request.status]}`}
                  >
                    {STATUS_LABEL[request.status]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
