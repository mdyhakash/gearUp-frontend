"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteCategoryAction } from "@/app/(dashboard)/admin-dashboard/_actions/categoryAction";

export function DeleteCategoryButton({
  categoryId,
  disabled,
  full = false,
}: {
  categoryId: string;
  disabled?: boolean;
  full?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCategoryAction(categoryId);
      toast[result.success ? "success" : "error"](
        result.success ? "Category deleted." : result.message,
      );
    });
  };

  return (
    <Button
      variant={full ? "outline" : "ghost"}
      size={full ? "sm" : "icon"}
      aria-label="Delete category"
      className={
        full
          ? "flex-1 border-destructive text-destructive hover:bg-destructive/10"
          : "text-destructive hover:text-destructive"
      }
      disabled={disabled || isPending}
      onClick={handleDelete}
    >
      <Trash2 className={full ? "mr-1.5 h-3.5 w-3.5" : "h-4 w-4"} />
      {full && (isPending ? "Deleting..." : "Delete")}
    </Button>
  );
}
