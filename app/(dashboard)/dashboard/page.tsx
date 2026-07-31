import Link from "next/link";
import { Package, Wallet, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/orders/status-badge";
import { getMyRentals } from "./_actions/rentalAction";

export default async function CustomerOverviewPage() {
  const { data: orders, error } = await getMyRentals();
  const activeRentals = orders.filter((order) =>
    ["CONFIRMED", "PAID", "PICKED_UP"].includes(order.status),
  ).length;

  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const pendingPayments = orders.filter(
    (order) => order.status === "CONFIRMED",
  ).length;

  const reviewsGiven = orders.filter(
    (order) => order.status === "RETURNED",
  ).length;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Rentals" value={activeRentals} icon={Package} />
        <StatCard label="Total Spent" value={`$${totalSpent}`} icon={Wallet} />
        <StatCard
          label="Pending Payment"
          value={pendingPayments}
          icon={Clock}
        />
        <StatCard label="Reviews Given" value={reviewsGiven} icon={Star} />
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display font-bold text-foreground">
            Recent Orders
          </h2>
          <Link
            href="/dashboard/orders"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        {error ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </p>
        ) : orders.length === 0 ? (
          <p className="p-5 text-center text-muted-foreground">
            You haven't placed any orders yet.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {order.id}
                  </p>
                  <p className="font-semibold text-foreground">
                    {order.items.length > 0
                      ? order.items.map((item) => item.gearItem.name).join(", ")
                      : "No items"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.startDate).toLocaleDateString()} -{" "}
                    {new Date(order.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={order.status} />
                  <span className="font-mono font-semibold text-foreground">
                    ${order.totalAmount}
                  </span>
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
                  ) : (
                    <span className="text-xs text-muted-foreground"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
