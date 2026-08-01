import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/orders/status-badge";
import { getMyRentals } from "../_actions/rentalAction";
import { CancelRentalButton } from "@/components/orders/cancel-rental-button";
import { Pagination } from "@/components/shared/pagination";

export default async function CustomerOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const { data: orders, meta, error } = await getMyRentals(params);
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        My Orders
      </h2>
      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : orders.length === 0 ? (
        <p className="p-5 text-center text-muted-foreground">
          You haven't placed any orders yet.
        </p>
      ) : (
        <>
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
                  <th className="px-5 py-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                      {order.id}
                    </td>

                    <td className="px-5 py-4 font-medium text-foreground">
                      {order.items.length > 0
                        ? order.items
                            .map((item) => item.gearItem.name)
                            .join(", ")
                        : "No items"}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {new Date(order.startDate).toLocaleDateString()} -{" "}
                      {new Date(order.endDate).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 font-mono font-semibold text-foreground">
                      ${order.totalAmount}
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
                          <Link href={`/dashboard/orders/${order.id}`}>
                            Pay Now
                          </Link>
                        </Button>
                      ) : order.status === "RETURNED" ? (
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/dashboard/customer/reviews">
                            Leave Review
                          </Link>
                        </Button>
                      ) : order.status === "PAID" ? (
                        <span className="text-xs text-muted-foreground">
                          Awaiting pickup
                        </span>
                      ) : order.status === "PICKED_UP" ? (
                        <span className="text-xs text-muted-foreground">
                          Rental in progress
                        </span>
                      ) : order.status === "PLACED" ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-muted-foreground">
                            Waiting for confirmation
                          </span>

                          <CancelRentalButton rentalId={order.id} />
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-center">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/dashboard/orders/${order.id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {orders.map((order) => (
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
                      {order.items.length > 0
                        ? order.items
                            .map((item) => item.gearItem.name)
                            .join(", ")
                        : "No items"}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {new Date(order.startDate).toLocaleDateString()} -{" "}
                    {new Date(order.endDate).toLocaleDateString()}
                  </span>
                  <span className="font-mono font-semibold text-foreground">
                    ${order.totalAmount}
                  </span>
                </div>
                {order.status === "CONFIRMED" ? (
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    asChild
                  >
                    <Link href={`/dashboard/orders/${order.id}`}>Pay Now</Link>
                  </Button>
                ) : order.status === "RETURNED" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/dashboard/customer/reviews">Leave Review</Link>
                  </Button>
                ) : order.status === "PAID" ? (
                  <p className="text-center text-xs text-muted-foreground">
                    Awaiting pickup
                  </p>
                ) : order.status === "PICKED_UP" ? (
                  <p className="text-center text-xs text-muted-foreground">
                    Rental in progress
                  </p>
                ) : order.status === "PLACED" ? (
                  <p className="text-center text-xs text-muted-foreground">
                    Waiting for confirmation
                  </p>
                ) : (
                  <p className="text-center text-xs text-muted-foreground">
                    Order cancelled
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {meta && <Pagination totalPages={meta.totalPages} />}
    </div>
  );
}
