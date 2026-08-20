import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FileSearch, Download, Clock, XCircle, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { getServiceRequestForUser, getProposalExpiry } from "@/lib/serviceRequests";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ProposalPicker } from "@/components/site/proposal-picker";
import { WithdrawRequestButton } from "@/components/site/withdraw-request-button";

export default async function RequestStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const request = await getServiceRequestForUser(id, session.user.id);
  if (!request) notFound();

  const expiry = getProposalExpiry(request);

  // Once converted, this is a real order — send them to the order page (countdown, report
  // download) rather than duplicating that UI here.
  if (request.status === "CONVERTED" && request.order) {
    redirect(`/orders/${request.order.id}`);
  }

  return (
    <>
      <main className="flex-1">
        <SiteHeader />

        <div className="mx-auto max-w-3xl px-6 pt-12 pb-24">
          <div className="mb-8 text-center">
            <span className="bg-secondary text-primary mx-auto mb-5 flex size-12 items-center justify-center rounded-full">
              <FileSearch className="size-6" />
            </span>
            <h1 className="font-heading text-2xl font-semibold">{request.serviceName} brand study</h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              {request.status === "SUBMITTED" &&
                "We're studying your business. You'll see a brief and 3 tailored package options here as soon as it's ready."}
              {request.status === "PROPOSAL_READY" &&
                "Here's what we found — and 3 packages tailored to it. Pick one to get started."}
              {request.status === "DECLINED" && "This proposal expired before a package was chosen."}
              {request.status === "WITHDRAWN" && "You withdrew this request."}
            </p>
          </div>

          {request.status === "SUBMITTED" && (
            <div className="border-border bg-card mx-auto max-w-md space-y-4 rounded-2xl border p-6 text-left">
              <div className="flex items-center gap-2">
                <Clock className="text-warning size-4" />
                <p className="text-sm font-medium">Brand study in progress</p>
              </div>
              {request.consentToShareAccess && (
                <div className="border-border border-t pt-4">
                  <p className="text-good flex items-center gap-1.5 text-sm">
                    <ShieldCheck className="size-3.5" />
                    You agreed to share account access — thanks, that&rsquo;ll help.
                  </p>
                </div>
              )}
              {request.message && (
                <div className="border-border border-t pt-4">
                  <p className="text-eyebrow mb-1">What you told us</p>
                  <p className="text-muted-foreground text-sm">{request.message}</p>
                </div>
              )}
              <div className="border-border flex items-center justify-between border-t pt-4">
                <Link href="/dashboard" className="text-primary text-sm font-medium">
                  Back to dashboard
                </Link>
                <WithdrawRequestButton requestId={request.id} serviceName={request.serviceName} />
              </div>
            </div>
          )}

          {(request.status === "DECLINED" || request.status === "WITHDRAWN") && (
            <div className="border-border bg-card mx-auto max-w-md space-y-4 rounded-2xl border p-6 text-center">
              <XCircle className="text-muted-foreground mx-auto size-6" />
              <p className="text-muted-foreground text-sm">
                {request.status === "WITHDRAWN"
                  ? "Changed your mind? Request a new brand study any time."
                  : "It expired before a package was chosen. Request a new brand study any time."}
              </p>
              <Link
                href={`/services/${request.serviceSlug}`}
                className="bg-primary text-primary-foreground inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90"
              >
                Request again
              </Link>
            </div>
          )}

          {request.status === "PROPOSAL_READY" && (
            <div className="space-y-8">
              {expiry && (
                <p
                  className={`text-center text-xs font-medium ${
                    expiry.daysLeft <= 3 ? "text-warning" : "text-muted-foreground"
                  }`}
                >
                  {expiry.daysLeft <= 0
                    ? "Expires today — pick a package to lock it in."
                    : `Expires in ${expiry.daysLeft} day${expiry.daysLeft === 1 ? "" : "s"} if unpicked.`}
                </p>
              )}
              {request.briefName && (
                <div className="border-border bg-card flex items-center justify-between gap-4 rounded-2xl border p-4">
                  <div>
                    <p className="text-sm font-medium">Your brief is ready</p>
                    <p className="text-muted-foreground text-xs">{request.briefName}</p>
                  </div>
                  <a
                    href={`/api/requests/${request.id}/brief`}
                    className="bg-foreground text-background inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium hover:opacity-90"
                  >
                    <Download className="size-3.5" />
                    Download brief
                  </a>
                </div>
              )}

              <ProposalPicker
                requestId={request.id}
                proposals={request.proposals.map((p) => ({
                  id: p.id,
                  name: p.name,
                  tagline: p.tagline,
                  tokenCost: p.tokenCost,
                  deliveryDays: p.deliveryDays,
                  features: Array.isArray(p.features) ? (p.features as string[]) : [],
                  recommended: p.recommended,
                }))}
              />
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
