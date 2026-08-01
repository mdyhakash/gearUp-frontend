"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Category } from "@/lib/actions/categoryAction";

const FILTER_KEYS = ["categoryId", "minPrice", "maxPrice"];

function FilterFields({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [price, setPrice] = useState([
    Number(searchParams.get("minPrice") ?? 0),
    Number(searchParams.get("maxPrice") ?? 100),
  ]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setPrice([0, 100]);
    const params = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((key) => params.delete(key));
    router.push(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={searchParams.get("categoryId") ?? ""}
          onValueChange={(value) => updateParam("categoryId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
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
          onValueCommit={(value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("minPrice", String(value[0]));
            params.set("maxPrice", String(value[1]));
            router.push(`${pathname}?${params.toString()}`);
          }}
          max={100}
          step={1}
          className="**:[[role=slider]]:bg-primary"
        />
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        <X className="mr-1.5 h-3.5 w-3.5" /> Clear Filters
      </Button>
    </div>
  );
}

export function GearFilters({ categories }: { categories: Category[] }) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
          <h3 className="mb-5 font-display font-bold text-foreground">
            Filters
          </h3>
          <FilterFields categories={categories} />
        </div>
      </aside>

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
              <FilterFields categories={categories} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
