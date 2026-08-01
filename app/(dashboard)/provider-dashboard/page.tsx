import { Package, ListOrdered, Wallet, Clock } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { getAllProviderGear } from "./_actions/gearAction";
import { getMe } from "@/service/getMe";

export default async function ProviderOverviewPage() {
  const me = await getMe();
  const providerId = me.data.result.id;
  const { data: gear, meta } = await getAllProviderGear(providerId, {
    limit: "1",
  });

  const totalGear = meta?.totalGearCount ?? gear.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Gear Listed" value={totalGear} icon={Package} />
        <StatCard label="Active Rentals" value="—" icon={ListOrdered} />
        <StatCard label="Pending Orders" value="—" icon={Clock} />
        <StatCard label="Earnings (30d)" value="—" icon={Wallet} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-display font-bold text-foreground">Welcome back</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          You currently have <strong>{totalGear}</strong> gear item
          {totalGear !== 1 ? "s" : ""} listed.
        </p>
      </div>
    </div>
  );
}
