import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="h-9 w-9 text-destructive" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-foreground">
          Payment Failed
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          We couldn't complete your payment. No charges were made to your
          account. Please try again or use a different payment method.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link href="/dashboard/orders">Try Again</Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/gear">Browse More Gear</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
