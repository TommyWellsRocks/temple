import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getMyYearDaysActiveAnalytics } from "~/server/queries/workouts";
import { Navigation } from "~/app/components/ui/Navigation";
import { LineChart } from "~/app/components/ui/Linechart";
import { ProgramsList } from "~/app/components/workout/ProgramList/ProgramsList";
import { AddButtonOverlay } from "~/app/components/workout/AddButtonOverlay";
import { ProgramForm } from "../components/workout/ProgramList/ProgramForm";

// * PROGRAMS PAGE

export default async function Programs() {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    return redirect(`/signin?return=${encodeURIComponent("/workout")}`);

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
        previousData={lastYear as number[]}
        currentLabel="This Year"
        currentData={thisYear as number[]}
      />

      <section className="flex justify-end">
        <AddButtonOverlay
          title="Create Workout Program"
          description="Build and plan out your program. Click create when you're done."
          formComponent={<ProgramForm userId={session.user.id} />}
        />
      </section>

      <section>
        <ProgramsList userId={session.user.id} />
      </section>
    </>
  );
}

// Redirects
// const AUTO_OPEN_PROGRAM = true;
// if (
//   AUTO_OPEN_PROGRAM &&
//   workoutPrograms &&
//   programLoaded !== today.toDateString()
// ) {
//   // Open Scheduled Plan
//   const todayProgram = workoutPrograms.find(
//     (program) =>
//       new Date(program.startDate) <= today &&
//       new Date(program.endDate) >= today,
//   );
//   if (todayProgram) {
//     programLoaded = today.toDateString();
//     return redirect(`/workout/${todayProgram.id}`);
//   }

//   // Open Last Used Plan
//   const lastUsedProgram = workoutPrograms.find(
//     (program) =>
//       program.programDays.length !== 0 &&
//       program.programDays.filter((day) =>
//         day.dayExercises.filter((ex) => !ex.reps.includes(0)),
//       ),
//   );
//   if (lastUsedProgram) {
//     programLoaded = today.toDateString();
//     return redirect(`/workout/${lastUsedProgram.id}`);
//   }
// }
