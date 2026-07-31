import { getAllProviderGear } from "@/app/(dashboard)/provider-dashboard/_actions/gearAction";
import { GearFilters } from "@/components/gear/gear-filters";
import { GearGrid } from "@/components/gear/gear-grid";



export default async function BrowseGearPage() {
  const {data:gears, error}= await getAllProviderGear()
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Browse Gear
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {gears.length} items available near you
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <GearFilters />
        <div className="flex-1">
          <GearGrid gears={gears} />
        </div>
      </div>
    </div>
  );
}
