"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";


export function MobileNav({
  navLinks,
}: {
  navLinks: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 bg-background">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle asChild>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-2 border-t border-border px-4 py-6">
            <Button variant="outline" asChild>
              <Link href="/login" onClick={() => setOpen(false)}>
                Log in
              </Link>
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/register" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
