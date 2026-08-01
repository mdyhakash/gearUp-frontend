"use server";

import { authFetch } from "@/lib/auth-fetch";

export type Category = {
  id: string;
  name: string;
  description: string | null;
};

export const getAllCategories = async () => {
  const result = await authFetch("/api/categories");
  if (!result.success) {
    return { data: [] as Category[], error: result.message };
  }
  return { data: result.data as Category[], error: null };
};
