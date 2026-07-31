"use client";

import { CreditCard, LayoutDashboard, ListOrdered, Star, UserCircle } from "lucide-react";

import { SidebarNav, DashboardNavItem } from "./sidebar-nav";

const navItems: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
  {
    label: "My Orders",
    href: "/dashboard/orders",
    icon: ListOrdered,
  },
  {
    label: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    label: "Reviews",
    href: "/dashboard/reviews",
    icon: Star,
  },
];

export function CustomerSidebar() {
  return <SidebarNav items={navItems} roleLabel="Customer" />;
}
