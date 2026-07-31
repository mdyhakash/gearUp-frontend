"use server";
import { authFetch } from "@/lib/auth-fetch";
import { Rental } from "@/types/rental";

export const getMyRentals = async () => {
  const result = await authFetch("/api/rentals");

  if (!result.success) {
    return { data: [] as Rental[], meta: null, error: result.message };
  }

  return { data: result.data as Rental[], meta: result.meta, error: null };
};
