import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { Button } from "~/components/ui/button";
import { Zap } from "lucide-react";
import Loading from "~/app/loading";

export function StartWorkoutButton() {
  const startWorkout = useProgram.getState().startWorkout;
  const day = useProgram((state) => state.day);
  if (!day) return <Loading />;

  return (
    <Button
      className="flex gap-1"
      onClick={() => startWorkout(day.userId, day.programId, day.id)}
    >
      <Zap width={15} /> Start Workout
    </Button>
  );
}
