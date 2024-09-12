import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { handleStartWorkout } from "~/server/actions/workout/DayActions";

import { Button } from "~/components/ui/button";
import { Zap } from "lucide-react";

export function StartWorkoutButton() {
  const setStartWorkout = useProgram.getState().setStartWorkout;
  const [userId, dayId] = useProgram((state) => [
    state.day?.userId,
    state.day?.id,
  ]);

  if (!userId || !dayId) return;

  return (
    <Button
      className="flex gap-1"
      onClick={() => {
        const startedWorkout = new Date();
        setStartWorkout(dayId, startedWorkout);
        handleStartWorkout(userId, dayId, startedWorkout);
      }}
    >
      <Zap width={15} /> Start Workout
    </Button>
  );
}
