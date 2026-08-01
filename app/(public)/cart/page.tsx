import { CartView } from "@/components/cart/cart-view";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
        Your Cart
      </h1>
      <CartView />
    </div>
  );
}
