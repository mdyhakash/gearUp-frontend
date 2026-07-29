import { redirect } from "next/navigation";
import { getMe } from "@/service/getMe";
import { ProfileView } from "@/components/profile/profile-view";

export default async function CustomerProfilePage() {
  const currentUser = await getMe();
  if (!currentUser.success) redirect("/login");

  return (
    <ProfileView
      user={currentUser.data.result}
      dangerZoneText="Deactivating your account will cancel any pending rentals."
    />
  );
}
