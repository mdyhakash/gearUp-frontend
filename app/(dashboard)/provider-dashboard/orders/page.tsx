import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/orders/status-badge";
import { mockIncomingOrders } from "@/lib/data";

const actionByStatus: Record<string, string> = {
  PLACED: "Confirm",
  PAID: "Mark Picked Up",
  PICKED_UP: "Mark Returned",
};

export default function ProviderOrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        Incoming Orders
      </h2>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3 hidden md:table-cell">Gear</th>
              <th className="px-5 py-3 hidden sm:table-cell">Dates</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockIncomingOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                  {order.id}
                </td>
                <td className="px-5 py-4 font-medium text-foreground">
                  {order.customerName}
                </td>
                <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">
                  {order.gearName}
                </td>
                <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">
                  {order.dates}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  {actionByStatus[order.status] ? (
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {actionByStatus[order.status]}
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
