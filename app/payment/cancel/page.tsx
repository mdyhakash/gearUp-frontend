import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <XCircle className="h-9 w-9" />
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold text-foreground">
        Payment Cancelled
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your payment wasn&apos;t completed. No charges were made — you can try
        again anytime before your reservation expires.
      </p>
      <div className="mt-8 flex w-full flex-col gap-2">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/dashboard/orders">Try Payment Again</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
