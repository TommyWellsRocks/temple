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

import { ExerciseForm } from "./ExerciseForm";
import { Exercises, ProgramDay } from "~/server/types";

export async function AddExercises({
  userId,
  programId,
  dayId,
  programDay,
  exercises,
}: {
  userId: string;
  programId: number;
  dayId: number;
  programDay: ProgramDay;
  exercises: Exercises;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
          <DialogDescription>
            Add an exercise to your workout. Click add when you're done.
          </DialogDescription>
        </DialogHeader>

        <ExerciseForm
          userId={userId}
          programId={programId}
          dayId={dayId}
          programDay={programDay}
          exercises={exercises}
          method="Add"
        />
      </DialogContent>
    </Dialog>
  );
}
