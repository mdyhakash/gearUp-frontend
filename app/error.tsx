"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-8 w-8" />
      </span>

      <h1 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
        Something Went Wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        An unexpected error occurred while loading this page. You can try again
        or head back to safety.
      </p>

      {error.digest && (
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}

      <div className="mt-8 flex w-full max-w-xs flex-col gap-2">
        <Button
          onClick={reset}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <RotateCcw className="mr-1.5 h-4 w-4" /> Try Again
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
