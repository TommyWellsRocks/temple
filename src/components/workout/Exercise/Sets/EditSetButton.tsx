import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { clipPathParallelogram } from "~/components/ui/Shapes";
import { Minus, Plus } from "lucide-react";

export function EditSetButton({ method }: { method: "Add" | "Delete" }) {
  const setDayExSets = useProgram().setDayExerciseSets;

  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-primary"
      style={{
        clipPath: clipPathParallelogram,
      }}
      onClick={() => {
        setDayExSets(method);
      }}
    >
      {method === "Add" ? <Plus /> : <Minus />}
    </button>
  );
}
