"use server";
import { authFetch } from "@/lib/auth-fetch";
import { CreateRentalOrder, Rental } from "@/types/rental";

export const getMyRentals = async () => {
  const result = await authFetch("/api/rentals");

  if (!result.success) {
    return { data: [] as Rental[], meta: null, error: result.message };
  }

  return { data: result.data as Rental[], meta: result.meta, error: null };
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
