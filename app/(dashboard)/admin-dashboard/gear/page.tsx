import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConditionBadge } from "@/components/condition-badge";
import { getAllGear } from "../_actions/gearAction";
import { Pagination } from "@/components/shared/pagination";

export default async function AdminGearModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const { data: gear, meta, error } = await getAllGear(params);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        Gear Moderation
      </h2>
      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Gear</th>
                <th className="px-5 py-3 hidden sm:table-cell">Provider</th>
                <th className="px-5 py-3 hidden md:table-cell">Category</th>
                <th className="px-5 py-3">Condition</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {gear.map((g) => (
                <tr key={g.id}>
                  <td className="px-5 py-4 font-medium text-foreground">
                    {g.name}
                  </td>
                  <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">
                    {g.provider.name}
                  </td>
                  <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">
                    {g.category.name}
                  </td>
                  <td className="px-5 py-4">
                    <ConditionBadge condition={g.condition} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" aria-label="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Remove listing"
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
      )}
      {meta && <Pagination totalPages={meta.totalPages} />}
    </div>
  );
}
