"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function CartButton() {
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  useEffect(() => setMounted(true), []);

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {mounted && count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
            {count}
          </span>
        )}
      </Link>
    </Button>
  );
}
