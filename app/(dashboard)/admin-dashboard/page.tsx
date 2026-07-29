import { Users, Package, ListOrdered, Wallet } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

export default function AdminOverviewPage() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Users"
        value={842}
        icon={Users}
        trend="+18 this week"
      />
      <StatCard label="Active Gear" value={356} icon={Package} />
      <StatCard label="Total Rentals" value={1204} icon={ListOrdered} />
      <StatCard label="Platform Revenue" value="$24,580" icon={Wallet} />
    </div>
  );
}
