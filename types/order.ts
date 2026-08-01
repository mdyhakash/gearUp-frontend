import { GearCondition } from "./gear";
import { RentalStatus } from "./rental";

export interface ProviderOrder {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
  };
  items: {
    id: string;
    quantity: number;
    dailyRate: number;
    subtotal: number;
    gearItem: {
      id: string;
      name: string;
      image: string;
      condition: GearCondition;
    };
  }[];
}