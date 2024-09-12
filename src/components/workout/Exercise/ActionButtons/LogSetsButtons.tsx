import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { handleUpdateLoggedSets } from "~/server/actions/workout/ExerciseActions";

import { Button } from "~/components/ui/button";
import { CheckCheck } from "lucide-react";

export function LogSetsButtons() {
  const dayEx = useProgram((state) => state.dayExercise);
  const setLoggedSets = useProgram().updateDayExercise;
  if (!dayEx) return;

  return (
    <>
      <div className="w-[42px]" />
      <Button
        className="w-full"
        onClick={() => {
          dayEx.loggedSetsCount++;
          setLoggedSets(dayEx);
          handleUpdateLoggedSets(dayEx.id, dayEx.userId, dayEx.loggedSetsCount);
        }}
      >
        Log Set
      </Button>

      <Button
        className="rounded-full px-2"
        variant={"outline"}
        onClick={() => {
          dayEx.loggedSetsCount = dayEx.reps.length;
          setLoggedSets(dayEx);
          handleUpdateLoggedSets(dayEx.id, dayEx.userId, dayEx.loggedSetsCount);
        }}
      >
        <CheckCheck />
      </Button>
    </>
  );
}
