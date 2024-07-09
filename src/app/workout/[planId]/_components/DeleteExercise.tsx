import { Minus } from "lucide-react";
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
import { Exercises } from "~/server/types";

export async function DeleteExercise({
  userId,
  workoutId,
  workoutExercises,
}: {
  userId: string;
  workoutId: number;
  workoutExercises: Exercises;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Minus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Exercise</DialogTitle>
          <DialogDescription>
            Delete an exercise from your workout. Click delete when you're done.
          </DialogDescription>
        </DialogHeader>

        <ExerciseForm
          userId={userId}
          workoutId={workoutId}
          exercises={workoutExercises}
          method="Delete"
        />
      </DialogContent>
    </Dialog>
  );
}
