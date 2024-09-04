import { auth } from "~/server/auth";
import { SessionProvider } from "next-auth/react";
import { getMyProgram } from "~/server/queries/workouts";
import { SetProgram } from "~/stores/ProgramStore";
import { redirect } from "next/navigation";

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

  return (
    <>
      <SetProgram program={program} />
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
