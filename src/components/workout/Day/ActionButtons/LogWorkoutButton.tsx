import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import Loading from "~/app/loading";
import { Button } from "~/components/ui/button";

import { handleEndWorkout } from "~/server/actions/workout/DayActions";

export function LogWorkoutButton() {
  const setEndWorkout = useProgram.getState().updateDay;
  const day = useProgram((state) => state.day);

  if (!day) return <Loading />;

  return (
    <Button
      className="flex w-full items-center justify-center rounded-md bg-primary text-sm"
      onClick={() => {
        const endedWorkout = new Date();
        day.endedWorkout = endedWorkout;
        setEndWorkout(day);
        handleEndWorkout(day.userId, day.id, endedWorkout);
      }}
    >
      Log Workout
    </Button>
  );
}
