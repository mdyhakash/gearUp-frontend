"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function ReviewForm({ gearName }: { gearName: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-semibold text-foreground">{gearName}</p>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(i + 1)}
            aria-label={`Rate ${i + 1} stars`}
          >
            <Star
              className={cn(
                "h-6 w-6 transition-colors",
                (hover || rating) > i
                  ? "fill-accent text-accent"
                  : "text-border",
              )}
            />
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Share details about your rental experience..."
        className="mt-3"
        rows={3}
      />
      <Button className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90">
        Submit Review
      </Button>
    </div>
  );
}
