"use client";

import { ArrowUpDown } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Newest" },
  { value: "dailyRate-asc", label: "Price: Low to High" },
  { value: "dailyRate-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "condition-asc", label: "Condition: New to Damaged" },
  { value: "condition-desc", label: "Condition: Damaged to New" },
];

export function GearSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = `${searchParams.get("sortBy") ?? "createdAt"}-${searchParams.get("sortOrder") ?? "desc"}`;

  const handleChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-");
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-full shrink-0 gap-2 sm:w-55">
        <ArrowUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Sort by" className="truncate" />
      </SelectTrigger>
      <SelectContent align="end" className="w-55">
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
