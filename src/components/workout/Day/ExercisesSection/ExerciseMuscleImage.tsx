import { FullMusclesImage } from "~/components/workout/AllMusclesImage";

import type { DayExercise } from "~/server/types";
import type { TitleCaseMuscle } from "doNotChangeMe";
import Loading from "~/app/loading";

export function ExerciseMusclesImage({ exercise }: { exercise: DayExercise }) {
  if (!exercise) return <Loading />;

  return (
    <div className="min-w-[100px] max-w-[100px]">
      <FullMusclesImage
        primaryMuscle={exercise.info.primaryMuscle as TitleCaseMuscle | null}
        secondaryMuscles={
          exercise.info.secondaryMuscles as TitleCaseMuscle[] | null
        }
      />
    </div>
  );
}
