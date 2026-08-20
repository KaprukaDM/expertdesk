import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2, Download } from "lucide-react";
import { auth } from "@/lib/auth";
import { getOrderForUser } from "@/lib/orders";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { OrderCountdown } from "@/components/site/order-countdown";

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const order = await getOrderForUser(id, session.user.id);
  if (!order) notFound();

  return (
    <>
      <main className="flex-1">
        <SiteHeader />

        <div className="mx-auto max-w-lg px-6 pt-12 pb-24 text-center">
          <span className="bg-good-soft text-good mx-auto mb-5 flex size-12 items-center justify-center rounded-full">
            <CheckCircle2 className="size-6" />
          </span>
          <h1 className="font-heading text-2xl font-semibold">Thanks — we&rsquo;re on it.</h1>
          <p className="text-muted-foreground mt-2 text-pretty">
            Your {order.serviceName} ({order.packageName}) order is confirmed. {order.tokenCost} tokens were deducted
            from your wallet. Come back and check this page for your report — we&rsquo;ll have it ready before the
            timer below runs out.
          </p>

          <div className="mt-8 flex justify-center">
            <OrderCountdown deadlineAt={order.deadlineAt.toISOString()} />
          </div>

          <div className="border-border bg-card mt-10 space-y-4 rounded-2xl border p-6 text-left">
            {order.status === "DELIVERED" ? (
              <>
                <p className="text-sm font-medium">Your report is ready</p>
                <p className="text-muted-foreground text-sm">{order.reportName}</p>
                <a
                  href={`/api/orders/${order.id}/report`}
                  className="bg-primary text-primary-foreground inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                >
                  <Download className="size-4" />
                  Download report
                </a>
              </>
            ) : (
              <>
                <p className="text-sm font-medium">Your report isn&rsquo;t ready yet</p>
                <p className="text-muted-foreground text-sm">
                  Your specialist is working on it. Once it&rsquo;s submitted, a download button will appear here —
                  and you&rsquo;ll also find it under{" "}
                  <Link href="/dashboard/orders" className="text-foreground underline underline-offset-4">
                    Purchase activity
                  </Link>{" "}
                  in your dashboard.
                </p>
              </>
            )}
          </div>

          <Link href="/dashboard/orders" className="text-primary mt-6 inline-block text-sm font-medium">
            View all your orders
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
