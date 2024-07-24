import {
  getDayExercise,
  getExerciseAnalytics,
} from "~/server/queries/workouts";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { Navigation } from "~/components/workout/Navigation";
import { LineChart } from "~/components/workout/Linechart";
import { InputRows } from "~/components/workout/Exercise/InputRows";
import { EditSets } from "~/components/workout/Exercise/EditSets";
import { ExerciseTabs } from "~/components/workout/Exercise/ExerciseTab";

export default async function DayExercise(context: any | unknown) {
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
          page="Individual"
          previousData={lastSessionVolume!}
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
          <EditSets
            method="Add"
            userId={session.user.id}
            dayExercise={exercise}
          />
          <EditSets
            method="Delete"
            userId={session.user.id}
            dayExercise={exercise}
          />
        </div>
      </section>

      <ExerciseTabs exercise={exercise} />
    </main>
  );
}
