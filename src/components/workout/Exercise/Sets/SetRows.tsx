import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { Set } from "./Set";
import Loading from "~/app/loading";

export function SetRows() {
  const exSets = useProgram((state) => {
    if (state.dayExercise) return [...state.dayExercise.reps];
    else return null;
  });
  if (!exSets) return <Loading />;

  return (
    <div className="flex flex-col gap-y-5 text-2xl font-light text-gray-600">
      {exSets.map((_, index) => (
        <Set key={index} index={index} />
      ))}
    </div>
  );
}
