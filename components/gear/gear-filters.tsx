"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/lib/data";

function FilterFields() {
  const [price, setPrice] = useState([0, 50]);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label>Category</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Price per day</Label>
          <span className="font-mono text-sm text-muted-foreground">
            ${price[0]} – ${price[1]}
          </span>
        </div>
        <Slider
          value={price}
          onValueChange={setPrice}
          max={100}
          step={1}
          className="**:[[role=slider]]:bg-primary"
        />
      </div>

      <div className="space-y-2">
        <Label>Brand</Label>
        <Input placeholder="e.g. Trek, Osprey" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>From</Label>
          <Input type="date" />
        </div>
        <div className="space-y-2">
          <Label>To</Label>
          <Input type="date" />
        </div>
      </div>

      <Button variant="outline" className="w-full">
        <X className="mr-1.5 h-3.5 w-3.5" /> Clear Filters
      </Button>
    </div>
  );
}

export function GearFilters() {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
          <h3 className="mb-5 font-display font-bold text-foreground">
            Filters
          </h3>
          <FilterFields />
        </div>
      </aside>

      {/* Mobile filter sheet */}
      <div className="mb-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 overflow-y-auto bg-background"
          >
            <SheetHeader className="border-b border-border pb-4">
              <SheetTitle className="font-display">Filters</SheetTitle>
            </SheetHeader>
            <div className="px-4 py-6">
              <FilterFields />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
