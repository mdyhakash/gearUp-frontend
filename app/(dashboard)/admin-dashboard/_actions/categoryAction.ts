"use server";
import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/auth-fetch";

export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export const getAllCategories = async () => {
  const result = await authFetch("/api/categories");

  if (!result.success) {
    return { data: [] as Category[], error: result.message };
  }

  return { data: result.data as Category[], error: null };
};
type CategoryActionState = { success: boolean; message: string };

export const createCategoryAction = async (
  prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> => {
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
};

export const updateCategoryAction = async (
  categoryId: string,
  prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> => {
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
};

export const deleteCategoryAction = async (categoryId: string) => {
  const result = await authFetch(`/api/categories/${categoryId}`, {
    method: "DELETE",
  });

  if (result.success) revalidatePath("/admin-dashboard/categories");

  return result;
};
