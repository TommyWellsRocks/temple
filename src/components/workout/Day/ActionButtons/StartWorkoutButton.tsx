import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { handleStartWorkout } from "~/server/actions/workout/DayActions";

import { Button } from "~/components/ui/button";
import { Zap } from "lucide-react";
import Loading from "~/app/loading";

export function StartWorkoutButton() {
  const setStartWorkout = useProgram.getState().updateDay;
  const day = useProgram((state) => state.day);

  if (!day) return <Loading />;

  return (
    <Button
      className="flex gap-1"
      onClick={() => {
        const startedWorkout = new Date();
        day.startedWorkout = startedWorkout;
        setStartWorkout(day);
        handleStartWorkout(day.userId, day.id, startedWorkout);
      }}
    >
      <Zap width={15} /> Start Workout
    </Button>
  );
}
