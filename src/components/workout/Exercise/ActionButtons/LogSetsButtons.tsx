import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { handleUpdateLoggedSets } from "~/server/actions/workout/ExerciseActions";

import { Button } from "~/components/ui/button";
import { CheckCheck } from "lucide-react";

export function LogSetsButtons() {
  const dayEx = useProgram((state) => state.dayExercise);
  const setLoggedSets = useProgram().setDayExerciseLoggedSet;
  if (!dayEx) return;

  return (
    <>
      <div className="w-[42px]" />
      <Button
        className="w-full"
        onClick={() => {
          setLoggedSets(dayEx.loggedSetsCount + 1);
          handleUpdateLoggedSets(dayEx.id, dayEx.userId, dayEx.loggedSetsCount);
        }}
      >
        Log Set
      </Button>

      <Button
        className="rounded-full px-2"
        variant={"outline"}
        onClick={() => {
          setLoggedSets(dayEx.reps.length);
          handleUpdateLoggedSets(dayEx.id, dayEx.userId, dayEx.loggedSetsCount);
        }}
      >
        <CheckCheck />
      </Button>
    </>
  );
}
