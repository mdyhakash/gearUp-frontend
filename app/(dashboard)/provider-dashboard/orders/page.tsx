import { StatusBadge } from "@/components/orders/status-badge";
import { getProviderOrder } from "../_actions/providerAction";
import { UpdateOrderButton } from "../_components/UpdateOrderButton";
import { ProviderOrderDetailsDialog } from "@/components/orders/provider-order-details-dialog";
import { RentalStatus, UpdatableRentalStatus } from "@/types/rental";

const actionsByStatus: Partial<
  Record<
    RentalStatus,
    {
      label: string;
      nextStatus: UpdatableRentalStatus;
      variant?: "default" | "destructive";
    }[]
  >
> = {
  PLACED: [
    {
      label: "Confirm",
      nextStatus: "CONFIRMED",
    },
    {
      label: "Cancel",
      nextStatus: "CANCELLED",
      variant: "destructive",
    },
  ],
  CONFIRMED: [
    {
      label: "Cancel",
      nextStatus: "CANCELLED",
      variant: "destructive",
    },
  ],
  PAID: [
    {
      label: "Mark Picked Up",
      nextStatus: "PICKED_UP",
    },
  ],
  PICKED_UP: [
    {
      label: "Mark Returned",
      nextStatus: "RETURNED",
    },
  ],
};

export default async function ProviderOrdersPage() {
  const { data: orders, error } = await getProviderOrder();

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        Incoming Orders
      </h2>

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="hidden px-5 py-3 md:table-cell">Gear</th>
                <th className="hidden px-5 py-3 sm:table-cell">Dates</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Details</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const actions = actionsByStatus[order.status] ?? [];

                  return (
                    <tr key={order.id}>
                      <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                        {order.id}
                      </td>

                      <td className="px-5 py-4 font-medium text-foreground">
                        {order.customer.name}
                      </td>

                      <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">
                        {order.items
                          .map((item) => item.gearItem.name)
                          .join(", ")}
                      </td>

                      <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">
                        {new Date(order.startDate).toLocaleDateString()} -{" "}
                        {new Date(order.endDate).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-4">
                        <ProviderOrderDetailsDialog
                          order={order}
                          actions={actions}
                        />
                      </td>

                      <td className="px-5 py-4">
                        {actions.length > 0 ? (
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
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
