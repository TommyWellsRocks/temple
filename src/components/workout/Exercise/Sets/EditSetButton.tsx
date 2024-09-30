import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { clipPathParallelogram } from "~/components/ui/Shapes";
import { Minus, Plus } from "lucide-react";
import Loading from "~/app/loading";

export function EditSetButton({ method }: { method: "Add" | "Delete" }) {
  const updateExerciseSets = useProgram.getState().updateExerciseSets;
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return <Loading />;

  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-primary"
      id={method === "Add" ? "add-set-button" : "delete-set-button"}
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

        updateExerciseSets(
          dayEx.programId,
          dayEx.dayId,
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
