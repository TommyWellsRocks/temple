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
import { getExercises } from "~/server/queries/exercises";

import { ExerciseForm } from "./ExerciseForm";

export async function AddExercises({
  userId,
  workoutId,
}: {
  userId: string;
  workoutId: number;
}) {
  const exercises = await getExercises();

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
          workoutId={workoutId}
          exercises={exercises}
          method="Add"
        />
      </DialogContent>
    </Dialog>
  );
}
