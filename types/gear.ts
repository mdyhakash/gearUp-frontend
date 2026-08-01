export type GearCondition = "NEW" | "GOOD" | "FAIR" | "DAMAGED";
export interface GearItem {
  id: string;
  name: string;
  description?: string;
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
export interface Gear {
  id: string;
  name: string;
  description: string;
  brand: string;
  image: string;
  dailyRate: number;
  stock: number;
  condition: string;
  isAvailable: boolean;
  categoryId: string;
}
export type GearActionState = {
  success: boolean;
  message: string;
};
