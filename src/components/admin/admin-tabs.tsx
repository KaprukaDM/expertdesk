"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, FileSearch, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/admin", label: "Orders", icon: Package, exact: true },
  { href: "/admin/requests", label: "Brand study requests", icon: FileSearch, exact: false },
  { href: "/admin/services", label: "Services", icon: Tag, exact: false },
] as const;

export function AdminTabs() {
  const pathname = usePathname();

  return (
    <div className="bg-muted inline-flex items-center gap-1 rounded-lg p-[3px]">
      {TABS.map((tab) => {
        const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium transition-colors",
              active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
