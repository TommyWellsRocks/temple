import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { DoneButton } from "./DoneButton";
import { LogSetsButtons } from "./LogSetsButtons";
import Loading from "~/app/loading";

export function ActionButtons() {
  const [dayEx, startedWorkout, endedWorkout] = useProgram((state) => [
    state.dayExercise,
    state.day?.startedWorkout,
    state.day?.endedWorkout,
  ]);

  if (!dayEx || startedWorkout === undefined || endedWorkout === undefined)
    return <Loading />;

  const dayNotStarted = startedWorkout === null && endedWorkout === null;
  const dayIsDone = startedWorkout !== null && endedWorkout !== null;
  if (dayNotStarted || dayIsDone) return;

  const allLogged = dayEx.loggedSetsCount === dayEx.reps.length;

  return (
    <div className="sticky bottom-5 flex justify-between gap-x-4">
      {allLogged ? <DoneButton /> : <LogSetsButtons />}
    </div>
  );
}
