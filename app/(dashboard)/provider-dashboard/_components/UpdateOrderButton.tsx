"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  updateProviderOrderStatus,
  UpdatableRentalStatus,
} from "../_actions/providerAction";

type UpdateOrderButtonProps = {
  orderId: string;
  status: UpdatableRentalStatus;
  label: string;
  variant?: "default" | "destructive";
};

export function UpdateOrderButton({
  orderId,
  status,
  label,
  variant = "default",
}: UpdateOrderButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant={variant}
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await updateProviderOrderStatus(orderId, status);
        })
      }
    >
      {isPending ? "Updating..." : label}
    </Button>
  );
}
