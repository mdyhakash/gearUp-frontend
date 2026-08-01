import { MapPin, Package, ShieldCheck, Star } from "lucide-react";
import { GearGallery } from "@/components/gear/gear-gallery";
import { RentWidget } from "@/components/gear/rent-widget";
import { ConditionBadge } from "@/components/condition-badge";
import { ReviewItem } from "@/components/reviews/review-item";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGearById } from "@/app/(dashboard)/provider-dashboard/_actions/gearAction";
import { getGearReviews } from "@/app/(dashboard)/dashboard/_actions/reviewAction";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ data: gear, error }, { data: reviews, meta: reviewMeta }] =
    await Promise.all([getGearById(id), getGearReviews(id)]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {error || !gear ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Left column */}
          <div className="min-w-0">
            <GearGallery
              images={gear.image ? [gear.image] : ["/placeholder.png"]}
              name={gear.name}
            />

            <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {gear.category.name}
                </span>
                <h1 className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {gear.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {gear.brand}
                </p>
              </div>
              <ConditionBadge condition={gear.condition} />
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Package className="h-4 w-4" /> {gear.stock} in stock
              </span>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="description" className="flex w-full flex-col">
              <TabsList className="w-fit bg-secondary">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="provider">Provider</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({reviewMeta?.total ?? 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-5 w-full">
                <p>
                  A well-maintained {gear.name.toLowerCase()} from {gear.brand},
                  cleaned and inspected between every rental. Perfect for
                  weekend trips and multi-day adventures. Includes carrying bag
                  and setup instructions.
                </p>
                <ul className="mt-4 space-y-1.5">
                  <li>• Condition: {gear.condition}</li>
                  <li>• Category: {gear.category.name}</li>
                  <li>• Available units: {gear.stock}</li>
                </ul>
              </TabsContent>

              <TabsContent value="provider" className="mt-5 w-full">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarFallback className="bg-secondary font-semibold text-secondary-foreground">
                      {gear.provider.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {gear.provider.name}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-5 w-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">
                      {reviewMeta?.averageRating ?? 0}/5
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({reviewMeta?.total ?? 0} reviews)
                    </span>
                  </div>

                  {reviews.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No reviews yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {reviews.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No reviews yet.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {reviews.map((review) => (
                            <div
                              key={review.id}
                              className="rounded-lg border border-border p-4"
                            >
                              <ReviewItem
                                gearName={gear.name}
                                customerName={review.customer.name}
                                rating={review.rating}
                                comment={review.comment}
                                date={new Date(
                                  review.createdAt,
                                ).toLocaleDateString()}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column — sticky rent widget */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <RentWidget
              gearItemId={gear.id}
              dailyRate={gear.dailyRate}
              stock={gear.stock}
            />
          </div>
        </div>
      )}
    </div>
  );
}
