import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/users";

// Gate for the agency back-office. Lives in the (protected) route group so it wraps the real
// admin pages but NOT /admin/login — an unauthenticated agent must be able to reach the door.
// Unauthenticated -> agency login (not the client login); wrong role -> the client dashboard.
export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  const user = await getCurrentUser(session.user.id);
  if (user?.role !== "ADMIN") redirect("/dashboard");

  return <>{children}</>;
}
