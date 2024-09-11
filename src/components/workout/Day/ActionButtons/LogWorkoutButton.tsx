import { useProgram } from "~/hooks/workout/useProgram/useProgram";

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
        setEndWorkout(userId, dayId);
      }}
    >
      Log Workout
    </div>
  );
}
