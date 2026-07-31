"use server";
import { authFetch } from "@/lib/auth-fetch";
import { ProviderOrder } from "@/types/order";
import { UpdatableRentalStatus } from "@/types/rental";
import { revalidatePath } from "next/cache";

export const getProviderOrder = async () => {
  const result = await authFetch("/api/provider/orders");

  if (!result.success) {
    return { data: [] as ProviderOrder[], error: result.message };
  }

  return { data: result.data as ProviderOrder[], error: null };
};

export const updateProviderOrderStatus = async (
  orderId: string,
  status: UpdatableRentalStatus,
) => {
  const result = await authFetch(`/api/provider/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  if (result.success) {
    revalidatePath("/provider-dashboard/orders");
  }

  return result;
};
