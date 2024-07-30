import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getMyYearDaysActiveAnalytics } from "~/server/queries/workouts";
import { Navigation } from "~/components/workout/Navigation";
import { LineChart } from "~/components/workout/Linechart";
import { ProgramsList } from "~/components/workout/pages/Programs/ProgramsList";
import { OverlayButton } from "~/components/workout/OverlayButton";

// * PROGRAMS PAGE

export default async function Programs() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  // LineChart
  const [lastYear, thisYear] = await getMyYearDaysActiveAnalytics(
    session.user.id,
  );

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <nav>
        <Navigation backURL="/workout" heading="Workout Programs" />
      </nav>

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        <LineChart
          title="Year Analytics"
          measureOf="Active-Days"
          xLabels={Array.from({ length: 12 }, (_, i) =>
            new Date(0, i).toLocaleString("en", { month: "short" }),
          )}
          prevLabel="Last Year"
          previousData={lastYear as number[]}
          currentLabel="This Year"
          currentData={thisYear as number[]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex justify-end">
          <OverlayButton
            title="Create Workout Program"
            description="Build and plan out your program. Click create when you're done."
            formType="Program"
            formProps={{ userId: session.user.id }}
          />
        </div>

        <div>
          <ProgramsList userId={session.user.id} />
        </div>
      </section>
    </main>
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