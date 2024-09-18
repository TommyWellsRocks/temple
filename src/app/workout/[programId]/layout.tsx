import { auth } from "~/server/auth";
import { getMyProgram } from "~/server/db/queries/workout/program";
import { SetProgram } from "~/hooks/workout/useProgram/programActions";
import { redirect } from "next/navigation";

export default async function ProgramLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { programId: string };
}) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signing");
  const program = await getMyProgram(session.user.id, Number(params.programId));
  if (!program) return redirect("/workout");

  return (
    <>
      <SetProgram program={program} />
      {children}
    </>
  );
}
