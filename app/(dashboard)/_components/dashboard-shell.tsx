"use client";

import { Logo } from "@/components/shared/logo";
import { LayoutDashboard, ListOrdered, Star } from "lucide-react";
import { SidebarNav, DashboardNavItem } from "./sidebar-nav";
import { DashboardHeader } from "./dashboard-header";
import type { User } from "@/types/user";

const navItems: DashboardNavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "/dashboard/orders", icon: ListOrdered },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
];

type DashboardShellProps = {
  user: User;
  children: React.ReactNode;
};

export function DashboardShell({ user, children }: DashboardShellProps) {
  return (
    <div className="mx-auto flex max-w-[1600px]">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo />
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <SidebarNav items={navItems} roleLabel="Customer" />
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardHeader
          navItems={navItems}
          roleLabel="Customer"
          pageTitle="My Account"
          user={user}
        />

        <main className="flex-1 bg-background p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
