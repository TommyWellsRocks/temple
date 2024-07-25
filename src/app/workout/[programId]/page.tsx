import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getProgram } from "~/server/queries/workouts";
import Image from "next/image";
import Link from "next/link";
import playButtonURL from "/public/content/images/workout/action-play.svg";
import trophyButtonURL from "/public/content/images/workout/action-trophy.svg";
import futureButtonURL from "/public/content/images/workout/action-future.svg";
import { Navigation } from "~/components/workout/Navigation";
import { OverlayButton } from "~/components/workout/OverlayButton";
import { PopoverButton } from "~/components/workout/PopoverButton";
import { LineChart } from "~/components/workout/Linechart";

const DAY_NAME_MAX_LENGTH = 12;

export default async function MyProgramDays(context: any | unknown) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const { programId } = context.params as { programId: string };
  const program = await getProgram(session.user.id, Number(programId));
  const todaysDay = new Date().getDay();

  return !program ? (
    <main>No workout to show</main>
  ) : (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <Navigation
        backURL="/workout"
        heading={`${program.name} Days`}
        addButtonInfo={{
          title: "Create Day",
          description:
            "Build and plan your new workout program. Click create when you're done.",
          formType: "ProgramDays",
          formProps: {
            userId: session.user.id,
            programId: Number(programId),
          },
        }}
      />

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        <LineChart
          title="Program Analytics"
          measureOf="Volume"
          xLabels={["Week 1", "Week 2", "Week 3", "Week 4"]}
          prevLabel="Last Year"
          previousData={[0]}
          currentLabel="This Year"
          currentData={[0]}
        />
      </section>

      <section>
        {!program.programDays.length ? (
          <div>No program days to show 😫</div>
        ) : (
          <div className="flex flex-col gap-5">
            {program.programDays.map((day) => {
              // Has Exercises and none have undone reps
              const isDone =
                day.dayExercises.length >= 1 &&
                day.dayExercises.filter((ex) => ex.reps.includes(0)).length ===
                  0;
              // Not done and do date isn't today
              const isFutureDay =
                !isDone &&
                day.repeatOn !== null &&
                !day.repeatOn.filter((repeatDay) => repeatDay === todaysDay);

              return (
                <div className="relative flex">
                  <div className="absolute left-2.5 top-2 flex gap-1.5 px-1.5 align-middle">
                    {day.name.slice(0, DAY_NAME_MAX_LENGTH)}
                    <PopoverButton
                      title="Edit Workout Program"
                      description="Remember to click edit when your done."
                      formType="ProgramDays"
                      formProps={{ dayInfo: day }}
                    />
                  </div>
                  <Link
                    href={`/workout/${day.programId}/${day.id}`}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-2 ${isDone ? "bg-doneDark" : "bg-undoneDark"}`}
                  >
                    <div className="mt-8 flex flex-col gap-2">
                      <div className="ml-4 flex flex-col text-base">
                        {day.dayExercises.map((exercise) => (
                          <div>
                            {exercise.reps.length} x {exercise.info.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Image
                      className="rounded-full border border-primary"
                      src={
                        isDone
                          ? trophyButtonURL
                          : isFutureDay
                            ? futureButtonURL
                            : playButtonURL
                      }
                      alt="Action."
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
