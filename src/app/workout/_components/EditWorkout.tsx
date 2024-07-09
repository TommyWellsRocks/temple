"use client";

import { Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { formSchema, WorkoutForm } from "./WorkoutForm";
import { z } from "zod";
import { handleEditWorkout } from "./ServerComponents";
import { Workout } from "~/server/types";

export function EditWorkout({
  userId,
  currentInfo,
}: {
  userId: string;
  currentInfo: Workout;
}) {
  function handleEdit(values: z.infer<typeof formSchema>) {
    handleEditWorkout(
      userId,
      currentInfo!.id,
      values.name,
      values.start,
      values.end,
      values.repeat,
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
            <h4 className="font-medium leading-none">Edit Workout</h4>
            <p className="text-sm text-muted-foreground">
              Remember to save when your done.
            </p>
          </div>
          <WorkoutForm
            onSubmitFunction={handleEdit}
            currentInfo={currentInfo}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
