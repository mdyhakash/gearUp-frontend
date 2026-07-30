"use client";

import { logout } from "@/service/logout";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { UserMenuProps } from "@/types/user";

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");

  const dashboardRoutes = {
    ADMIN: "/admin-dashboard",
    PROVIDER: "/provider-dashboard",
    CUSTOMER: "/dashboard",
  } as const;
  const navLink = {
    href: isDashboard ? "/gear" : dashboardRoutes[user.role],
    label: isDashboard ? "Browse Gear" : "Dashboard",
  };
  const handlelogout = async () => {
    await logout();
    toast.success("User Logged Out Successfully!");
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ml-2">
          <Avatar className="h-9 w-9 border">
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-semibold">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {/* Profile Header */}
        <div className="flex items-center gap-3 p-3">
          <Avatar className="h-10 w-10 border">
            <AvatarFallback className="bg-secondary text-sm font-semibold">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
            <span className="mt-1 inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium uppercase">
              {user.role}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={navLink.href}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            {navLink.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlelogout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
