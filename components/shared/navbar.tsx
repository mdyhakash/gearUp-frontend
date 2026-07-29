"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";

const navLinks = [
  { label: "Browse Gear", href: "/gear" },
  { label: "How It Works", href: "/#how-it-works" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-2 items-center px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Logo />

        <nav className="hidden items-center justify-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/register">Get Started</Link>
          </Button>

          {/* Signed-in state example */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-2 hidden">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-semibold">
                    AK
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-end lg:hidden">
          <MobileNav navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
