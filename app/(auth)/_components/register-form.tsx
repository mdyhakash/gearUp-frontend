"use client";

import { useState } from "react";
import Link from "next/link";
import { Tent, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const roles = [
  {
    value: "CUSTOMER",
    label: "Rent Gear",
    desc: "Browse and rent equipment",
    icon: ShoppingBag,
  },
  {
    value: "PROVIDER",
    label: "List Gear",
    desc: "Rent out your equipment",
    icon: Tent,
  },
] as const;

export function RegisterForm() {
  const [role, setRole] = useState<(typeof roles)[number]["value"]>("CUSTOMER");

  return (
    <form className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {roles.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => setRole(r.value)}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border-2 p-3.5 text-left transition-colors",
              role === r.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40",
            )}
          >
            <r.icon
              className={cn(
                "h-5 w-5",
                role === r.value ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span className="text-sm font-semibold text-foreground">
              {r.label}
            </span>
            <span className="text-xs text-muted-foreground">{r.desc}</span>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" placeholder="Jordan Lee" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email">Email</Label>
        <Input id="reg-email" type="email" placeholder="you@example.com" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+1 555 0100" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-password">Password</Label>
          <Input id="reg-password" type="password" placeholder="••••••••" />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Create account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
