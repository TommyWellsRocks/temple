"use client";

import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { DayForm } from "../../forms/DayForm/DayForm";

export function AddButton({ lastGroupId }: { lastGroupId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" id="add-day-button">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Day</DialogTitle>
          <DialogDescription>
            Design and schedule your program days.
          </DialogDescription>
        </DialogHeader>

        <DayForm groupId={lastGroupId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
