import Link from "next/link";
import { ExerciseMusclesImage } from "./ExerciseMuscleImage";

import type { DayExercise } from "~/server/types";
import { ExerciseItemText } from "./ExerciseItemText";
import { ExerciseEditButton } from "./ExerciseEditButton";

export function ExerciseItem({ exercise }: { exercise: DayExercise }) {
  if (!exercise) return;

  return (
    <div className="relative flex items-center" key={exercise.id}>
      <Link
        href={`/workout/${exercise.programId}/${exercise.dayId}/${exercise.id}`}
        className={`flex w-full items-center gap-x-2 rounded-lg pr-10`}
      >
        <ExerciseMusclesImage exercise={exercise} />

        <ExerciseItemText exercise={exercise} />
      </Link>

      <ExerciseEditButton exercise={exercise} />
    </div>
  );
}
