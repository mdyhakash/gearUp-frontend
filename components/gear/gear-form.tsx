"use client";

import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data";

export function GearForm() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Gear Name</Label>
          <Input placeholder="e.g. 4-Person Dome Tent" />
        </div>
        <div className="space-y-2">
          <Label>Brand</Label>
          <Input placeholder="e.g. Coleman" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          rows={4}
          placeholder="Describe the gear, its condition, and what's included..."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
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
        <div className="space-y-2">
          <Label>Condition</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="GOOD">Good</SelectItem>
              <SelectItem value="FAIR">Fair</SelectItem>
              <SelectItem value="DAMAGED">Damaged</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Stock (units)</Label>
          <Input type="number" min={0} placeholder="1" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Daily Rate ($)</Label>
          <Input type="number" min={0} placeholder="15" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
          <div>
            <Label>Available for rent</Label>
            <p className="text-xs text-muted-foreground">
              Toggle off to hide from listings
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Photo</Label>
        {imageUrl ? (
          <div className="relative w-40">
            <img
              src={imageUrl}
              alt="Preview"
              className="aspect-square w-40 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
              aria-label="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex w-40 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center">
            <UploadCloud className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Image preview</span>
          </div>
        )}
        <Input
          placeholder="Paste image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Save Gear
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
