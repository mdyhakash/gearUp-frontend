import { getMe } from "@/service/getMe";
import { DashboardShell } from "../_components/dashboard-shell";
import { CustomerSidebar } from "../_components/customer-sidebar";

export default async function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getMe();

  return (
    <DashboardShell
      user={currentUser.data.result}
      pageTitle="My Account"
      roleLabel="Customer"
      sidebar={<CustomerSidebar />}
    >
      {children}
    </DashboardShell>
  );
}
