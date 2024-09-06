"use client";

// import {
//   getLastSessionExercise,
//   getMyExerciseAnalytics,
// } from "~/server/queries/workouts";
// import { LineChart } from "~/components/ui/Linechart";
// import { ActivityInfo } from "~/components/workout/Exercise/ActivityInfo";
import { setDayExercise, useProgram } from "~/stores/ProgramStore";
import { Navigation } from "~/components/ui/Navigation";
import { SetInputs } from "~/components/workout/Exercise/SetInputs";
import { ExerciseTabs } from "~/components/workout/Exercise/ExerciseTabs";
import { ActionButtons } from "~/components/workout/Exercise/ActionButtons";

// * EXERCISE PAGE

export default function Exercise({
  params,
}: {
  params: { programId: string; dayExerciseId: string; dayId: string };
}) {
  setDayExercise(Number(params.dayId), Number(params.dayExerciseId));
  const dayExercise = useProgram((state) => state.dayExercise);
  if (!dayExercise) return;

  // const previousSessionExercise = await getLastSessionExercise(dayExercise);

  // // LineChart
  // const [lastSessionVolume, currentSessionVolume] =
  //   await getMyExerciseAnalytics(dayExercise, previousSessionExercise);

  // ActivityInfo
  // const setCount = dayExercise.reps.length;

  return (
    <>
      <Navigation
        backURL={`/workout/${Number(params.programId)}/${params.dayId}`}
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

      <SetInputs />

      <ExerciseTabs />

      <ActionButtons />
    </>
  );
}
