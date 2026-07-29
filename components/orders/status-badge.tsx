import { RentalStatus } from "@/lib/types";

const statusConfig: Record<RentalStatus, { label: string; color: string }> = {
  PLACED: { label: "Placed", color: "#C68A2E" },
  CONFIRMED: { label: "Confirmed", color: "#2563AC" },
  PAID: { label: "Paid", color: "#6D3FA6" },
  PICKED_UP: { label: "Picked Up", color: "#2F7A4F" },
  RETURNED: { label: "Returned", color: "#6B7280" },
  CANCELLED: { label: "Cancelled", color: "#B3432B" },
};

export function StatusBadge({ status }: { status: RentalStatus }) {
  const { label, color } = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs font-semibold"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
