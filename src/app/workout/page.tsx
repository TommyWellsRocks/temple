import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import {
  getMyYearDaysActiveAnalytics,
  getWorkoutRedirect,
} from "~/server/queries/workouts";
import { Navigation } from "~/components/ui/Navigation";
import { LineChart } from "~/components/ui/Linechart";
import { ProgramsList } from "~/components/workout/ProgramList/ProgramsList";
import { AddButtonOverlay } from "~/components/workout/AddButtonOverlay";
import { ProgramForm } from "~/components/workout/ProgramList/ProgramForm";

// * PROGRAMS PAGE

export const dynamic = "force-dynamic"

export default async function Programs() {
  const session = await auth();
  if (!session?.user?.id)
    return redirect(`/signin?return=${encodeURIComponent("/workout")}`);

  const workoutRedirect = await getWorkoutRedirect(session.user.id);
  if (workoutRedirect) return redirect(workoutRedirect);

  // LineChart
  const [lastYear, thisYear] = await getMyYearDaysActiveAnalytics(
    session.user.id,
  );

  return (
    <>
      <Navigation backURL="/" heading="Workout Programs" />

      <LineChart
        measureOf="Active-Days"
        xLabels={Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString("en", { month: "short" }),
        )}
        prevLabel="Last Year"
        previousData={lastYear}
        currentLabel="This Year"
        currentData={thisYear!}
      />

      <section className="flex justify-end">
        <AddButtonOverlay
          title="Create Workout Program"
          description="Build and plan out your program. Click create when you're done."
          formComponent={<ProgramForm userId={session.user.id} />}
        />
      </section>

      <ProgramsList userId={session.user.id} />
    </>
  );
}
