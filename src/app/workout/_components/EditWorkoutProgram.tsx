"use client";

import { Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { z } from "zod";
import { handleEditWorkoutProgram } from "./ServerComponents";
import { Workout } from "~/server/types";
import { ProgramForm, formSchema } from "./ProgramForm";

export function EditWorkoutProgram({
  userId,
  currentInfo,
}: {
  userId: string;
  currentInfo: Workout;
}) {
  function handleEdit(values: z.infer<typeof formSchema>) {
    handleEditWorkoutProgram(
      userId,
      currentInfo.id,
      values.name,
      values.start,
      values.end,
    );
  }

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
            <h4 className="font-medium leading-none">Edit Workout Program</h4>
            <p className="text-sm text-muted-foreground">
              Remember to click edit when your done.
            </p>
          </div>
          <ProgramForm
            onSubmitFunction={handleEdit}
            currentInfo={currentInfo}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
