import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Navigation } from "~/components/ui/Navigation";
import { LineChart } from "~/components/ui/Linechart";
import { calculateProgramVolumeAnalytics } from "~/server/queries/utils/workoutVolume";
import { DayList } from "~/components/workout/DayList/DayList";
import { useProgram } from "~/context/useProgram";

// * DAYS PAGE

export const dynamic = "force-dynamic";

export default async function Days(context: any | unknown) {
  const session = await auth();
  const { programId } = context.params as { programId: string };
  if (!session?.user?.id)
    return redirect(
      `/signin?return=${encodeURIComponent(`/workout/${programId}`)}`,
    );

  const program = await useProgram(session.user.id, Number(programId))
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
        currentData={currentProgramVolume}
      />

      <DayList
        userId={session.user.id}
        programId={Number(programId)}
        program={program}
      />
    </>
  );
}
