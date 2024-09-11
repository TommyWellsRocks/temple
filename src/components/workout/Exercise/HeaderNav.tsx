import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { Navigation } from "~/components/ui/Navigation";
import { ExerciseForm } from "~/components/workout/forms/ExerciseForm/ExerciseForm";
import { EditButtonPopover } from "~/components/workout/EditButtonPopover";

export function HeaderNav() {
  const dayExercise = useProgram((state) => state.dayExercise);
  if (!dayExercise) return;

  return (
    <Navigation
      backURL={`/workout/${dayExercise.programId}/${dayExercise.dayId}`}
      heading={`${dayExercise.notes?.name ? dayExercise.notes.name : dayExercise.info.name}`}
      editButton={
        <EditButtonPopover
          title="Edit Exercise"
          description={`Remember to click save when you're done.`}
          formComponent={
            <ExerciseForm
              programId={dayExercise.programId}
              dayExercise={dayExercise}
            />
          }
        />
      }
    />
  );
}
