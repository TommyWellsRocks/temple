import Link from "next/link";
import Image from "next/image";
import { Navigation } from "~/components/workout/Navigation";
import { LineChart } from "~/components/workout/Linechart";
import playButtonURL from "/public/content/images/workout/action-play.svg";
import trophyButtonURL from "/public/content/images/workout/action-trophy.svg";
import { getMyWeekAnalytics, getProgramDay } from "~/server/queries/workouts";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getExercises } from "~/server/queries/exercises";
import { OverlayButton } from "~/components/workout/OverlayButton";

export default async function MyDayOverview(context: any | unknown) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const { programId, dayId } = context.params as {
    programId: string;
    dayId: string;
  };
  const programDay = await getProgramDay(
    session.user.id,
    Number(programId),
    Number(dayId),
  );
  if (!programDay) return "INVALID PLAN";
  const exercises = programDay.dayExercises;
  const allExercises = await getExercises();

  const [lastWeek, thisWeek] = await getMyWeekAnalytics(session.user.id!);
  const doneCount = exercises.filter(
    (exercise) => !exercise.reps.includes(0),
  ).length;

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <Navigation backURL={`/workout/${programId}`} heading="The Overview" />

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        <LineChart
          title="Week Analytics"
          measureOf="Volume"
          xLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          prevLabel="Last Weeks's Volume"
          previousData={lastWeek!}
          currentLabel="This Week's Volume"
          currentData={thisWeek!}
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
                href={`/workout/${programId}/${dayId}/${exercise.id}`}
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
          <OverlayButton
            title="Add Exercise"
            description="Add an exercise to your workout. Click add when you're done."
            formType="Exercise"
            formProps={{
              method: "Add",
              programDay,
              exercises: allExercises,
            }}
          />
          <OverlayButton
            title="Delete Exercise"
            description="Delete an exercise from your workout. Click delete when you're done."
            formType="Exercise"
            formProps={{
              method: "Delete",
              programDay,
              exercises: allExercises,
            }}
          />
        </div>
      </section>
    </main>
  );
}
