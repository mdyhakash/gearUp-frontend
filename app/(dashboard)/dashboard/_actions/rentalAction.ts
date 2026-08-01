"use server";
import { authFetch } from "@/lib/auth-fetch";
import { CreateRentalOrder, Rental } from "@/types/rental";
import { revalidatePath } from "next/cache";

export const getMyRentals = async (params?: {
  page?: string;
  limit?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", params.page);
  if (params?.limit) query.set("limit", params.limit);
  const qs = query.toString();

  const result = await authFetch(`/api/rentals${qs ? `?${qs}` : ""}`);

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
