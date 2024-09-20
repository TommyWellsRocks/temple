import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import Loading from "~/app/loading";
import { Button } from "~/components/ui/button";

export function LogWorkoutButton() {
  const endWorkout = useProgram.getState().endWorkout;
  const day = useProgram((state) => state.day);

  if (!day) return <Loading />;

  return (
    <Button
      className="flex w-full items-center justify-center rounded-md bg-primary text-sm"
      onClick={() => endWorkout(day.userId, day.programId, day.id)}
    >
      Log Workout
    </Button>
  );
}
