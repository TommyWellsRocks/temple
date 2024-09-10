import { auth } from "~/server/auth";
import { getMyProgram } from "~/server/queries/workouts";
import { SetProgram } from "~/hooks/workout/useProgram";
import { redirect } from "next/navigation";

export default async function ProgramLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { programId: string };
  }) {
  const session = await auth()
  const program = await getMyProgram(session!.user!.id!, Number(params.programId));
  if (!program) return redirect("/workout");

  return (
    <>
      <SetProgram program={program} />
      {children}
    </>
  );
}
