import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Navigation } from "~/components/ui/Navigation";
import { DayList } from "~/components/workout/Program/DayList";
import { useProgram } from "~/context/useProgram";

// * DAYS PAGE

export const dynamic = "force-dynamic";

export default async function Days(context: any | unknown) {
  const session = await auth();
  const { programId } = context.params as { programId: string };
  if (!session?.user?.id)
    return redirect(
      `/signin?return=${encodeURIComponent(`/workout/${programId}`)}`,
    );

  const program = await useProgram(session.user.id, Number(programId));
  if (!program) return redirect("/workout");

  return (
    <>
      <Navigation backURL="/workout" heading={program.name} />

      <DayList
        userId={session.user.id}
        programId={Number(programId)}
        program={program}
      />
    </>
  );
}
