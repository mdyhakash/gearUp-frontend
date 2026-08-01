"use server";
import { authFetch } from "@/lib/auth-fetch";
import { GearItem } from "@/types/gear";

export const getAllGear = async (params?: {
  page?: string;
  limit?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", params.page);
  if (params?.limit) query.set("limit", params.limit);
  const qs = query.toString();

  const result = await authFetch(`/api/admin/gear${qs ? `?${qs}` : ""}`);

  if (!result.success) {
    return { data: [] as GearItem[], meta: null, error: result.message };
  }
  return { data: result.data as GearItem[], meta: result.meta, error: null };
};
