"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const authFetch = async (path: string, options: RequestInit = {}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
      ...options.headers,
    },
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    return {
      success: false as const,
      message: json?.message ?? "Something went wrong.",
    };
  }
  return { success: true as const, data: json.data, meta: json.meta };
};
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

export async function getAllUsers(params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
  status?: string;
}) {
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
}
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
