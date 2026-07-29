import Link from "next/link";
import { Package, Wallet, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/lib/data";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/orders/status-badge";

export default function CustomerOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Rentals" value={2} icon={Package} />
        <StatCard label="Total Spent" value="$486" icon={Wallet} />
        <StatCard label="Pending Payment" value={1} icon={Clock} />
        <StatCard label="Reviews Given" value={5} icon={Star} />
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display font-bold text-foreground">
            Recent Orders
          </h2>
          <Link
            href="/dashboard/customer/orders"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-border">
          {mockOrders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  {order.id}
                </p>
                <p className="font-semibold text-foreground">
                  {order.gearName}
                </p>
                <p className="text-sm text-muted-foreground">{order.dates}</p>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={order.status} />
                <span className="font-mono font-semibold text-foreground">
                  ${order.total}
                </span>
                {order.status === "CONFIRMED" && (
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    asChild
                  >
                    <Link href={`/dashboard/customer/orders/${order.id}/pay`}>
                      Pay Now
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
