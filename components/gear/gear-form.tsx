"use client";

import { useActionState, useState } from "react";
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
import { createGearAction } from "@/app/(dashboard)/provider-dashboard/_actions/gearAction";
import { Category } from "@/app/(dashboard)/admin-dashboard/_actions/categoryAction";
type GearFormProps = {
  categories: Category[];
};
const initialState = {
  success: false,
  statusCode: 0,
  message: "",
};
export function GearForm({ categories }: GearFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [state, action, pending] = useActionState(
    createGearAction,
    initialState,
  );
  const [categoryId, setCategoryId] = useState("");
  const [condition, setCondition] = useState("NEW");
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <form action={action} className="space-y-6">
      {state?.message && !state.success && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
          {state.message}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Gear Name</Label>
          <Input name="name" placeholder="e.g. 4-Person Dome Tent" />
        </div>
        <div className="space-y-2">
          <Label>Brand</Label>
          <Input name="brand" placeholder="e.g. Coleman" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          rows={4}
          name="description"
          placeholder="Describe the gear, its condition, and what's included..."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="categoryId" value={categoryId} />
        </div>
        <div className="space-y-2">
          <Label>Condition</Label>
          <Select value={condition} onValueChange={setCondition}>
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
          <input type="hidden" name="condition" value={condition} />
        </div>
        <div className="space-y-2">
          <Label>Stock (units)</Label>
          <Input name="stock" type="number" min={0} placeholder="1" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Daily Rate ($)</Label>
          <Input name="dailyRate" type="number" min={0} placeholder="15" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
          <div>
            <Label>Available for rent</Label>
            <p className="text-xs text-muted-foreground">
              Toggle off to hide from listings
            </p>
          </div>
          <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />

          <input
            type="hidden"
            name="isAvailable"
            value={isAvailable ? "true" : "false"}
          />
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
          name="image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={pending}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {pending ? "Saving..." : "Save Gear"}
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
