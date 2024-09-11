import { useProgram } from "~/hooks/workout/useProgram/useProgram";

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
        setStartWorkout(userId, dayId);
      }}
    >
      <Zap width={15} /> Start Workout
    </Button>
  );
}
