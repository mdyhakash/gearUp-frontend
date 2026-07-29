import { StatusBadge } from "@/components/orders/status-badge";
import { mockOrders } from "@/lib/data";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        All Rental Orders
      </h2>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Gear</th>
              <th className="px-5 py-3 hidden sm:table-cell">Dates</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                  {order.id}
                </td>
                <td className="px-5 py-4 font-medium text-foreground">
                  {order.gearName}
                </td>
                <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">
                  {order.dates}
                </td>
                <td className="px-5 py-4 font-mono font-semibold text-foreground">
                  ${order.total}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
