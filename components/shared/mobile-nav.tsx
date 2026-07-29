"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, Settings } from "lucide-react";
import { toast } from "sonner";

import { logout } from "@/service/logout";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import type { NavbarProps } from "@/types/user";

type MobileNavProps = {
  navLinks: {
    label: string;
    href: string;
  }[];
} & NavbarProps;

export function MobileNav({ navLinks, user }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");

  const handleLogout = async () => {
    await logout();
    toast.success("User Logged Out Successfully!");
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex items-center md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="flex w-72 flex-col bg-background">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle asChild>
              <Logo />
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-1 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-border pt-6">
            {user?.success ? (
              <>
                <div className="mb-5 px-3">
                  <p className="font-semibold">{user.data.result.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {user.data.result.email}
                  </p>

                  <span className="mt-2 inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium uppercase">
                    {user.data.result.role}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link
                      href={isDashboard ? "/gear" : "/dashboard"}
                      onClick={() => setOpen(false)}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {isDashboard ? "Browse Gear" : "Dashboard"}
                    </Link>
                  </Button>

                  <Button variant="ghost" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                </Button>

                <Button asChild>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
