"use client";
import { Logo } from "@/components/shared/logo";
import { LayoutDashboard, Users, Package, ListOrdered } from "lucide-react";
import { DashboardNavItem, SidebarNav } from "../_components/sidebar-nav";
import { DashboardHeader } from "../_components/dashboard-header";

const navItems: DashboardNavItem[] = [
  { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin-dashboard/users", icon: Users },
  { label: "Gear Moderation", href: "/admin-dashboard/gear", icon: Package },
  { label: "Orders", href: "/admin-dashboard/orders", icon: ListOrdered },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[1600px]">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
        <div className="border-b border-border px-5 py-5">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarNav items={navItems} roleLabel="Admin" />
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardHeader
          navItems={navItems}
          roleLabel="Admin"
          pageTitle="Admin Console"
        />
        <main className="flex-1 bg-background p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
