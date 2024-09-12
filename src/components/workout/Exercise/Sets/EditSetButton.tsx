import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { handleExerciseSetsChange } from "~/server/actions/workout/ExerciseActions";

import { clipPathParallelogram } from "~/components/ui/Shapes";
import { Minus, Plus } from "lucide-react";

export function EditSetButton({ method }: { method: "Add" | "Delete" }) {
  const setDayExSets = useProgram().setDayExerciseSets;
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-primary"
      style={{
        clipPath: clipPathParallelogram,
      }}
      onClick={() => {
        setDayExSets(method);
        handleExerciseSetsChange(
          dayEx.id,
          dayEx.userId,
          dayEx.reps,
          dayEx.weight,
          dayEx.loggedSetsCount,
        );
      }}
    >
      {method === "Add" ? <Plus /> : <Minus />}
    </button>
  );
}
