import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getMyProgram } from "~/server/queries/workouts";
import { Navigation } from "~/components/workout/Navigation";
import { LineChart } from "~/components/workout/Linechart";
import { calculateProgramVolumeAnalytics } from "~/server/queries/utils/workoutVolume";
import { DayList } from "~/components/workout/pages/ProgramDays/DayList";

// * DAYS PAGE

export default async function Days(context: any | unknown) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const { programId } = context.params as { programId: string };
  const program = await getMyProgram(session.user.id, Number(programId));
  if (!program) return <main>No program to show</main>;

  // LineChart
  const currentProgramVolume = calculateProgramVolumeAnalytics(program);

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <nav>
        <Navigation backURL="/workout" heading={`${program.name} Days`} />
      </nav>

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        <LineChart
          title="Program Analytics"
          measureOf="Volume"
          xLabels={currentProgramVolume.map((_, index) => `Week ${index + 1}`)}
          currentLabel="Your Volume"
          currentData={currentProgramVolume as number[]}
        />
      </section>

      <section>
        <DayList
          userId={session.user.id}
          programId={Number(programId)}
          program={program}
        />
      </section>
    </main>
  );
}
