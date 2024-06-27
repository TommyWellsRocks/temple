import { Exercise, WorkoutPlan } from "~/server/types";
import { getVolumeData } from "~/server/queries/workoutSessions";
import { getWorkoutPlan } from "~/server/queries/workoutPlans";
import { getExercise } from "~/server/queries/exercises";
import LineChart from "../_components/linechart";
import Link from "next/link";
import Image from "next/image";
import playButtonURL from "../../../../public/content/images/workout/action-play.svg";
import trophyButtonURL from "../../../../public/content/images/workout/action-trophy.svg";

// export const metadata = {
//   title: "Workout Overview",
//   description: "Built to spec.",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

export default async function WorkoutOverview(context: any | unknown) {
  // TODO auth goes here
  const userId = 1;
  const { planId } = context.params;
  if (isNaN(Number(planId))) return "INVALID PLAN ERROR";

  const workoutPlan = (await getWorkoutPlan(
    userId,
    Number(planId),
  )) as WorkoutPlan;
  if (!workoutPlan) return "NO PLAN ERROR";
  const [lastWeek, thisWeek] = await getVolumeData(userId);

  let doneCount = 0;
  const exercises = await Promise.all(
    workoutPlan.workoutItems.map(async (item) => {
      if (!item.reps.includes(0)) doneCount += 1;
      return (await getExercise(item.exerciseId)) as Exercise;
    }),
  );

  return (
    <div className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        <LineChart
          page="Overview"
          previousData={lastWeek!}
          currentData={thisWeek!}
        />
      </section>

      <section>
        <h3 className="pb-2">Today's Muscles</h3>
        <div className="flex gap-x-3.5">
          {exercises.map(async (exercise) => {
            return (
              <Image
                className="border-thePurple w-15 rounded-lg border bg-white p-0.5"
                src={
                  exercise.targetMuscleImages
                    ? (exercise.targetMuscleImages[0] as string)
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
            <strong className="text-xl">{doneCount}</strong> /
            {workoutPlan!.workoutItems.length}
          </h3>
        </div>

        <div className="flex flex-col gap-y-3">
          {exercises.map(async (exercise, index) => {
            const isDone = !workoutPlan.workoutItems[index]!.reps.includes(0);

            return (
              <Link
                className={`flex items-center justify-between rounded-xl px-4 py-2 ${isDone ? "bg-doneBlack" : "bg-secondaryBackground"}`}
                href={`/workout/${workoutPlan.id}/${exercise.id}`}
              >
                {" "}
                <div className="flex items-start gap-x-3">
                  <Image
                    className="mt-1 rounded-md"
                    src={
                      exercise.images
                        ? (exercise.images[0] as string)
                        : "https://placehold.co/200x200"
                    }
                    alt="Exercise Image."
                    width={50}
                    height={50}
                  />
                  <div>
                    <div className="text-base">{exercise.name}</div>
                    <div className="text-sm font-light">
                      {exercise.tips.slice(0, 40)}...
                    </div>
                  </div>
                </div>
                <Image
                  className="border-thePurple rounded-full border"
                  src={isDone ? trophyButtonURL : playButtonURL}
                  alt="Action."
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
