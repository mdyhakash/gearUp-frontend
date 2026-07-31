"use server";
import { authFetch } from "@/lib/auth-fetch";
import { Rental } from "@/types/rental";
export const getAllRentals = async () => {
  const result = await authFetch("/api/admin/rentals");

  if (!result.success) {
    return { data: [] as Rental[], error: result.message };
  }

  return { data: result.data as Rental[], error: null };
};
