import { getMe } from "@/service/getMe";
import { DashboardShell } from "../_components/dashboard-shell";

export default async function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getMe();

  return (
    <DashboardShell user={currentUser.data.result}>{children}</DashboardShell>
  );
}
