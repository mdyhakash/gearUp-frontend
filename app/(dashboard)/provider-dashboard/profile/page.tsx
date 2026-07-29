import { redirect } from "next/navigation";
import { getMe } from "@/service/getMe";
import { ProfileView } from "@/components/profile/profile-view";

export default async function ProviderProfilePage() {
  const currentUser = await getMe();
  if (!currentUser.success) redirect("/login");

  return (
    <ProfileView
      user={currentUser.data.result}
      dangerZoneText="Deactivating your account will unlist all your gear and cancel active rentals."
    />
  );
}
