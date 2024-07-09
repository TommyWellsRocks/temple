"use client";

import { Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { formSchema, WorkoutForm } from "./workoutform";
import { z } from "zod";
import { handleEditWorkout } from "./ServerComponents";

export function EditWorkout({
  userId,
  workoutId,
  name,
  repeatStart,
  repeatEnd,
  repeatOn,
}: {
  userId: string;
  workoutId: number;
  name: string;
  repeatStart: string | null;
  repeatEnd: string | null;
  repeatOn: number[] | null;
}) {
  function handleEdit(values: z.infer<typeof formSchema>) {
    handleEditWorkout(
      userId,
      workoutId,
      values.name || name,
      values.start ? values.start.toISOString() : repeatStart,
      values.end ? values.end.toISOString() : repeatEnd,
      values.repeat ? values.repeat : repeatOn,
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
          <WorkoutForm userId={userId} onSubmitFunction={handleEdit} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

// TODO Current info & edit button if workoutId prop
