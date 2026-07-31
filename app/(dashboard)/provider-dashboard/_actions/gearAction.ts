"use server";
import { authFetch } from "@/lib/auth-fetch";
import { GearActionState, GearItem } from "@/types/gear";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAllProviderGear = async () => {
  const result = await authFetch("/api/gear");

  if (!result.success) {
    return { data: [] as GearItem[], error: result.message };
  }

  return { data: result.data as GearItem[], error: null };
};
export const getGearById = async (gearId: string) => {
  const result = await authFetch(`/api/gear/${gearId}`);

  if (!result.success) {
    return { data: null as GearItem | null, error: result.message };
  }

  return { data: result.data as GearItem, error: null };
};

export const createGearAction = async (
  prevState: GearActionState,
  formData: FormData,
): Promise<GearActionState> => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const brand = formData.get("brand") as string;
  const image = formData.get("image") as string;
  const dailyRate = formData.get("dailyRate") as string;
  const stock = formData.get("stock") as string;
  const condition = formData.get("condition") as string;
  const categoryId = formData.get("categoryId") as string;
  const isAvailable = formData.get("isAvailable") === "true";
  const payload = {
    name,
    description,
    brand,
    image,
    dailyRate: Number(dailyRate),
    stock: Number(stock),
    condition,
    categoryId,
    isAvailable,
  };
  const result = await authFetch("/api/gear", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (result.success) {
    revalidatePath("/provider-dashboard/gear");
    redirect("/provider-dashboard/gear");
  }

  return {
    success: result.success,
    message: result.success ? "Gear created." : result.message,
  };
};

export const UpdateGearAction = async (
  gearId: string,
  prevState: GearActionState,
  formData: FormData,
): Promise<GearActionState> => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const brand = formData.get("brand") as string;
  const image = formData.get("image") as string;
  const dailyRate = formData.get("dailyRate") as string;
  const stock = formData.get("stock") as string;
  const condition = formData.get("condition") as string;
  const categoryId = formData.get("categoryId") as string;
  const isAvailable = formData.get("isAvailable") === "true";

  const payload = {
    name,
    description,
    brand,
    image,
    dailyRate: Number(dailyRate),
    stock: Number(stock),
    condition,
    categoryId,
    isAvailable,
  };

  const result = await authFetch(`/api/gear/${gearId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (result.success) {
    revalidatePath("/provider-dashboard/gear");
    redirect("/provider-dashboard/gear");
  }

  return {
    success: result.success,
    message: result.success ? "Gear updated." : result.message,
  };
};

export const deleteGearAction = async (gearId: string) => {
  const result = await authFetch(`/api/gear/${gearId}`, {
    method: "DELETE",
  });

  if (result.success) revalidatePath("/provider-dashboard/gear");

  return result;
};
