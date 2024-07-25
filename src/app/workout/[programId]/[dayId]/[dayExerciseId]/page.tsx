import {
  getDayExercise,
  getExerciseAnalytics,
} from "~/server/queries/workouts";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { Navigation } from "~/components/workout/Navigation";
import { LineChart } from "~/components/workout/Linechart";
import { InputRows } from "~/components/workout/Exercise/InputRows";
import { EditSetCount } from "~/components/workout/Exercise/EditSetCount";
import { ExerciseTabs } from "~/components/workout/Exercise/ExerciseTabs";

export default async function MyDayExercise(context: any | unknown) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const { programId, dayId, dayExerciseId } = context.params as {
    programId: string;
    dayId: string;
    dayExerciseId: string;
  };
  const exercise = await getDayExercise(
    session.user.id,
    Number(programId),
    Number(dayId),
    Number(dayExerciseId),
  );
  if (!exercise) return "INVALID URL";

  const setCount = exercise.reps.length;
  const [lastSessionVolume, currentSessionVolume] = (await getExerciseAnalytics(
    session.user.id,
    Number(exercise.info.id),
    exercise,
  )) as number[][];

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <Navigation
        backURL={`/workout/${programId}/${dayId}`}
        heading={`${exercise.info.name}`}
      />

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        <LineChart
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
        <div className="text-sm font-light underline underline-offset-4">
          {setCount}
          {setCount === 1 ? " Set" : " Sets"}
        </div>
        <div className="flex flex-col gap-y-5">
          <InputRows userId={session.user.id} dayExercise={exercise} />
        </div>
        <div className="flex gap-x-5">
          <EditSetCount
            method="Add"
            userId={session.user.id}
            dayExercise={exercise}
          />
          <EditSetCount
            method="Delete"
            userId={session.user.id}
            dayExercise={exercise}
          />
        </div>
      </section>

      <ExerciseTabs dayExercise={exercise} />
    </main>
  );
}
