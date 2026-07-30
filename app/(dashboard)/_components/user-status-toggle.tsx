"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateUserStatusAction } from "../admin-dashboard/_actions/userAction";

export function UserStatusToggle({
  userId,
  status,
}: {
  userId: string;
  status: "ACTIVE" | "BLOCKED";
}) {
  const [isPending, startTransition] = useTransition();
  const nextStatus = status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

  const handleClick = () => {
    startTransition(async () => {
      const result = await updateUserStatusAction(userId, nextStatus);
      if (result.success) {
        toast.success(
          nextStatus === "BLOCKED" ? "User suspended." : "User activated.",
        );
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      size="sm"
      variant={status === "ACTIVE" ? "outline" : "default"}
      className={
        status !== "ACTIVE"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : ""
      }
      disabled={isPending}
      onClick={handleClick}
    >
      {isPending ? "..." : status === "ACTIVE" ? "Suspend" : "Activate"}
    </Button>
  );
}
