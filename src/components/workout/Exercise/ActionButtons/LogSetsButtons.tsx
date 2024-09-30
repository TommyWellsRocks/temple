import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { Button } from "~/components/ui/button";
import { CheckCheck } from "lucide-react";
import Loading from "~/app/loading";

export function LogSetsButtons() {
  const dayEx = useProgram((state) => state.dayExercise);
  const updateLoggedSets = useProgram.getState().updateExerciseLoggedSets;
  if (!dayEx) return <Loading />;

  return (
    <>
      <div className="w-[42px]" />
      <Button
        id="log-set-button"
        className="w-full"
        onClick={() => {
          dayEx.loggedSetsCount++;
          updateLoggedSets(
            dayEx.programId,
            dayEx.dayId,
            dayEx.id,
            dayEx.userId,
            dayEx.loggedSetsCount,
          );
        }}
      >
        Log Set
      </Button>

      <Button
        id="log-all-button"
        className="rounded-full px-2"
        variant={"outline"}
        onClick={() => {
          dayEx.loggedSetsCount = dayEx.reps.length;
          updateLoggedSets(
            dayEx.programId,
            dayEx.dayId,
            dayEx.id,
            dayEx.userId,
            dayEx.loggedSetsCount,
          );
        }}
      >
        <CheckCheck />
      </Button>
    </>
  );
}
