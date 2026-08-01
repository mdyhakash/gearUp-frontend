"use server";

import { authFetch } from "@/lib/auth-fetch";
import { GearItem } from "@/types/gear";

export type GearSearchParams = {
  searchTerm?: string;
  categoryId?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  condition?: string;
  isAvailable?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
};

export const getAllGear = async (filters: GearSearchParams = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const qs = params.toString();
  const result = await authFetch(`/api/gear${qs ? `?${qs}` : ""}`);

  if (!result.success) {
    return { data: [] as GearItem[], meta: null, error: result.message };
  }
  return { data: result.data as GearItem[], meta: result.meta, error: null };
};

export const getGearById = async (gearId: string) => {
  const result = await authFetch(`/api/gear/${gearId}`);

  if (!result.success) {
    return { data: null as GearItem | null, error: result.message };
  }

  return { data: result.data as GearItem, error: null };
};
