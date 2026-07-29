import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/orders/status-badge";
import { mockOrders } from "@/lib/data";

export default function CustomerOrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        My Orders
      </h2>

      <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Gear</th>
              <th className="px-5 py-3">Dates</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
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
                <td className="px-5 py-4 text-muted-foreground">
                  {order.dates}
                </td>
                <td className="px-5 py-4 font-mono font-semibold text-foreground">
                  ${order.total}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  {order.status === "CONFIRMED" ? (
                    <Button
                      size="sm"
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      asChild
                    >
                      <Link href={`/dashboard/customer/orders/${order.id}/pay`}>
                        Pay Now
                      </Link>
                    </Button>
                  ) : order.status === "RETURNED" ? (
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/dashboard/customer/reviews">
                        Leave Review
                      </Link>
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

      <div className="space-y-3 md:hidden">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  {order.id}
                </p>
                <p className="font-semibold text-foreground">
                  {order.gearName}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{order.dates}</span>
              <span className="font-mono font-semibold text-foreground">
                ${order.total}
              </span>
            </div>
            {order.status === "CONFIRMED" && (
              <Button
                size="sm"
                className="mt-3 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link href={`/dashboard/customer/orders/${order.id}/pay`}>
                  Pay Now
                </Link>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
