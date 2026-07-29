import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
        <Compass className="h-8 w-8" />
      </span>

      <p className="mt-6 font-mono text-sm font-semibold tracking-wide text-accent">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you're looking for doesn't exist, or the gear listing may have
        been removed.
      </p>

      <div className="mt-8 flex w-full max-w-xs flex-col gap-2">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/gear">Browse Gear</Link>
        </Button>
      </div>
    </div>
  );
}
