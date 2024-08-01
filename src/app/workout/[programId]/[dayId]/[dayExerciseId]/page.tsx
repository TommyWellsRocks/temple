import {
  getLastSessionExercise,
  getMyDayExercise,
  getMyExerciseAnalytics,
} from "~/server/queries/workouts";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { Navigation } from "~/components/workout/Navigation";
import { LineChart } from "~/components/workout/Linechart";
import { ExerciseTabs } from "~/components/workout/pages/Exercise/ExerciseTabs";
import { ExerciseInputs } from "~/components/workout/pages/Exercise/ExerciseInputs";

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

  const lastDayExercise = await getLastSessionExercise(dayExercise);

  // LineChart
  const [lastSessionVolume, currentSessionVolume] =
    await getMyExerciseAnalytics(dayExercise, lastDayExercise);

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <Navigation
        backURL={`/workout/${programId}/${dayId}`}
        heading={`${dayExercise.info.name}`}
      />

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
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
      </section>

      <section className="flex flex-col items-center justify-center gap-y-5">
        <ExerciseInputs
          lastDayExercise={lastDayExercise}
          dayExercise={dayExercise}
        />
      </section>

      <section>
        <ExerciseTabs dayExercise={dayExercise} />
      </section>
    </main>
  );
}
