import { authFetch } from "@/lib/auth-fetch";
import { GearItem } from "@/types/gear";

export const getAllGear = async () => {
  const result = await authFetch("/api/admin/gear");

  if (!result.success) {
    return { data: [] as GearItem[], error: result.message };
  }

  return { data: result.data as GearItem[], error: null };
};
