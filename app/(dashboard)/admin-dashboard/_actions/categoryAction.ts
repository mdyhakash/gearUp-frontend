"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function authFetch(path: string, options: RequestInit = {}) {
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
  return { success: true as const, data: json.data };
}
export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export async function getAllCategories() {
  const result = await authFetch("/api/categories");

  if (!result.success) {
    return { data: [] as Category[], error: result.message };
  }

  return { data: result.data as Category[], error: null };
}
type CategoryActionState = { success: boolean; message: string };

export async function createCategoryAction(
  prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  console.log({
    name,
    description,
  });
  const result = await authFetch("/api/categories", {
    method: "POST",
    body: JSON.stringify({ name, description }),
  });

  if (result.success) revalidatePath("/admin-dashboard/categories");

  return {
    success: result.success,
    message: result.success ? "Category created." : result.message,
  };
}

export async function updateCategoryAction(
  categoryId: string,
  prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const name = formData.get("name") as string;
  //const description = formData.get("description") as string;

  const result = await authFetch(`/api/categories/${categoryId}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });

  if (result.success) revalidatePath("/admin-dashboard/categories");

  return {
    success: result.success,
    message: result.success ? "Category updated." : result.message,
  };
}

export async function deleteCategoryAction(categoryId: string) {
  const result = await authFetch(`/api/categories/${categoryId}`, {
    method: "DELETE",
  });

  if (result.success) revalidatePath("/admin-dashboard/categories");

  return result;
}
