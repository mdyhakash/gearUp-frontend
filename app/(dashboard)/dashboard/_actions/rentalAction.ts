"use server";
import { authFetch } from "@/lib/auth-fetch";
import { CreateRentalOrder, Rental } from "@/types/rental";
import { revalidatePath } from "next/cache";

export const getMyRentals = async () => {
  const result = await authFetch("/api/rentals");

  if (!result.success) {
    return { data: [] as Rental[], meta: null, error: result.message };
  }

  return { data: result.data as Rental[], meta: result.meta, error: null };
};

export const getRentalById = async (id: string) => {
  const result = await authFetch(`/api/rentals/${id}`);

  if (!result.success) {
    return { data: null as Rental | null, error: result.message };
  }

  return {
    data: result.data as Rental,
    error: null,
  };
};

export const createRentalOrder = async (payload: CreateRentalOrder) => {
  const result = await authFetch("/api/rentals", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!result.success) {
    return { data: null, error: result.message };
  }

  return { data: result.data as Rental, error: null };
};

export const cancelRentalOrder = async (rentalId: string) => {
  const result = await authFetch(`/api/rentals/${rentalId}/cancel`, {
    method: "PATCH",
  });

  if (!result.success) {
    return { success: false, error: result.message };
  }

  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard");

  return { success: true, error: null };
};
