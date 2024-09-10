import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getExercises } from "~/server/queries/exercises";
import { getMyPrograms, getWorkoutRedirect } from "~/server/queries/workouts";

import { SessionProvider } from "next-auth/react";
import { UserIdProvider } from "~/hooks/useUserId";
import { MyProgramsProvider } from "~/hooks/workout/useMyPrograms";
import { MyExercisesProvider } from "~/hooks/workout/useExercises";

export default async function WorkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/workout");
  const userId = session.user.id;
  const exercises = await getExercises(userId);

  const workoutPrograms = await getMyPrograms(userId);

  // const workoutRedirect = await getWorkoutRedirect(userId);
  // if (workoutRedirect) return redirect(workoutRedirect);

  return (
    <SessionProvider session={session}>
      <UserIdProvider userId={userId}>
        <MyProgramsProvider workoutPrograms={workoutPrograms}>
          <MyExercisesProvider exercises={exercises}>
            {children}
          </MyExercisesProvider>
        </MyProgramsProvider>
      </UserIdProvider>
    </SessionProvider>
  );
}
