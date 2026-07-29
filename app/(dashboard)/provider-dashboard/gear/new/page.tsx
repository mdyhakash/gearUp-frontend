import { GearForm } from "@/components/gear/gear-form";

export default function AddGearPage() {
  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        Add New Gear
      </h2>
      <div className="rounded-xl border border-border bg-card p-6">
        <GearForm />
      </div>
    </div>
  );
}
