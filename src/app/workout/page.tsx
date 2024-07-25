import Image from "next/image";
import Link from "next/link";
import playButtonURL from "/public/content/images/workout/action-play.svg";
import trophyButtonURL from "/public/content/images/workout/action-trophy.svg";
import futureButtonURL from "/public/content/images/workout/action-future.svg";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getMyWorkoutPrograms } from "~/server/queries/workouts";
import { Navigation } from "~/components/workout/Navigation";
import { OverlayButton } from "~/components/workout/OverlayButton";
import { PopoverButton } from "~/components/workout/PopoverButton";
// import { LineChart } from "~/components/workout/Linechart";

const PROGRAM_DAYS_MAX_LENGTH = 7;
const PROGRAM_NAME_MAX_LENGTH = 12;

export default async function MyPrograms() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const workoutPrograms = await getMyWorkoutPrograms(session.user.id);
  const today = new Date();

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <Navigation backURL="/workout" heading="Workout Programs" />

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        {/* <LineChart
          page="Individual"
        /> */}
      </section>

      <section className="flex items-center justify-between">
        <h1>My Workout Programs:</h1>
        <OverlayButton
          title="Create Workout Program"
          description="Build and plan your new workout program. Click create when you're done."
          formType="Program"
          formProps={{ userId: session.user.id }}
        />
      </section>

      <section>
        {!workoutPrograms.length ? (
          <div>No workout programs to show 😫</div>
        ) : (
          <div className="flex flex-col gap-5">
            {workoutPrograms.map((program) => {
              const startDate = new Date(program.startDate);
              const endDate = new Date(program.endDate);
              const isActiveProgram = startDate <= today && endDate >= today;
              const isFutureProgram = !isActiveProgram && startDate > today;
              const excessProgramDays =
                program.programDays.length > PROGRAM_DAYS_MAX_LENGTH;

              return (
                <div className="relative flex">
                  <div className="absolute left-2.5 top-2 flex gap-1.5 px-1.5 align-middle">
                    {program.name.slice(0, PROGRAM_NAME_MAX_LENGTH)}
                    <PopoverButton
                      title="Edit Workout Program"
                      description="Remember to click edit when your done."
                      formType="Program"
                      formProps={{
                        programInfo: program,
                      }}
                    />
                  </div>
                  <Link
                    href={`/workout/${program.id}`}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-2 ${isActiveProgram ? "bg-undoneDark" : "bg-doneDark"}`}
                  >
                    <div className="mt-8 flex flex-col gap-2">
                      <div className="ml-4 flex flex-col text-base">
                        {excessProgramDays
                          ? program.programDays
                              .map((day) => <div>&bull; {day.name}</div>)
                              .slice(0, PROGRAM_DAYS_MAX_LENGTH)
                          : program.programDays.map((day) => (
                              <div>&bull; {day.name}</div>
                            ))}
                        {excessProgramDays ? "..." : null}
                      </div>
                    </div>
                    <Image
                      className="rounded-full border border-primary"
                      src={
                        isActiveProgram
                          ? playButtonURL
                          : isFutureProgram
                            ? futureButtonURL
                            : trophyButtonURL
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
