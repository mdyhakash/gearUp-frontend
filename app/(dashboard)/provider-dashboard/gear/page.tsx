import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getAllProviderGear } from "../_actions/gearAction";
import { getMe } from "@/service/getMe";
import { DeleteGearButton } from "../_components/delete-gear-button";
import { GearForm } from "@/components/gear/gear-form";
import { getAllCategories } from "../../admin-dashboard/_actions/categoryAction";

export default async function ProviderInventoryPage() {
  const { data: gears, error } = await getAllProviderGear();
  const { data: categories } = await getAllCategories();
  const me = await getMe();
  const providerId = me.data.result.id;
  const providerGears = gears.filter((gear) => gear.provider.id === providerId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          Inventory
        </h2>
        <GearForm
          mode="create"
          categories={categories}
          trigger={
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-1.5 h-4 w-4" />
              Add Gear
            </Button>
          }
        />
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
                    <GearForm
                      mode="edit"
                      categories={categories}
                      initialValues={g}
                      trigger={
                        <Button variant="ghost" size="icon" aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <DeleteGearButton gearId={g.id} />
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
