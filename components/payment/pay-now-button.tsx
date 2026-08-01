"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createPayment } from "@/app/(dashboard)/dashboard/_actions/paymentAction";
import { cn } from "@/lib/utils";

type Props = {
  rentalId: string;
  amount: number;
  className?: string;
};

export function PayNowButton({ rentalId, amount, className }: Props) {
  const [isPending, startTransition] = useTransition();

  const handlePay = () => {
    startTransition(async () => {
      const result = await createPayment(rentalId);

      if (!result.success || !result.paymentUrl) {
        toast.error(result.message);
        return;
      }

      window.location.href = result.paymentUrl;
    });
  };

  return (
    <Button
      size="lg"
      onClick={handlePay}
      disabled={isPending}
      className={cn("bg-primary hover:bg-primary/90", className)}
    >
      {isPending ? "Redirecting..." : `Pay $${amount} Securely`}
    </Button>
  );
}
