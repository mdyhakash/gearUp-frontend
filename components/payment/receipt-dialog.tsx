"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Payment } from "@/types/payment";

export function ReceiptDialog({ payment }: { payment: Payment }) {
  const paidDate = payment.paidAt ?? payment.createdAt;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View Receipt
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Receipt</DialogTitle>
          <DialogDescription>
            Transaction {payment.transactionId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Order Id- </span>
            <span className="font-mono text-xs">{payment.rentalOrderId}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Rental Period</span>
            <span>
              {new Date(payment.rentalOrder.startDate).toLocaleDateString()} –{" "}
              {new Date(payment.rentalOrder.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Paid On</span>
            <span>{new Date(paidDate).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between pt-1">
            <span className="font-semibold">Amount Paid</span>
            <span className="font-mono text-lg font-bold">
              ${payment.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
