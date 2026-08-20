import type { ReactNode } from "react";
import Link from "next/link";
import { Wallet as WalletIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/site/logo";
import { LogoutButton } from "@/components/site/logout-button";
import { DashboardNav } from "./dashboard-nav";
import { DashboardMobileNav } from "./dashboard-mobile-nav";
import type { NavCounts } from "./nav-items";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function DashboardShell({
  name,
  businessName,
  walletBalance,
  counts,
  children,
}: {
  name: string;
  businessName?: string | null;
  walletBalance: number;
  counts: NavCounts;
  children: ReactNode;
}) {
  return (
    <div className="lg:flex lg:min-h-dvh">
      <aside className="border-sidebar-border bg-sidebar lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0 lg:flex-col lg:border-r">
        <div className="hidden px-5 py-5 lg:block">
          <Logo />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:overflow-y-auto">
          <DashboardNav counts={counts} />
          <div className="border-sidebar-border mx-3 mb-3 flex items-center gap-3 rounded-xl border p-3">
            <Avatar size="sm">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                {initials(name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sidebar-foreground truncate text-sm font-medium">{name}</p>
              {businessName && <p className="text-muted-foreground truncate text-xs">{businessName}</p>}
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="border-border bg-background/80 sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 backdrop-blur lg:h-16 lg:px-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/dashboard/wallet"
              className="border-border bg-card hover:bg-muted flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
            >
              <WalletIcon className="text-primary size-4" />
              <span className="font-mono tabular-nums">{walletBalance}</span>
              <span className="text-muted-foreground hidden sm:inline">tokens</span>
            </Link>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 px-4 pt-6 pb-24 lg:px-8 lg:pt-8 lg:pb-8">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>

      <DashboardMobileNav counts={counts} />
    </div>
  );
}
