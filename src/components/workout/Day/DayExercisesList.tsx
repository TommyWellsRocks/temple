import Link from "next/link";
import { useProgram } from "~/stores/ProgramStore";
import { ExerciseMuscleImage } from "~/utils/AllMusclesImage";
import { toTitleCase } from "~/utils/helpers";
import { EditButtonPopover } from "../Common/EditButtonPopover";
import { ExerciseForm } from "./ExerciseForm";

export function DayExercisesList({ dayId }: { dayId: number }) {
  const dayExercises = useProgram(
    (state) =>
      state.program?.programDays.find((day) => day.id == dayId)?.dayExercises,
  );
  if (!dayExercises) return;

  return (
    <div className="flex flex-col gap-y-3">
      {dayExercises
        .sort((a, b) => a.id - b.id)
        .map((exercise) => {
          const isDone = exercise.reps.length === exercise.loggedSetsCount;
          const maxReps = Math.max(...exercise.reps);
          const maxWeight = Math.max(...exercise.weight);
          return (
            <div className="relative flex items-center" key={exercise.id}>
              <Link
                href={`/workout/${exercise.programId}/${exercise.dayId}/${exercise.id}`}
                className={`flex w-full items-center gap-x-2 rounded-lg pr-10 ${isDone ? "bg-doneDark text-muted-foreground" : "bg-undoneDark"}`}
              >
                <ExerciseMuscleImage
                  primaryMuscle={exercise.info.primaryMuscle}
                  secondaryMuscles={exercise.info.secondaryMuscles}
                  widthInPx={100}
                />
                <div className="flex flex-col gap-y-1 py-4">
                  <span className="text-base">
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
                    {exercise.info.secondaryMuscles?.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-md bg-muted px-2 py-0.5"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="absolute right-1 mx-2 pb-1">
                <EditButtonPopover
                  title="Edit Exercise"
                  description={`Remember to click save when you're done.`}
                  formComponent={
                    <ExerciseForm
                      userId={exercise.userId}
                      programId={exercise.programId}
                      dayExercise={exercise}
                    />
                  }
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
