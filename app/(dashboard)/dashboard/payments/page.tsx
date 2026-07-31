import { Button } from "@/components/ui/button";
import { getMyPayments } from "../_actions/paymentAction";
import { PaymentStatusBadge } from "@/components/payment/payment-status-badge";
import { ReceiptDialog } from "@/components/payment/receipt-dialog";

export default async function CustomerPaymentsPage() {
  const { data: payments } = await getMyPayments();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          Payment History
        </h2>
        <p className="text-sm text-muted-foreground">
          {payments.length} transaction{payments.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Transaction</th>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Receipt</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-5 py-4 font-mono text-xs">
                  {payment.transactionId}
                </td>

                <td className="px-5 py-4">
                  <p className="font-mono text-xs text-muted-foreground">
                    {payment.rentalOrderId}
                  </p>
                </td>

                <td className="px-5 py-4 text-muted-foreground">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 font-mono font-semibold">
                  ${payment.amount.toFixed(2)}
                </td>

                <td className="px-5 py-4">
                  <PaymentStatusBadge status={payment.status} />
                </td>

                <td className="px-5 py-4 text-right">
                  {payment.status === "COMPLETED" ? (
                    <ReceiptDialog payment={payment} />
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  {payment.transactionId}
                </p>

                <p className="font-mono text-xs text-muted-foreground">
                  {payment.rentalOrderId}
                </p>
              </div>

              <PaymentStatusBadge status={payment.status} />
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {new Date(payment.createdAt).toLocaleDateString()}
              </span>

              <span className="font-mono font-semibold">
                ${payment.amount.toFixed(2)}
              </span>
            </div>

            {payment.status === "COMPLETED" && (
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                disabled
              >
                View Receipt
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
