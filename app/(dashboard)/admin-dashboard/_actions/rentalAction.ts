import { authFetch } from "@/lib/auth-fetch";
export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export interface RentalItem {
  gearItemId: string;
  quantity: number;
  gearItem: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface RentalPayment {
  id: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
}

export interface RentalCustomer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export interface Rental {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;

  customer: RentalCustomer;
  items: RentalItem[];
  payments: RentalPayment[];
}
export const getAllRentals = async () => {
  const result = await authFetch("/api/admin/rentals");

  if (!result.success) {
    return { data: [] as Rental[], error: result.message };
  }

  return { data: result.data as Rental[], error: null };
};
