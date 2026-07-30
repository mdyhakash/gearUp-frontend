export type GearCondition = "NEW" | "GOOD" | "FAIR" | "DAMAGED";
export interface GearItem {
  id: string;
  name: string;
  brand?: string;
  image?: string;
  dailyRate: number;
  stock: number;
  condition: GearCondition;
  isAvailable: boolean;
  category: {
    id: string;
    name: string;
    description: string | null;
  };
  provider: {
    id: string;
    name: string;
    email: string;
  };
  rating?: number;
}