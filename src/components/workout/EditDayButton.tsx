"use client";

import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { DayForm } from "./forms/DayForm/DayForm";

import type { ProgramDay } from "~/server/types";

export function EditButton({ day }: { day: ProgramDay }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button id="edit-day-button" className="align-middle">
          <EllipsisVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-3">
          <div className="space-y-2 text-center">
            <h4 className="font-medium leading-none">Edit Program Day</h4>
            <p className="text-sm text-muted-foreground">
              Remember to click save when your done.
            </p>
          </div>

          <DayForm groupId={day.groupId} dayInfo={day} setOpen={setOpen} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
