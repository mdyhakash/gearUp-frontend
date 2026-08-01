"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (value) params.set("searchTerm", value);
    router.push(`/gear${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="mt-8 flex max-w-md flex-col gap-2 rounded-xl bg-card p-2 sm:flex-row">
      <Input
        placeholder="Search for gear (e.g. kayak, tent...)"
        className="border-0 text-foreground shadow-none focus-visible:ring-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}
