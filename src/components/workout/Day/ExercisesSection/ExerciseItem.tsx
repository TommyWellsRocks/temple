import Link from "next/link";
import { ExerciseMusclesImage } from "./ExerciseMuscleImage";

import Loading from "~/app/loading";
import { ExerciseItemText } from "./ExerciseItemText";
import { EditButton } from "../../EditExerciseButton";

import type { DayExercise } from "~/server/types";

export function ExerciseItem({ exercise }: { exercise: DayExercise }) {
  if (!exercise) return <Loading />;

  return (
    <div className="relative flex items-center" key={exercise.id} id="exercise">
      <Link
        href={`/workout/${exercise.programId}/${exercise.dayId}/${exercise.id}`}
        className={`flex w-full items-center gap-x-2 rounded-lg pr-10`}
      >
        <ExerciseMusclesImage exercise={exercise} />

        <ExerciseItemText exercise={exercise} />
      </Link>

      <div className="absolute right-1 mx-2 pb-1">
        <EditButton exercise={exercise} />
      </div>
    </div>
  );
}
