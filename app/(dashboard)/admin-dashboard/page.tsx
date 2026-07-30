import { Users, Package, ListOrdered, Wallet } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { getAllUsers } from "./_actions/userAction";
import { getAllGear } from "./_actions/gearAction";
import { getAllRentals } from "./_actions/rentalAction";

export default async function AdminOverviewPage() {
  const [users, gear, rentals] = await Promise.all([
    getAllUsers({
      page: 1,
      limit: 1,
    }),
    getAllGear(),
    getAllRentals(),
  ]);
  const totalUsers = users.meta?.total ?? 0;
  const totalGear = gear.data.length;
  const totalRentals = rentals.data.length;

  const totalRevenue = rentals.data.reduce(
    (sum, rental) => sum + rental.totalAmount,
    0,
  );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Users"
        value={totalUsers}
        icon={Users}
        trend="+18 this week"
      />
      <StatCard label="Active Gear" value={totalGear} icon={Package} />
      <StatCard label="Total Rentals" value={totalRentals} icon={ListOrdered} />
      <StatCard
        label="Platform Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={Wallet}
      />
    </div>
  );
}
