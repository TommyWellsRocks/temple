import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { SectionHeader } from "~/components/workout/SectionHeader";
import { AddExerciseButton } from "./AddExerciseButton";

export function ExercisesHeader() {
  const dayExercisesCount = useProgram(
    (state) => state.day?.dayExercises.length,
  );
  if (dayExercisesCount === undefined) return;

  return (
    <div className="flex justify-between">
      <SectionHeader
        title={`${dayExercisesCount} ${dayExercisesCount > 1 ? "Exercises" : "Exercise"}`}
      />
      <AddExerciseButton />
    </div>
  );
}
