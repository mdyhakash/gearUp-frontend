"use client";

import { useState } from "react";
import { CalendarIcon, ShieldCheck } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { DateRange } from "react-day-picker";

export function RentWidget({ dailyRate }: { dailyRate: number }) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const days =
    range?.from && range?.to
      ? Math.max(1, differenceInCalendarDays(range.to, range.from))
      : 0;
  const subtotal = days * dailyRate;
  const serviceFee = subtotal ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + serviceFee;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-2xl font-bold text-foreground">
          ${dailyRate}
        </span>
        <span className="text-sm text-muted-foreground">/ day</span>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Rental Dates
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              {range?.from ? (
                range.to ? (
                  <>
                    {format(range.from, "MMM d")} –{" "}
                    {format(range.to, "MMM d, yyyy")}
                  </>
                ) : (
                  format(range.from, "MMM d, yyyy")
                )
              ) : (
                <span className="text-muted-foreground">
                  Select pickup & return
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={{ before: new Date() }}
              numberOfMonths={1}
              className="rounded-md border-0"
            />
          </PopoverContent>
        </Popover>
      </div>

      {days > 0 && (
        <div className="mt-4 space-y-2 font-mono text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>
              ${dailyRate} × {days} day{days > 1 ? "s" : ""}
            </span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold text-foreground">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}

      <Button
        className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
        disabled={days === 0}
      >
        Rent Now
      </Button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout via SSLCommerz
      </p>
    </div>
  );
}
