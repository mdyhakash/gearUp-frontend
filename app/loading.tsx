import { Mountain } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <span className="flex h-12 w-12 animate-pulse items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Mountain className="h-6 w-6" strokeWidth={2.5} />
      </span>
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
      </div>
      <p className="font-mono text-xs text-muted-foreground">Loading GearUp…</p>
    </div>
  );
}
