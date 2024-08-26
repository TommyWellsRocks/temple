import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getWorkoutRedirect } from "~/server/queries/workouts";
import { Navigation } from "~/components/ui/Navigation";
import { ProgramsList } from "~/components/workout/ProgramList/ProgramsList";
import { ProgramsHeader } from "~/components/workout/ProgramList/ProgramsHeader";

// * PROGRAMS PAGE

export const dynamic = "force-dynamic";

export default async function Programs() {
  const session = await auth();
  if (!session?.user?.id)
    return redirect(`/signin?return=${encodeURIComponent("/workout")}`);

  const workoutRedirect = await getWorkoutRedirect(session.user.id);
  if (workoutRedirect) return redirect(workoutRedirect);

  return (
    <>
      <Navigation backURL="/" heading="Temple" />

      <ProgramsHeader userId={session.user.id} />

      <ProgramsList userId={session.user.id} />
    </>
  );
}
