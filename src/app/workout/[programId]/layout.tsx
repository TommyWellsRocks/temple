import { auth } from "~/server/auth";
import { SessionProvider } from "next-auth/react";
import { getMyProgram } from "~/server/queries/workouts";
import { getExercises } from "~/server/queries/exercises";
import { SetProgram } from "~/hooks/workout/useProgram";
import { redirect } from "next/navigation";
import { MyExercisesProvider } from "~/hooks/workout/useExercises";

export default async function ProgramLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { programId: string };
}) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/workout");

  const program = await getMyProgram(session.user.id, Number(params.programId));
  if (!program) return redirect("/workout");
  const exercises = await getExercises(session.user.id);

  return (
    <>
      <SetProgram program={program} />
      <SessionProvider session={session}>
        <MyExercisesProvider exercises={exercises}>
          {children}
        </MyExercisesProvider>
      </SessionProvider>
    </>
  );
}
