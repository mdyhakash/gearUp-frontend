import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ReviewItem({
  gearName,
  customerName,
  rating,
  comment,
  date,
}: {
  gearName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}) {
  const initials = customerName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="border-b border-border py-4 last:border-0">
      <p className="mb-3 text-base font-semibold text-foreground">{gearName}</p>
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 shrink-0 border border-border">
          <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {customerName}
            </span>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <div className="mt-0.5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < rating ? "fill-accent text-accent" : "text-border"
                }`}
              />
            ))}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{comment}</p>
        </div>
      </div>
    </div>
  );
}
