import { authFetch } from "@/lib/auth-fetch";
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

export const getAllGear = async () => {
  const result = await authFetch("/api/admin/gear");

  if (!result.success) {
    return { data: [] as GearItem[], error: result.message };
  }

  return { data: result.data as GearItem[], error: null };
};
