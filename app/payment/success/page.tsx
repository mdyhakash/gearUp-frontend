import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="h-9 w-9" />
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold text-foreground">
        Payment Successful
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your rental is confirmed. The provider has been notified and will
        prepare your gear for pickup.
      </p>
      <div className="mt-6 w-full rounded-xl border border-border bg-card p-4 text-left font-mono text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order</span>
          <span>ORD-1042</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-muted-foreground">Amount paid</span>
          <span>$58.00</span>
        </div>
      </div>
      <div className="mt-8 flex w-full gap-2 flex-col">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/dashboard/orders">View My Orders</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/gear">Continue Browsing</Link>
        </Button>
      </div>
    </div>
  );
}
