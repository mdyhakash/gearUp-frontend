import { GearCondition } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<GearCondition, string> = {
  NEW: "bg-primary/10 text-primary",
  GOOD: "bg-secondary text-secondary-foreground",
  FAIR: "bg-accent/15 text-accent",
  DAMAGED: "bg-destructive/10 text-destructive",
};

export function ConditionBadge({ condition }: { condition: GearCondition }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[11px] font-mono font-semibold uppercase tracking-wide",
        styles[condition],
      )}
    >
      {condition}
    </span>
  );
}
