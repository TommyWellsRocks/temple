import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { ExerciseItem } from "./ExerciseItem";
import Loading from "~/app/loading";

export function ExercisesList() {
  const dayExercises = useProgram((state) => state.day?.dayExercises);
  if (!dayExercises) return <Loading />;

  return (
    <div className="flex flex-col gap-y-6">
      {dayExercises
        .sort((a, b) => a.id - b.id)
        .map((exercise) => (
          <ExerciseItem key={exercise.id} exercise={exercise} />
        ))}
    </div>
  );
}
