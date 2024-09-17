import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getExercisesForUser } from "~/server/db/queries/workout/exercises";
import {
  getMyPrograms,
  // getWorkoutRedirect,
} from "~/server/db/queries/workout/program";

import { SessionProvider } from "next-auth/react";
import { MyProgramsProvider } from "~/hooks/workout/useMyPrograms";
import { MyExercisesProvider } from "~/hooks/workout/useExercises";

export default async function WorkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) return redirect(`/signin?return=${encodeURIComponent("/workout")}`);
  const userId = session.user.id;
  const exercises = await getExercisesForUser(userId);
  const workoutPrograms = await getMyPrograms(userId);

  // const workoutRedirect = await getWorkoutRedirect(userId);
  // if (workoutRedirect) return redirect(workoutRedirect);

  return (
    <SessionProvider session={session}>
      <MyProgramsProvider workoutPrograms={workoutPrograms}>
        <MyExercisesProvider exercises={exercises}>
          {children}
        </MyExercisesProvider>
      </MyProgramsProvider>
    </SessionProvider>
  );
}
