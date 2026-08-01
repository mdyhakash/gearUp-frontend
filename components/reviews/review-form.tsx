"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createReviewAction } from "@/app/(dashboard)/dashboard/_actions/reviewAction";

interface ReviewFormProps {
  rentalOrderId: string;
  gearItemId: string;
  gearName: string;
}

export function ReviewForm({
  rentalOrderId,
  gearItemId,
  gearName,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    startTransition(async () => {
      const result = await createReviewAction({
        rentalOrderId,
        gearItemId,
        rating,
        comment,
      });

      if (result.success) {
        toast.success(result.message);
        setRating(0);
        setComment("");
      } else {
        toast.error(result.message);
      }
    });
  };

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
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share details about your rental experience..."
        className="mt-3"
        rows={3}
      />

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}
