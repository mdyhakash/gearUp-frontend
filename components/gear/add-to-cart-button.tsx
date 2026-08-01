// components/gear/add-to-cart-button.tsx
"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { GearItem } from "@/types/gear";

export function AddToCartButton({
  gear,
  className,
  variant = "icon",
}: {
  gear: GearItem;
  className?: string;
  variant?: "icon" | "full";
}) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      gearItemId: gear.id,
      name: gear.name,
      image: gear.image,
      dailyRate: gear.dailyRate,
      stock: gear.stock,
    });
    toast.success(`${gear.name} added to cart`);
  };

  if (variant === "full") {
    return (
      <Button
        variant="outline"
        className={className}
        disabled={!gear.isAvailable || gear.stock === 0}
        onClick={handleAdd}
      >
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      className={className}
      disabled={!gear.isAvailable || gear.stock === 0}
      onClick={handleAdd}
    >
      <ShoppingCart className="h-4 w-4" />
    </Button>
  );
}
