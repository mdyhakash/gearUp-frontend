import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { GearItem } from "@/lib/types";
import { ConditionBadge } from "./condition-badge";
import { Button } from "@/components/ui/button";

export function GearCard({ gear }: { gear: GearItem }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        <Image
          src={gear.image ?? "/placeholder-gear.jpg"}
          alt={gear.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!gear.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
            <span className="rounded-md bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
              Currently Unavailable
            </span>
          </div>
        )}

        {/* Hanging price tag — signature element */}
        <div className="absolute -right-2 -top-2 rotate-6">
          <div className="relative rounded-md bg-accent px-3 py-1.5 font-mono text-sm font-bold text-accent-foreground shadow-md">
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background" />
            ${gear.dailyRate}
            <span className="text-[10px] font-medium">/day</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {gear.category}
          </span>
          <ConditionBadge condition={gear.condition} />
        </div>

        <h3 className="font-display font-bold leading-tight text-foreground">
          {gear.name}
        </h3>
        <p className="text-sm text-muted-foreground">{gear.brand}</p>

        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{gear.providerName}</span>
          {gear.rating && (
            <span className="flex items-center gap-1 font-mono font-semibold text-foreground">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              {gear.rating}
            </span>
          )}
        </div>

        <Button
          asChild
          className="mt-3 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!gear.isAvailable}
        >
          <Link href={`/gear/${gear.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
