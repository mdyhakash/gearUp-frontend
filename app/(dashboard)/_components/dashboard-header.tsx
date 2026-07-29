"use client";
import type { User } from "@/types/user";
import { Bell, Menu, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { SidebarNav, DashboardNavItem } from "./sidebar-nav";
import { UserMenu } from "@/components/shared/user-menu";

type DashboardHeaderProps = {
  navItems: DashboardNavItem[];
  roleLabel: string;
  pageTitle: string;
  user: User;
};
export function DashboardHeader({
  navItems,
  roleLabel,
  pageTitle,
  user,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-card p-0">
            <SheetHeader className="border-b border-border px-5 py-5">
              <SheetTitle asChild>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <SidebarNav items={navItems} roleLabel={roleLabel} />
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="font-display text-lg font-bold text-foreground sm:text-xl">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4.5 w-4.5" />
        </Button>
        <UserMenu user={user} />
      </div>
    </header>
  );
}
