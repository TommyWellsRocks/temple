import { useProgram } from "~/hooks/workout/useProgram";

import { clipPathParallelogram } from "~/components/ui/Shapes";
import { SetInput } from "./SetInput";

export function Set({ index }: { index: number }) {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  const repCount = dayEx.reps[index]!;
  const weightCount = dayEx.weight[index]!;
  const isLogged = dayEx.loggedSetsCount > index;
  const isActiveSet = index === dayEx.loggedSetsCount;

  return (
    <div className="flex flex-col items-end" key={crypto.randomUUID()}>
      <div
        className={`flex items-center gap-x-2 min-[340px]:gap-x-3 ${isActiveSet ? "text-gray-200" : null}`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center font-semibold ${isLogged ? "bg-gray-600 text-gray-900" : "bg-primary text-black"}`}
          style={{
            clipPath: clipPathParallelogram,
          }}
        >
          {index + 1}
        </div>

        <SetInput
          key={crypto.randomUUID()}
          index={index}
          value={repCount}
          label="Reps"
        />
        <span className="text-base">Reps</span>

        <div className="h-4 rotate-[20deg] border border-gray-800"></div>

        <SetInput
          key={crypto.randomUUID()}
          index={index}
          value={weightCount}
          label="Weight"
        />
        <span className="text-base">Pounds</span>
      </div>
    </div>
  );
}
