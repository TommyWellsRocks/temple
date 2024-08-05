import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getMyWeekAnalytics, getMyProgramDay } from "~/server/queries/workouts";
import { Navigation } from "~/components/ui/Navigation";
import { LineChart } from "~/components/ui/Linechart";
import { TodaysMuscles } from "~/components/workout/ExerciseList/TodaysMuscles";
import { CheckList } from "~/components/workout/ExerciseList/CheckList";

// * DAY OVERVIEW PAGE

export default async function DayOverview(context: any | unknown) {
  const session = await auth();
  const { programId, dayId } = context.params as {
    programId: string;
    dayId: string;
  };
  if (!session || !session.user || !session.user.id)
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
  const [lastWeek, thisWeek] = await getMyWeekAnalytics(session.user.id!);

  const muscleURLs = programDay.dayExercises.map((ex) =>
    ex.info.targetMuscleImages && ex.info.targetMuscleImages[0]
      ? ex.info.targetMuscleImages[0]
      : "",
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
        previousData={lastWeek!}
        currentLabel="This Week's Volume"
        currentData={thisWeek!}
      />

      <TodaysMuscles muscleURLs={muscleURLs} />

      <CheckList
        programId={Number(programId)}
        dayId={Number(dayId)}
        programDay={programDay}
      />
    </>
  );
}
