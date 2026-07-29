import { DashboardShell } from "../_components/dashboard-shell";
import { ProviderSidebar } from "../_components/provider-sidebar";
import { getMe } from "@/service/getMe";

export default async function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getMe();

  return (
    <DashboardShell
      user={currentUser.data.result}
      pageTitle="Provider Portal"
      roleLabel="Provider"
      sidebar={<ProviderSidebar />}
    >
      {children}
    </DashboardShell>
  );
}
