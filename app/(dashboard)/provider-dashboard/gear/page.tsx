import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getAllProviderGear } from "../_actions/gearAction";
import { getMe } from "@/service/getMe";

export default async function ProviderInventoryPage() {
  const { data: gears, error } = await getAllProviderGear();
  const me = await getMe();
  console.log("me", me);

  const providerId = me.data.result.id;
  const providerGears = gears.filter((gear) => gear.provider.id === providerId);
  console.log(providerId);
  console.log(gears);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          Inventory
        </h2>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/provider-dashboard/gear/new">
            <Plus className="mr-1.5 h-4 w-4" /> Add Gear
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3 hidden sm:table-cell">Category</th>
              <th className="px-5 py-3">Rate</th>
              <th className="px-5 py-3 hidden sm:table-cell">Stock</th>
              <th className="px-5 py-3">Available</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {providerGears.map((g) => (
              <tr key={g.id}>
                <td className="px-5 py-4 font-medium text-foreground">
                  {g.name}
                </td>
                <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">
                  {g.category.name}
                </td>
                <td className="px-5 py-4 font-mono text-foreground">
                  ${g.dailyRate}/day
                </td>
                <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">
                  {g.stock}
                </td>
                <td className="px-5 py-4">
                  <Switch defaultChecked={g.isAvailable} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
