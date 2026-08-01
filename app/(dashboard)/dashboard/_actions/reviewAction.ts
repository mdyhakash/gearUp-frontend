"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/auth-fetch";
import { GearReview, GearReviewMeta, Review } from "@/types/reviews";

export interface CreateReviewPayload {
  rentalOrderId: string;
  gearItemId: string;
  rating: number;
  comment: string;
}

export async function createReviewAction(payload: CreateReviewPayload) {
  const result = await authFetch("/api/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (result.success) {
    revalidatePath("/dashboard/orders");
    revalidatePath(`/gear/${payload.gearItemId}`);
  }

  return result;
}

export const getMyReviews = async () => {
  const result = await authFetch("/api/reviews/my-reviews");

  if (!result.success) {
    return { data: [] as Review[], error: result.message };
  }

  return {
    data: result.data as Review[],
    error: null,
  };
};

export const getGearReviews = async (gearItemId: string) => {
  const result = await authFetch(`/api/reviews/${gearItemId}`);

  if (!result.success) {
    return {
      data: [] as GearReview[],
      meta: null as GearReviewMeta | null,
      error: result.message,
    };
  }

  return {
    data: result.data as GearReview[],
    meta: result.meta as GearReviewMeta,
    error: null,
  };
};
