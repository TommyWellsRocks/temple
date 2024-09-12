import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { handleExerciseSetsChange } from "~/server/actions/workout/ExerciseActions";

import { clipPathParallelogram } from "~/components/ui/Shapes";
import { Minus, Plus } from "lucide-react";

export function EditSetButton({ method }: { method: "Add" | "Delete" }) {
  const setDayExSets = useProgram().updateDayExercise;
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-primary"
      style={{
        clipPath: clipPathParallelogram,
      }}
      onClick={() => {
        if (method === "Add") {
          dayEx.reps.push(0);
          dayEx.weight.push(dayEx.weight[dayEx.weight.length - 1] || 0);
        } else {
          dayEx.reps.pop();
          dayEx.weight.pop();
          if (dayEx.loggedSetsCount > dayEx.reps.length) {
            dayEx.loggedSetsCount--;
          }
        }

        setDayExSets(dayEx);
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
