"use server";
import { authFetch } from "@/lib/auth-fetch";
import { revalidatePath } from "next/cache";
export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export type UpdatableRentalStatus =
  | "CONFIRMED"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export interface ProviderOrder {
  id: string;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  customer: {
    name: string;
  };
  items: {
    gearItem: {
      name: string;
    };
  }[];
}
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
