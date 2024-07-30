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

export default async function MyDayExercise(context: any | unknown) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const { programId, dayId, dayExerciseId } = context.params as {
    programId: string;
    dayId: string;
    dayExerciseId: string;
  };
  const dayExercise = await getMyDayExercise(
    session.user.id,
    Number(programId),
    Number(dayId),
    Number(dayExerciseId),
  );
  if (!dayExercise) return "INVALID URL";
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
          title="Exercise Analytics"
          measureOf="Volume"
          xLabels={
            lastSessionVolume!.length < currentSessionVolume!.length
              ? currentSessionVolume!.map((_, index) => `Set ${index + 1}`)
              : lastSessionVolume!.map((_, index) => `Set ${index + 1}`)
          }
          prevLabel="Last Session's Volume"
          previousData={lastSessionVolume!}
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
