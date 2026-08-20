"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, type NavCounts } from "./nav-items";

export function DashboardMobileNav({ counts }: { counts: NavCounts }) {
  const pathname = usePathname();

  return (
    <nav className="border-border bg-card/95 fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      {NAV_ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        const badge = counts[item.href];

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium"
          >
            <Icon className={cn("size-5", active ? "text-primary" : "text-muted-foreground")} />
            <span className={active ? "text-primary" : "text-muted-foreground"}>{item.label}</span>
            {badge?.count ? (
              <span
                className={cn(
                  "absolute top-1.5 right-[28%] size-2 rounded-full",
                  badge.alert ? "bg-warning" : "bg-primary",
                )}
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
