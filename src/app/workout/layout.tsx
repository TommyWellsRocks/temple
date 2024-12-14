import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getExercisesForUser } from "~/server/db/queries/workout/exercises";
import {
  getMyPrograms,
  // getWorkoutRedirect,
} from "~/server/db/queries/workout/program";

import { SetExercises } from "~/hooks/workout/useExercises";
import { SetPrograms } from "~/hooks/workout/useProgram/actions/programs";
import { SetUser } from "~/hooks/common/useUser";

export default async function WorkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id)
    return redirect(`/signin?return=${encodeURIComponent("/workout")}`);
  const userId = session.user.id;
  const workoutPrograms = await getMyPrograms(userId);
  const { value: exercises, err: exercisesError } =
    await getExercisesForUser(userId);
  if (exercisesError) return;

  // const workoutRedirect = await getWorkoutRedirect(userId);
  // if (workoutRedirect) return redirect(workoutRedirect);

  return (
    <>
      <SetUser userId={userId} />
      <SetPrograms programs={workoutPrograms} />
      <SetExercises exercises={exercises} />
      {children}
    </>
  );
}
