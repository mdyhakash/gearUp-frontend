"use server";
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

export async function createPayment(rentalOrderId: string) {
  const result = await authFetch("/api/payments/create", {
    method: "POST",
    body: JSON.stringify({
      rentalOrderId,
    }),
  });

  if (!result.success) {
    return {
      success: false,
      paymentUrl: null,
      transactionId: null,
      message: result.message,
    };
  }

  return {
    success: true,
    paymentUrl: result.data.paymentUrl,
    transactionId: result.data.transactionId,
    message: result.message,
  };
}
