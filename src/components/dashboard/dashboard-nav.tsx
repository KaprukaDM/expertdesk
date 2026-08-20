"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, type NavCounts } from "./nav-items";

export function DashboardNav({ counts }: { counts: NavCounts }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        const badge = counts[item.href];

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {badge?.count ? (
              <span
                className={cn(
                  "flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                  active
                    ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                    : badge.alert
                      ? "bg-warning text-white"
                      : "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
              >
                {badge.count}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
