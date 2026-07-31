import { MapPin, Package, ShieldCheck, Star } from "lucide-react";
import { GearGallery } from "@/components/gear/gear-gallery";
import { RentWidget } from "@/components/gear/rent-widget";
import { ConditionBadge } from "@/components/condition-badge";
import { ReviewItem } from "@/components/reviews/review-item";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGearById } from "@/app/(dashboard)/provider-dashboard/_actions/gearAction";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: gear, error } = await getGearById(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {error || !gear ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left column */}
          <div>
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
              {/* <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" /> {gear.rating}{" "}
              rating
            </span> */}
              <span className="flex items-center gap-1.5">
                <Package className="h-4 w-4" /> {gear.stock} in stock
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {gear.provider.name}
              </span>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="description">
              <TabsList className="bg-secondary">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="provider">Provider</TabsTrigger>
                {/* <TabsTrigger value="reviews">Reviews ({gear.length})</TabsTrigger> */}
              </TabsList>

              <TabsContent
                value="description"
                className="pt-5 text-sm text-muted-foreground"
              >
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

              <TabsContent value="provider" className="pt-5">
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
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5" /> Verified provider
                      since 2024
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* <TabsContent value="reviews" className="pt-2">
              {mockReviews.map((r) => (
                <ReviewItem key={r.id} {...r} />
              ))}
            </TabsContent> */}
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
