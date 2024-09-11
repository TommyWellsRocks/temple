import { useProgram } from "~/hooks/workout/useProgram";

import { Button } from "~/components/ui/button";
import { CheckCheck } from "lucide-react";

export function LogSetsButtons() {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  const setLoggedSets = useProgram().setDayExerciseLoggedSet;
  return (
    <>
      <div className="w-[42px]" />
      <Button
        className="w-full"
        onClick={() => {
          setLoggedSets(dayEx.loggedSetsCount + 1);
        }}
      >
        Log Set
      </Button>

      <Button
        className="rounded-full px-2"
        variant={"outline"}
        onClick={() => {
          setLoggedSets(dayEx.reps.length);
        }}
      >
        <CheckCheck />
      </Button>
    </>
  );
}
