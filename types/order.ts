import { RentalStatus } from "./rental";

export interface ProviderOrder {
  id: string;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  customer: {
    name: string;
  };
  items: {
    gearItem: {
      name: string;
    };
  }[];
}
