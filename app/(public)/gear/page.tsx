import { GearFilters } from "@/components/gear/gear-filters";
import { GearGrid } from "@/components/gear/gear-grid";
import { GearSearchBar } from "@/components/gear/gear-search-bar";
import { GearSort } from "@/components/gear/gear-sort";
import { getAllCategories } from "@/lib/actions/categoryAction";
import { getAllGear } from "@/lib/actions/publicGearAction";

export default async function BrowseGearPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const { data: gears } = await getAllGear(params);
  const { data: categories } = await getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Browse Gear
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {gears.length} items available near you
          </p>
        </div>
        <GearSort />
      </div>

      <GearSearchBar />
      <div className="flex flex-col gap-6 lg:flex-row">
        <GearFilters categories={categories} />
        <div className="flex-1">
          <GearGrid gears={gears} />
        </div>
      </div>
    </div>
  );
}
