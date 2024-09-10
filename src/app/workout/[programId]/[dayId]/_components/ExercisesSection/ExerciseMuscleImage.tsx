import type { DayExercise } from "~/server/types";

import { FullMusclesImage } from "~/utils/AllMusclesImage";

export function ExerciseMusclesImage({ exercise }: { exercise: DayExercise }) {
  if (!exercise) return;

  return (
    <div className="min-w-[100px] max-w-[100px]">
      <FullMusclesImage
        primaryMuscle={exercise.info.primaryMuscle}
        secondaryMuscles={exercise.info.secondaryMuscles}
      />
    </div>
  );
}
