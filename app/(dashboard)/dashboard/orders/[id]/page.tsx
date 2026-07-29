import { CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PayOrderPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto max-w-lg">
      <h2 className="font-display text-xl font-bold text-foreground">
        Complete Payment
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">Order {params.id}</p>

      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="space-y-2 font-mono text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>4-Person Dome Tent × 3 days</span>
            <span>$54</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Service fee</span>
            <span>$4</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-base font-bold text-foreground">
            <span>Total due</span>
            <span>$58</span>
          </div>
        </div>

        <Separator className="my-5" />

        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Choose payment method
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-primary bg-primary/5 p-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Stripe
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-border p-4 hover:border-primary/40">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">
              SSLCommerz
            </span>
          </button>
        </div>

        <Button
          size="lg"
          className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Pay $58 Securely
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" /> Encrypted & PCI-compliant
          checkout
        </p>
      </div>
    </div>
  );
}
