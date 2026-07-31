export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface PaymentRentalOrder {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  rentalOrderId: string;
  customerId: string;
  transactionId: string;
  amount: number;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  rentalOrder: PaymentRentalOrder;
}
