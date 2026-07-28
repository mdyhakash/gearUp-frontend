import { GearItem } from "@/lib/types";
import { GearCard } from "./gear-card";

export function GearGrid({ items }: { items: GearItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
        <p className="font-display text-lg font-bold text-foreground">
          No gear matches your filters
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try widening your price range or clearing a filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
