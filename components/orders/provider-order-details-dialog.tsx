"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/orders/status-badge";
import { UpdateOrderButton } from "@/app/(dashboard)/provider-dashboard/_components/UpdateOrderButton";
import type { ProviderOrder } from "@/types/order";
import type { UpdatableRentalStatus } from "@/types/rental";

type Action = {
  label: string;
  nextStatus: UpdatableRentalStatus;
  variant?: "default" | "destructive";
};

export function ProviderOrderDetailsDialog({
  order,
  actions,
}: {
  order: ProviderOrder;
  actions: Action[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Eye className="mr-1.5 h-3.5 w-3.5" /> Details
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-6">
            <span>Order #{order.id.slice(0, 8)}</span>
            <StatusBadge status={order.status} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Customer Name
            </p>
            <p className="mt-1 font-medium text-foreground">
              {order.customer.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.customer.email}
            </p>
            {order.customer.phone && (
              <p className="text-sm text-muted-foreground">
                {order.customer.phone}
              </p>
            )}
            {order.customer.address && (
              <p className="text-sm text-muted-foreground">
                {order.customer.address}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Rental Dates
            </p>
            <p className="mt-1 text-foreground">
              {new Date(order.startDate).toLocaleDateString()} –{" "}
              {new Date(order.endDate).toLocaleDateString()}
            </p>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Items
            </p>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex flex-1 items-center justify-between text-sm">
                    <span className="text-foreground">
                      {item.gearItem.name} × {item.quantity}
                    </span>
                    <span className="font-mono text-foreground">
                      ${item.subtotal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-mono font-semibold text-foreground">
              <span className="font-sans">Total</span>
              <span>${order.totalAmount}</span>
            </div>
          </div>

          {actions.length > 0 && (
            <>
              <Separator />
              <div className="flex justify-end gap-2">
                {actions.map((action) => (
                  <UpdateOrderButton
                    key={action.nextStatus}
                    orderId={order.id}
                    status={action.nextStatus}
                    label={action.label}
                    variant={action.variant}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
