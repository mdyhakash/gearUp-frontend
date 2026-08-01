"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { GearItem } from "@/types/gear";

export function RentWidget({ gear }: { gear: GearItem }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem(
      {
        gearItemId: gear.id,
        name: gear.name,
        image: gear.image,
        dailyRate: gear.dailyRate,
        stock: gear.stock,
      },
      quantity,
    );
    toast.success(`${quantity} × ${gear.name} added to cart`);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-2xl font-bold text-foreground">
          ${gear.dailyRate}
        </span>
        <span className="text-sm text-muted-foreground">/ day</span>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Quantity
        </label>
        <div className="flex items-center rounded-md border border-border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity === 1}
          >
            -
          </Button>
          <span className="flex h-8 min-w-10 items-center justify-center border-x border-border text-sm font-medium">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={() => setQuantity((q) => Math.min(gear.stock, q + 1))}
            disabled={quantity >= gear.stock || gear.stock === 0}
          >
            +
          </Button>
        </div>
      </div>

      <p className="mt-1 text-right text-xs text-muted-foreground">
        {gear.stock} unit{gear.stock !== 1 ? "s" : ""} available
      </p>

      <Button
        onClick={handleAddToCart}
        className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
        disabled={!gear.isAvailable || gear.stock === 0}
      >
        Add to Cart
      </Button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" /> Rental dates & payment are set
        at checkout
      </p>
    </div>
  );
}
