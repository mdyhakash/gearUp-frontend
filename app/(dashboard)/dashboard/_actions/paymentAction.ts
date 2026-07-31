import { authFetch } from "@/lib/auth-fetch";
import { Payment } from "@/types/payment";

export async function getMyPayments() {
  const result = await authFetch("/api/payments");

  if (!result.success) {
    return {
      data: [] as Payment[],
      error: result.message,
    };
  }

  return {
    data: result.data as Payment[],
    error: null,
  };
}

export const getPaymentsById = async (id: string) => {
  const result = await authFetch(`/api/payments/${id}`);

  if (!result.success) {
    return { data: null as Payment | null, error: result.message };
  }

  return {
    data: result.data as Payment,
    error: null,
  };
};
