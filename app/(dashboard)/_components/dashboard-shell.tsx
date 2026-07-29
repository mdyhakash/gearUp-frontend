import { Logo } from "@/components/shared/logo";
import { DashboardHeader } from "./dashboard-header";
import { User } from "@/types/user";

type DashboardShellProps = {
  user: User;
  pageTitle: string;
  roleLabel: string;
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export function DashboardShell({
  user,
  pageTitle,
  roleLabel,
  sidebar,
  children,
}: DashboardShellProps) {
  return (
    <div className="mx-auto flex max-w-[1600px]">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo />
        </div>

        <div className="flex-1 overflow-y-auto py-4">{sidebar}</div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardHeader
          user={user}
          pageTitle={pageTitle}
          roleLabel={roleLabel}
          sidebar={sidebar}
        />

        <main className="flex-1 bg-background p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
