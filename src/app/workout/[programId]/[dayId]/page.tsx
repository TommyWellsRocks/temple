import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { useProgram } from "~/context/useProgram";
import { ActionButtons } from "~/components/workout/Day/ActionButtons";
import { NavHeader } from "~/components/workout/Exercise/NavHeader";
import { SectionHeader } from "~/components/workout/Common/SectionHeader";
import { getExercises } from "~/server/queries/exercises";
import { AddButtonOverlay } from "~/components/workout/Common/AddButtonOverlay";
import { DataTable } from "~/components/workout/Day/DataTable";
import { ExerciseMuscleImage } from "~/utils/AllMusclesImage";
import { toTitleCase } from "~/utils/helpers";
import { EditButtonPopover } from "~/components/workout/Common/EditButtonPopover";
import { ExerciseForm } from "~/components/workout/Day/ExerciseForm";
import { FocusMuscles } from "~/components/workout/Day/FocusMuscles";
import Link from "next/link";

// * DAY OVERVIEW PAGE

export const dynamic = "force-dynamic";

export default async function DayOverview(context: any | unknown) {
  const session = await auth();
  const { programId, dayId } = context.params as {
    programId: string;
    dayId: string;
  };
  if (!session?.user?.id)
    return redirect(
      `/signin?return=${encodeURIComponent(`/workout/${programId}/${dayId}`)}`,
    );

  const program = await useProgram(session.user.id, Number(programId));
  const programDay = program?.programDays.find(
    (day) => day.id === Number(dayId),
  );
  if (!programDay) return redirect("/workout");
  const allExercises = await getExercises(programDay.userId);

  return (
    <>
      <NavHeader programDay={programDay} />

      <section className="flex flex-col gap-y-2">
        <SectionHeader title="Today's Focus" />

        <FocusMuscles programDay={programDay} />
      </section>

      <section className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <SectionHeader
            title={`${programDay.dayExercises.length} ${programDay.dayExercises.length > 1 ? "Exercises" : "Exercise"}`}
          />
          <AddButtonOverlay
            title="Add Exercise"
            description="Add an exercise to your workout. Click add when you're done."
            formComponent={
              <DataTable programDay={programDay} exercises={allExercises} />
            }
          />
        </div>

        <div className="flex flex-col gap-y-3">
          {programDay.dayExercises.map((exercise) => {
            const isDone = exercise.reps.length === exercise.loggedSetsCount;
            const maxReps = Math.max(...exercise.reps);
            const maxWeight = Math.max(...exercise.weight);
            return (
              <div className="relative flex items-center" key={exercise.id}>
                <Link
                  href={`/workout/${programId}/${dayId}/${exercise.id}`}
                  className={`flex w-full items-center gap-x-2 rounded-lg pr-10 ${isDone ? "bg-doneDark text-muted-foreground" : "bg-undoneDark"}`}
                >
                  <ExerciseMuscleImage
                    primaryMuscle={exercise.info.primaryMuscle}
                    secondaryMuscles={exercise.info.secondaryMuscles}
                    widthInPx={100}
                  />
                  <div className="flex flex-col gap-y-1">
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
                        <span className="rounded-md bg-muted-foreground px-2 py-0.5">
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
                        userId={session.user!.id!}
                        programId={Number(programId)}
                        dayExercise={exercise}
                      />
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ActionButtons programDay={programDay} />
    </>
  );
}
