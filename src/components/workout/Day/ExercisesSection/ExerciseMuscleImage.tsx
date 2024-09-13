
import { FullMusclesImage } from "~/components/workout/AllMusclesImage";

import type { DayExercise } from "~/server/types";
import type { TitleCaseMuscle } from "doNotChangeMe";

export function ExerciseMusclesImage({ exercise }: { exercise: DayExercise }) {
  if (!exercise) return;

  return (
    <div className="min-w-[100px] max-w-[100px]">
      <FullMusclesImage
        primaryMuscle={exercise.info.primaryMuscle as TitleCaseMuscle | null}
        secondaryMuscles={exercise.info.secondaryMuscles as TitleCaseMuscle[] | null}
      />
    </div>
  );
}
