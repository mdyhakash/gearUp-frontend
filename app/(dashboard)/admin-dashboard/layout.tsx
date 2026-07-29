import { getMe } from "@/service/getMe";
import { DashboardShell } from "../_components/dashboard-shell";
import { AdminSidebar } from "../_components/admin-sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getMe();

  return (
    <DashboardShell
      user={currentUser.data.result}
      pageTitle="Admin Panel"
      roleLabel="Admin"
      sidebar={<AdminSidebar />}
    >
      {children}
    </DashboardShell>
  );
}