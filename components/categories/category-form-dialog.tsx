"use client";

import { useEffect, useState, useActionState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createCategoryAction,
  updateCategoryAction,
} from "@/app/(dashboard)/admin-dashboard/_actions/categoryAction";

export interface CategoryFormValues {
  id?: string;
  name?: string;
  description?: string | null;
}

const initialState = { success: false, message: "" };

export function CategoryFormDialog({
  mode = "create",
  initialValues,
  trigger,
}: {
  mode?: "create" | "edit";
  initialValues?: CategoryFormValues;
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const action =
    mode === "edit" && initialValues?.id
      ? updateCategoryAction.bind(null, initialValues.id)
      : createCategoryAction;

  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-1.5 h-4 w-4" /> Add Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {mode === "create" ? "Add Category" : "Edit Category"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Name</Label>
            <Input
              id="cat-name"
              name="name"
              placeholder="e.g. Water Sports"
              defaultValue={initialValues?.name}
              required
            />
          </div>

          {mode === "edit" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-desc">Description</Label>
              <Textarea
                id="cat-desc"
                name="description"
                rows={3}
                defaultValue={initialValues?.description ?? ""}
              />
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Description can be added afterward from Edit.
            </p>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {pending
                ? "Saving..."
                : mode === "create"
                  ? "Create"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
