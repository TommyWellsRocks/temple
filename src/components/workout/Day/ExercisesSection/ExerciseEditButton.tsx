import type { DayExercise } from "~/server/types";

import { EditButtonPopover } from "~/components/workout/EditButtonPopover";
import { ExerciseForm } from "~/components/workout/forms/ExerciseForm/ExerciseForm";

export function ExerciseEditButton({ exercise }: { exercise: DayExercise }) {
  if (!exercise) return;

  return (
    <div className="absolute right-1 mx-2 pb-1">
      <EditButtonPopover
        title="Edit Exercise"
        description={`Remember to click save when you're done.`}
        formComponent={
          <ExerciseForm
            programId={exercise.programId}
            dayExercise={exercise}
          />
        }
      />
    </div>
  );
}
