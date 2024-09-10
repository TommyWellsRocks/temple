import { useProgram } from "~/hooks/workout/useProgram";

import { ExerciseItem } from "./ExerciseItem";

export function ExercisesList() {
  const dayExercises = useProgram((state) => state.day?.dayExercises);
  if (!dayExercises) return;

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
