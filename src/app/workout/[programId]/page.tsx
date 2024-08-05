import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getMyProgram } from "~/server/queries/workouts";
import { Navigation } from "~/app/components/ui/Navigation";
import { LineChart } from "~/app/components/ui/Linechart";
import { calculateProgramVolumeAnalytics } from "~/server/queries/utils/workoutVolume";
import { DayList } from "~/app/components/workout/DayList/DayList";

// * DAYS PAGE

export default async function Days(context: any | unknown) {
  const session = await auth();
  const { programId } = context.params as { programId: string };
  if (!session || !session.user || !session.user.id)
    return redirect(
      `/signin?return=${encodeURIComponent(`/workout/${programId}`)}`,
    );

  const program = await getMyProgram(session.user.id, Number(programId));
  if (!program) return redirect("/workout");

  // LineChart
  const currentProgramVolume = calculateProgramVolumeAnalytics(program);

  return (
    <>
      <Navigation backURL="/workout" heading={`${program.name} Days`} />

      <LineChart
        measureOf="Volume"
        xLabels={currentProgramVolume.map((_, index) => `Group ${index + 1}`)}
        currentLabel="Your Volume"
        currentData={currentProgramVolume as number[]}
      />

      <DayList
        userId={session.user.id}
        programId={Number(programId)}
        program={program}
      />
    </>
  );
}
