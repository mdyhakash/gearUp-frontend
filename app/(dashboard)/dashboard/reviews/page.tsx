import { ReviewForm } from "@/components/reviews/review-form";
import { ReviewItem } from "@/components/reviews/review-item";
import { getMyRentals } from "../_actions/rentalAction";
import { getMyReviews } from "../_actions/reviewAction";

export default async function CustomerReviewsPage() {
  const [rentals, reviews] = await Promise.all([
    getMyRentals(),
    getMyReviews(),
  ]);

  const reviewableRentals =
    rentals.data?.filter((r) => r.status === "RETURNED") ?? [];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        Leave a Review
      </h2>

      <p className="text-sm text-muted-foreground">
        Share feedback on gear you've returned to help other renters.
      </p>

      {reviewableRentals.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You don't have any completed rentals to review yet.
        </p>
      ) : (
        <div className="space-y-4">
          {reviewableRentals.map((rental) => {
            const item = rental.items[0];
            if (!item) return null;

            const existingReview = reviews.data.find(
              (review) =>
                review.rentalOrderId === rental.id &&
                review.gearItemId === item.gearItem.id,
            );

            return existingReview ? (
              <ReviewItem
                key={existingReview.id}
                gearName={item.gearItem.name}
                customerName="you"
                rating={existingReview.rating}
                comment={existingReview.comment}
                date={new Date(existingReview.createdAt).toLocaleDateString()}
              />
            ) : (
              <ReviewForm
                key={rental.id}
                rentalOrderId={rental.id}
                gearItemId={item.gearItem.id}
                gearName={item.gearItem.name}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
