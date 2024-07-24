"use client";

import { Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { z } from "zod";
import { handleEditProgramDay } from "./ServerComponents";
import { ProgramDay } from "~/server/types";
import { DayForm, formSchema } from "~/components/forms/DayForm";

export function EditDay({
  userId,
  dayInfo,
}: {
  userId: string;
  dayInfo: ProgramDay;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Pencil width={15} height={15} />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Program Day</h4>
            <p className="text-sm text-muted-foreground">
              Remember to click edit when your done.
            </p>
          </div>
          <DayForm
            onSubmitFunction={(values: z.infer<typeof formSchema>) => {
              handleEditProgramDay(
                userId,
                dayInfo!.programId,
                dayInfo!.id,
                values.name,
                values.repeatOn,
              );
            }}
            dayInfo={dayInfo}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
