"use client";

import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (gearItemId: string) => void;
  updateQuantity: (gearItemId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const existing = get().items.find(
          (i) => i.gearItemId === item.gearItemId,
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.gearItemId === item.gearItemId
                ? { ...i, quantity: Math.min(i.stock, i.quantity + quantity) }
                : i,
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity }] });
        }
      },
      removeItem: (gearItemId) =>
        set({ items: get().items.filter((i) => i.gearItemId !== gearItemId) }),
      updateQuantity: (gearItemId, quantity) =>
        set({
          items: get().items.map((i) =>
            i.gearItemId === gearItemId
              ? { ...i, quantity: Math.max(1, Math.min(i.stock, quantity)) }
              : i,
          ),
        }),
      clearCart: () => set({ items: [] }),
    }),
    { name: "gearup-cart" },
  ),
);
