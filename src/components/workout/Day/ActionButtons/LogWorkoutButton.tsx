import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { handleEndWorkout } from "~/server/actions/workout/DayActions";

export function LogWorkoutButton() {
  const setEndWorkout = useProgram.getState().setEndWorkout;
  const [userId, dayId] = useProgram((state) => [
    state.day?.userId,
    state.day?.id,
  ]);

  if (!userId || !dayId) return;

  return (
    <div
      className="flex w-full items-center justify-center rounded-md bg-primary text-sm"
      onClick={() => {
        const endedWorkout = new Date();
        setEndWorkout(dayId, endedWorkout);
        handleEndWorkout(userId, dayId, endedWorkout);
      }}
    >
      Log Workout
    </div>
  );
}
