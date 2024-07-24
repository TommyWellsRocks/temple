import Link from "next/link";
import Image from "next/image";
import Nav from "../../_components/Nav";
import LineChart from "../../_components/Linechart";
import playButtonURL from "/public/content/images/workout/action-play.svg";
import trophyButtonURL from "/public/content/images/workout/action-trophy.svg";
import { getWeekAnalytics, getProgramDay } from "~/server/queries/workouts";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { AddExercises } from "./_components/AddExercises";
import { DeleteExercises } from "./_components/DeleteExercises";
import { getExercises } from "~/server/queries/exercises";

export default async function DayOverview(context: any | unknown) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const { programId, dayId } = context.params as {
    programId: string;
    dayId: string;
  };
  const workoutPlan = await getProgramDay(
    session.user.id,
    Number(programId),
    Number(dayId),
  );
  if (!workoutPlan) return "INVALID PLAN";
  const exercises = workoutPlan.dayExercises;
  const allExercises = await getExercises();

  const [lastWeek, thisWeek] = await getWeekAnalytics(session.user.id!);
  const doneCount = exercises.filter(
    (exercise) => !exercise.reps.includes(0),
  ).length;

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <Nav backURL={`/workout/${programId}`} heading="The Overview" />

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        <LineChart
          page="Overview"
          previousData={await lastWeek!}
          currentData={await thisWeek!}
        />
      </section>

      <section>
        <h3 className="pb-2">Today's Muscles</h3>
        <div className="flex gap-x-3.5">
          {exercises.map(async (exercise) => {
            return (
              <Image
                className="w-15 rounded-lg border border-primary bg-white p-0.5"
                src={
                  exercise.info.targetMuscleImages
                    ? (exercise.info.targetMuscleImages[0] as string)
                    : "https://placehold.co/600x400"
                }
                alt="Target muscle image."
                width={80}
                height={80}
              />
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex justify-between">
          <h3 className="pb-2">The Checklist 😎</h3>
          <h3 className="text-sm font-light">
            <strong className="text-xl">{doneCount}</strong> /{exercises.length}
          </h3>
        </div>

        <div className="flex flex-col gap-y-3">
          {exercises.map(async (exercise) => {
            const isDone = !exercise.reps.includes(0);

            return (
              <Link
                className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-2 ${isDone ? "bg-doneDark" : "bg-undoneDark"}`}
                href={`/workout/${workoutPlan.id}/${exercise.info.id}`}
              >
                <div className="flex items-start gap-x-3">
                  <Image
                    className="mt-1 rounded-md"
                    src={
                      exercise.info.images
                        ? (exercise.info.images[0] as string)
                        : "https://placehold.co/200x200"
                    }
                    alt="Exercise Image."
                    width={50}
                    height={50}
                  />
                  <div>
                    <div className="text-base">{exercise.info.name}</div>
                    <div className="text-sm font-light">
                      {exercise.info.tips.slice(0, 40)}...
                    </div>
                  </div>
                </div>
                <Image
                  className="rounded-full border border-primary"
                  src={isDone ? trophyButtonURL : playButtonURL}
                  alt="Action."
                />
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center gap-3 pt-5">
          <AddExercises
            userId={session.user.id}
            programId={Number(programId)}
            dayId={Number(dayId)}
            programDay={workoutPlan}
            exercises={allExercises}
          />
          <DeleteExercises
            userId={session.user.id}
            programId={Number(programId)}
            dayId={Number(dayId)}
            programDay={workoutPlan}
            exercises={allExercises}
          />
        </div>
      </section>
    </main>
  );
}
