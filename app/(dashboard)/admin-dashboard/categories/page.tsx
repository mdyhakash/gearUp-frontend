import { Pencil, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryFormDialog } from "@/components/categories/category-form-dialog";
import { DeleteCategoryButton } from "@/components/categories/delete-category-button";
import { getAllCategories } from "../_actions/categoryAction";

export default async function AdminCategoriesPage() {
  const { data: categories, error } = await getAllCategories();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Categories
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {categories.length} categories total
          </p>
        </div>
        <CategoryFormDialog mode="create" />
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td className="px-5 py-4 font-medium text-foreground">
                      {cat.name}
                    </td>
                    <td className="max-w-xs px-5 py-4 truncate text-muted-foreground">
                      {cat.description || (
                        <span className="italic text-muted-foreground/60">
                          No description
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <CategoryFormDialog
                          mode="edit"
                          initialValues={cat}
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Edit category"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <DeleteCategoryButton categoryId={cat.id} />
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-8 text-center text-sm text-muted-foreground"
                    >
                      No categories yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{cat.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cat.description || (
                        <span className="italic text-muted-foreground/60">
                          No description
                        </span>
                      )}
                    </p>
                  </div>
                  <Package className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
                <div className="mt-3 flex gap-2">
                  <CategoryFormDialog
                    mode="edit"
                    initialValues={cat}
                    trigger={
                      <Button variant="outline" size="sm" className="flex-1">
                        <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                      </Button>
                    }
                  />
                  <DeleteCategoryButton categoryId={cat.id} full />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
