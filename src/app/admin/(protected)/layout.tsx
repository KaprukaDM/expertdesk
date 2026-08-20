import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/users";
import { Logo } from "@/components/site/logo";
import { LogoutButton } from "@/components/site/logout-button";
import { AdminTabs } from "@/components/admin/admin-tabs";

// Gate for the agency back-office. Lives in the (protected) route group so it wraps the real
// admin pages but NOT /admin/login — an unauthenticated agent must be able to reach the door.
// Unauthenticated -> agency login (not the client login); wrong role -> the client dashboard.
//
// Also the shared shell (logo, nav tabs, logout) for every admin page — previously every page
// re-declared this header, which drifted over time. One place now.
export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  const user = await getCurrentUser(session.user.id);
  if (user?.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-border bg-card sticky top-0 z-10 border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Logo href="/admin" />
            <AdminTabs />
          </div>
          <LogoutButton callbackUrl="/admin/login" />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
