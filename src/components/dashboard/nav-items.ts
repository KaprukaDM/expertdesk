import { FileSearch, LayoutGrid, Package, Store, Wallet } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid, exact: true },
  { href: "/services", label: "See services", icon: Store, exact: false },
  { href: "/dashboard/requests", label: "Requests", icon: FileSearch, exact: false },
  { href: "/dashboard/orders", label: "Orders", icon: Package, exact: false },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet, exact: false },
] as const;

export type NavCounts = Partial<Record<(typeof NAV_ITEMS)[number]["href"], { count: number; alert?: boolean }>>;
