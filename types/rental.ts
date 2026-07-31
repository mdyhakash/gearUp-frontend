export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export interface RentalItem {
  id: string;
  gearItemId: string;
  quantity: number;
  dailyRate: number;
  subtotal: number;
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

export interface CreateRentalOrder {
  startDate: string;
  endDate: string;
  items: {
    gearItemId: string;
    quantity: number;
  }[];
}
export type UpdatableRentalStatus =
  | "CONFIRMED"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";
