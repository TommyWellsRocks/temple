import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { handleEndWorkout } from "~/server/actions/workout/DayActions";

export function LogWorkoutButton() {
  const setEndWorkout = useProgram.getState().updateDay;
  const day = useProgram((state) => state.day);

  if (!day) return;

  return (
    <div
      className="flex w-full items-center justify-center rounded-md bg-primary text-sm"
      onClick={() => {
        const endedWorkout = new Date();
        day.endedWorkout = endedWorkout;
        setEndWorkout(day);
        handleEndWorkout(day.userId, day.id, endedWorkout);
      }}
    >
      Log Workout
    </div>
  );
}
