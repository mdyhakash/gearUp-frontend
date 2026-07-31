import { PaymentStatus } from "@/types/payment";

const statusConfig: Record<PaymentStatus, { label: string; color: string }> = {
  PENDING: { label: "Pending", color: "#D97706" },
  COMPLETED: { label: "Success", color: "#2F7A4F" },
  FAILED: { label: "Failed", color: "#B3432B" },
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config = statusConfig[status] ?? {
    label: status ?? "Unknown",
    color: "#6B7280",
  };
  const { label, color } = config;

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
