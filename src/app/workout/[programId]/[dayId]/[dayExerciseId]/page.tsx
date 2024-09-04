"use client";

// import {
//   getLastSessionExercise,
//   getMyExerciseAnalytics,
// } from "~/server/queries/workouts";
// import { LineChart } from "~/components/ui/Linechart";
// import { ActivityInfo } from "~/components/workout/Exercise/ActivityInfo";
import { useRouter } from "next/navigation";
import { useProgram } from "~/stores/ProgramStore";
import { Navigation } from "~/components/ui/Navigation";
import { SetInputs } from "~/components/workout/Exercise/SetInputs";
import { ExerciseTabs } from "~/components/workout/Exercise/ExerciseTabs";
import { ActionButtons } from "~/components/workout/Exercise/ActionButtons";
import { ExerciseProvider } from "~/context/ExerciseContext";

// * EXERCISE PAGE

export default async function Exercise({
  params,
}: {
  params: { dayExerciseId: string; dayId: string };
}) {
  const router = useRouter();
  const program = useProgram((state) => state.program);
  if (!program) return router.push("/workout");

  const programDay = program.programDays.find(
    (day) => day.id === Number(params.dayId),
  );
  const dayExercise = programDay?.dayExercises.find(
    (ex) => ex.id === Number(params.dayExerciseId),
  );
  if (!dayExercise) return router.push(`/workout/${program.id}/${params.dayId}`);

  // const previousSessionExercise = await getLastSessionExercise(dayExercise);

  // // LineChart
  // const [lastSessionVolume, currentSessionVolume] =
  //   await getMyExerciseAnalytics(dayExercise, previousSessionExercise);

  // ActivityInfo
  // const setCount = dayExercise.reps.length;

  return (
    <>
      <Navigation
        backURL={`/workout/${program.id}/${params.dayId}`}
        heading={`${dayExercise.notes?.name ? dayExercise.notes.name : dayExercise.info.name}`}
      />

      {/* <LineChart
        measureOf="Volume"
        xLabels={
          lastSessionVolume
            ? lastSessionVolume.length < currentSessionVolume!.length
              ? currentSessionVolume!.map((_, index) => `Set ${index + 1}`)
              : lastSessionVolume.map((_, index) => `Set ${index + 1}`)
            : currentSessionVolume!.map((_, index) => `Set ${index + 1}`)
        }
        prevLabel={lastSessionVolume ? "Last Session's Volume" : undefined}
        previousData={lastSessionVolume ? lastSessionVolume : undefined}
        currentLabel="Current Session's Volume"
        currentData={currentSessionVolume!}
      />

      <ActivityInfo
        setCount={setCount}
        previousExercise={previousSessionExercise}
      /> */}

      <ExerciseProvider dayExercise={dayExercise}>
        <SetInputs />

        <ExerciseTabs />

        <ActionButtons />
      </ExerciseProvider>
    </>
  );
}
