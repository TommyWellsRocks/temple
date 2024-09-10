import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getWorkoutRedirect } from "~/server/queries/workouts";
import { Navigation } from "~/components/ui/Navigation";
import { ProgramsList } from "./_components/ProgramsList";
import { HeaderSection } from "./_components/HeaderSection";

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

      <HeaderSection userId={session.user.id} />

      <ProgramsList userId={session.user.id} />
    </>
  );
}
