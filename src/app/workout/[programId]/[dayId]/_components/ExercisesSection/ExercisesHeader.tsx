import { useProgram } from "~/hooks/workout/useProgram";

import { AddButtonOverlay } from "~/components/workout/AddButtonOverlay";
import { SectionHeader } from "~/components/workout/SectionHeader";
import { DataTable } from "./DataTable";

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
      <AddButtonOverlay
        title="Add Exercise"
        description="Add an exercise to your workout. Click add when you're done."
        formComponent={<DataTable />}
      />
    </div>
  );
}
