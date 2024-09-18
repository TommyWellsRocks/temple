import Loading from "~/app/loading";
import type { DayExercise } from "~/server/types";

import { toTitleCase } from "~/utils/helpers";

export function ExerciseItemText({ exercise }: { exercise: DayExercise }) {
  if (!exercise) return <Loading />;

  const isDone = exercise.reps.length === exercise.loggedSetsCount;
  const maxReps = Math.max(...exercise.reps);
  const maxWeight = Math.max(...exercise.weight);

  return (
    <div className="flex flex-col gap-y-1">
      <span className={`${isDone ? "line-through opacity-35" : ""} text-base`}>
        {exercise.notes?.name
          ? toTitleCase(exercise.notes.name)
          : toTitleCase(exercise.info.name)}
      </span>
      <div className="flex flex-wrap gap-x-2 text-sm font-light text-muted-foreground">
        <span>{exercise.reps.length} Sets</span>
        {maxReps > 0 ? (
          <>
            <span>x</span>
            <span>{maxReps} Reps</span>
          </>
        ) : null}
        {maxWeight > 0 ? (
          <>
            <span>x</span>
            <span>{maxWeight} lbs</span>
          </>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-x-2 text-xs">
        {exercise.info.primaryMuscle ? (
          <span className="rounded-md bg-muted-foreground px-2 py-0.5 text-muted">
            {exercise.info.primaryMuscle}
          </span>
        ) : null}
        {exercise.info.secondaryMuscles?.slice(0, 2).map((muscle) => (
          <span key={muscle} className="rounded-md bg-muted px-2 py-0.5">
            {muscle}
          </span>
        ))}
      </div>
    </div>
  );
}
