import {
  getLastSessionExercise,
  getMyDayExercise,
  getMyExerciseAnalytics,
} from "~/server/queries/workouts";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { Navigation } from "~/components/ui/Navigation";
import { LineChart } from "~/components/ui/Linechart";
import { ActivityInfo } from "~/components/workout/Exercise/ActivityInfo";
import { SetInputs } from "~/components/workout/Exercise/SetInputs";
import { ExerciseTabs } from "~/components/workout/Exercise/ExerciseTabs";

// * EXERCISE PAGE

export default async function Exercise(context: any | unknown) {
  const session = await auth();
  const { programId, dayId, dayExerciseId } = context.params as {
    programId: string;
    dayId: string;
    dayExerciseId: string;
  };
  if (!session || !session.user || !session.user.id)
    return redirect(
      `/signin?return=${encodeURIComponent(`/workout/${programId}/${dayId}/${dayExerciseId}`)}`,
    );

  const dayExercise = await getMyDayExercise(
    session.user.id,
    Number(programId),
    Number(dayId),
    Number(dayExerciseId),
  );
  if (!dayExercise) return redirect("/workout");

  const previousSessionExercise = await getLastSessionExercise(dayExercise);

  // LineChart
  const [lastSessionVolume, currentSessionVolume] =
    await getMyExerciseAnalytics(dayExercise, previousSessionExercise);

  // ActivityInfo
  const setCount = dayExercise.reps.length;

  return (
    <>
      <Navigation
        backURL={`/workout/${programId}/${dayId}`}
        heading={`${dayExercise.info.name}`}
      />

      <LineChart
        measureOf="Volume"
        xLabels={
          lastSessionVolume
            ? lastSessionVolume!.length < currentSessionVolume!.length
              ? currentSessionVolume!.map((_, index) => `Set ${index + 1}`)
              : lastSessionVolume!.map((_, index) => `Set ${index + 1}`)
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
      />

      <SetInputs dayExercise={dayExercise} />

      <ExerciseTabs dayExercise={dayExercise} />
    </>
  );
}
