import { useProgram } from "~/hooks/workout/useProgram";

import { StartWorkoutButton } from "./StartWorkoutButton";
import { EndWorkoutDrawer } from "./EndWorkoutDrawer";

export function ActionButtons() {
  const [startedWorkout, endedWorkout] = useProgram((state) => [
    state.day?.startedWorkout,
    state.day?.endedWorkout,
  ]);

  if (startedWorkout === undefined || endedWorkout === undefined) return;

  const showStartButton = startedWorkout === null;
  const showEndButton = startedWorkout !== null && endedWorkout === null;

  return (
    <div className="sticky bottom-5 flex justify-end">
      {showStartButton ? <StartWorkoutButton /> : null}

      {showEndButton ? <EndWorkoutDrawer /> : null}
    </div>
  );
}
