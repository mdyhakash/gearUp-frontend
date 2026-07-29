"use client";

import { LayoutDashboard, Package, ListOrdered } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";

const navItems = [
  {
    label: "Overview",
    href: "/provider-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Inventory",
    href: "/provider-dashboard/gear",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/provider-dashboard/orders",
    icon: ListOrdered,
  },
];

export function ProviderSidebar() {
  return <SidebarNav items={navItems} roleLabel="Provider" />;
}
