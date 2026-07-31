"use server";
import { authFetch } from "@/lib/auth-fetch";
import { revalidatePath } from "next/cache";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED";
}

export interface UsersMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const getAllUsers = async (params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
  status?: string;
}) => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.searchTerm) query.set("searchTerm", params.searchTerm);
  if (params.role) query.set("role", params.role);
  if (params.status) query.set("status", params.status);

  const result = await authFetch(`/api/admin/users?${query.toString()}`);

  if (!result.success) {
    return { data: [] as AdminUser[], meta: undefined, error: result.message };
  }

  return {
    data: result.data as AdminUser[],
    meta: result.meta as UsersMeta,
    error: null,
  };
};
export const updateUserStatusAction = async (
  userId: string,
  nextStatus: "ACTIVE" | "BLOCKED",
) => {
  const result = await authFetch(`/api/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ status: nextStatus }),
  });
  if (result.success) {
    revalidatePath("/admin-dashboard/users");
  }

  return result;
};
