import { CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getRentalById } from "../../_actions/rentalAction";

export default async function PayOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: rental, error } = await getRentalById(id);

  return (
    <div className="mx-auto max-w-lg">
      {error || !rental ? (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error ?? "Rental not found."}
        </p>
      ) : (
        <>
          <h2 className="font-display text-xl font-bold text-foreground">
            Complete Payment
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Order #{rental.id.slice(0, 8)}
          </p>

          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <div className="space-y-2 font-mono text-sm">
              {rental.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-muted-foreground"
                >
                  <span>
                    {item.gearItem.name} × {item.quantity}
                  </span>
                  <span>${item.subtotal}</span>
                </div>
              ))}

              <Separator className="my-2" />

              <div className="flex justify-between text-base font-bold text-foreground">
                <span>Total due</span>
                <span>${rental.totalAmount}</span>
              </div>
            </div>

            <Separator className="my-5" />

            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Choose payment method
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled
                className="cursor-not-allowed opacity-50 flex flex-col items-center gap-2 rounded-lg border-2 border-border bg-muted p-4"
              >
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  Stripe
                </span>
                <span className="text-xs text-muted-foreground">
                  Coming Soon
                </span>
              </button>

              <button
                type="button"
                className="flex flex-col items-center gap-2 rounded-lg border-2 border-primary bg-primary/5 p-4"
              >
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  SSLCommerz
                </span>
              </button>
            </div>

            {rental.status !== "CONFIRMED" && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Your order must be confirmed by the provider before payment can
                be made.
              </p>
            )}
            <Button
              size="lg"
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={rental.status !== "CONFIRMED"}
            >
              {rental.status === "CONFIRMED"
                ? `Pay $${rental.totalAmount} Securely`
                : "Waiting for Confirmation"}
            </Button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Encrypted & PCI-compliant checkout
            </p>
          </div>
        </>
      )}
    </div>
  );
}
