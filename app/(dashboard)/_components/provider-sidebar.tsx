"use client";

import {
  LayoutDashboard,
  Package,
  ListOrdered,
  UserCircle,
} from "lucide-react";
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
  {
    label: "My Profile",
    href: "/provider-dashboard/profile",
    icon: UserCircle,
  },
];

export function ProviderSidebar() {
  return <SidebarNav items={navItems} roleLabel="Provider" />;
}
