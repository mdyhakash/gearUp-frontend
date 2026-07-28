export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";
export type GearCondition = "NEW" | "GOOD" | "FAIR" | "DAMAGED";
export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface GearItem {
  id: string;
  name: string;
  brand?: string;
  image?: string;
  dailyRate: number;
  stock: number;
  condition: GearCondition;
  isAvailable: boolean;
  category: string;
  providerName: string;
  rating?: number;
}
