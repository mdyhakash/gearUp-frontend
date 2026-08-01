import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllProviderGear } from "../_actions/gearAction";
import { getMe } from "@/service/getMe";
import { DeleteGearButton } from "../_components/delete-gear-button";
import { GearForm } from "@/components/gear/gear-form";
import { getAllCategories } from "../../admin-dashboard/_actions/categoryAction";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/shared/pagination";

export default async function ProviderInventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const me = await getMe();
  const providerId = me.data.result.id;
  const {
    data: providerGears,
    meta,
    error,
  } = await getAllProviderGear(providerId, params);
  const { data: categories } = await getAllCategories();

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

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : (
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
                    <Badge variant={g.isAvailable ? "default" : "secondary"}>
                      {g.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
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
      )}
      {meta && <Pagination totalPages={meta.totalPages} />}
    </div>
  );
}
