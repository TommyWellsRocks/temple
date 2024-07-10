import Nav from "../../_components/Nav";
import LineChart from "../../_components/Linechart";
import { getExerciseAnalytics, getWorkout } from "~/server/queries/workouts";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { InputRows } from "./_components/InputRows";
import { EditSets } from "./_components/EditSets";

export default async function Individual(context: any | unknown) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const { planId, exerciseId } = context.params as {
    planId: string;
    exerciseId: string;
  };
  const workoutPlan = await getWorkout(session.user.id, Number(planId));
  if (!workoutPlan) return "INVALID PLAN";

  const exerciseIndex = workoutPlan.sessionExercises.findIndex(
    (exercise) => exercise.info.id === Number(exerciseId),
  );
  if (exerciseIndex === -1) return "INVALID EXERCISE";
  const sessionExercise = workoutPlan.sessionExercises[exerciseIndex]!;
  const exerciseInfo = sessionExercise.info;
  const setCount = sessionExercise.reps.length;

  const [lastSessionVolume, currentSessionVolume] = (await getExerciseAnalytics(
    session.user.id,
    Number(exerciseId),
    sessionExercise,
  )) as number[][];

  return (
    <div className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <Nav exerciseName={exerciseInfo.name} planId={planId} />

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
          <InputRows sessionExercise={sessionExercise} />
        </div>
        <div className="flex gap-x-5">
          <EditSets
            method="Add"
            userId={session.user.id}
            sessionExercise={sessionExercise}
          />
          <EditSets
            method="Delete"
            userId={session.user.id}
            sessionExercise={sessionExercise}
          />
        </div>
      </section>

      <section>
        <div className="mb-2 flex justify-between rounded-xl bg-black bg-opacity-40 p-0.5 text-base font-normal">
          <div className="cursor-pointer rounded-xl bg-primary px-5 py-1 font-medium">
            Notes
          </div>
          <div className="cursor-pointer px-3 py-1">Tips</div>
          <div className="cursor-pointer px-3 py-1">Instructions</div>
          <div className="cursor-pointer px-3 py-1">Muscles</div>
        </div>
        <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
          {"Notes here"}
        </div>
      </section>
    </div>
  );
}
