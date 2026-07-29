import { Package, ListOrdered, Wallet, Clock } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

export default function ProviderOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Gear Listed" value={12} icon={Package} />
        <StatCard label="Active Rentals" value={5} icon={ListOrdered} />
        <StatCard label="Pending Orders" value={2} icon={Clock} />
        <StatCard label="Earnings (30d)" value="$1,240" icon={Wallet} />
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-display font-bold text-foreground">Welcome back</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          You have 2 orders awaiting confirmation. Check the Orders tab to keep
          things moving.
        </p>
      </div>
    </div>
  );
}
