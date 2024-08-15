import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getMyWeekAnalytics, getMyProgramDay } from "~/server/queries/workouts";
import { Navigation } from "~/components/ui/Navigation";
import { LineChart } from "~/components/ui/Linechart";
import { TargetMuscles } from "~/components/workout/ExerciseList/TargetMuscles";
import { CheckList } from "~/components/workout/ExerciseList/Exercises";

// * DAY OVERVIEW PAGE

export const dynamic = "force-dynamic"

export default async function DayOverview(context: any | unknown) {
  const session = await auth();
  const { programId, dayId } = context.params as {
    programId: string;
    dayId: string;
  };
  if (!session?.user?.id)
    return redirect(
      `/signin?return=${encodeURIComponent(`/workout/${programId}/${dayId}`)}`,
    );

  const programDay = await getMyProgramDay(
    session.user.id,
    Number(programId),
    Number(dayId),
  );
  if (!programDay) return redirect("/workout");

  // LineChart
  const [lastWeek, thisWeek] = await getMyWeekAnalytics(session.user.id);

  const muscleURLs = programDay.dayExercises.map((ex) =>
    ex.info.musclesImage ? ex.info.musclesImage : "",
  );

  return (
    <>
      <Navigation
        backURL={`/workout/${programId}`}
        heading={`${programDay.name} Overview`}
      />

      <LineChart
        measureOf="Volume"
        xLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        prevLabel={"Last Weeks's Volume"}
        previousData={lastWeek}
        currentLabel="This Week's Volume"
        currentData={thisWeek!}
      />

      <TargetMuscles muscleURLs={muscleURLs} />

      <CheckList
        userId={session.user.id}
        programId={Number(programId)}
        dayId={Number(dayId)}
        programDay={programDay}
      />
    </>
  );
}
