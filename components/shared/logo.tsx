import Link from "next/link";
import { Mountain } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Mountain className="h-4.5 w-4.5" strokeWidth={2.5} />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        GearUp
      </span>
    </Link>
  );
}
