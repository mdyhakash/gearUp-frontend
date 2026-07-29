import { ReviewForm } from "@/components/reviews/review-form";
import { mockOrders } from "@/lib/data";

export default function CustomerReviewsPage() {
  const returned = mockOrders.filter((o) => o.status === "RETURNED");

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        Leave a Review
      </h2>
      <p className="text-sm text-muted-foreground">
        Share feedback on gear you&apos;ve returned to help other renters.
      </p>
      <div className="space-y-4">
        {returned.map((o) => (
          <ReviewForm key={o.id} gearName={o.gearName} />
        ))}
      </div>
    </div>
  );
}
