import { Navigation } from "~/components/workout/Navigation";
import { LineChart } from "~/components/workout/Linechart";
import { getMyWeekAnalytics, getMyProgramDay } from "~/server/queries/workouts";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { TodaysMuscles } from "~/components/workout/pages/ProgramDay/TodaysMuscles";
import { CheckList } from "~/components/workout/pages/ProgramDay/CheckList";

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

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <nav>
        <Navigation
          backURL={`/workout/${programId}`}
          heading={`${programDay.name} Overview`}
        />
      </nav>

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        <LineChart
          title="Week Analytics"
          measureOf="Volume"
          xLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          prevLabel={"Last Weeks's Volume"}
          previousData={lastWeek!}
          currentLabel="This Week's Volume"
          currentData={thisWeek!}
        />
      </section>

      <section>
        <TodaysMuscles
          muscleURLS={programDay.dayExercises.map((ex) =>
            ex.info.targetMuscleImages
              ? ex.info.targetMuscleImages[0]
              : undefined,
          )}
        />
      </section>

      <section>
        <CheckList
          programId={Number(programId)}
          dayId={Number(dayId)}
          programDay={programDay}
        />
      </section>
    </main>
  );
}
