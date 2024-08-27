import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { TargetMuscles } from "~/components/workout/Day/TargetMuscles";
import { Exercises } from "~/components/workout/Day/Exercises";
import { useProgram } from "~/context/useProgram";
import { ActionButtons } from "~/components/workout/Day/ActionButtons";
import { NavHeader } from "~/components/workout/Exercise/NavHeader";

// * DAY OVERVIEW PAGE

export const dynamic = "force-dynamic";

export default async function DayOverview(context: any | unknown) {
  const session = await auth();
  const { programId, dayId } = context.params as {
    programId: string;
    dayId: string;
  };
  if (!session?.user?.id)
    return redirect(
      `/signin?return=${encodeURIComponent(`/workout/${programId}/${dayId}`)}`,
    );

  const program = await useProgram(session.user.id, Number(programId));
  const programDay = program?.programDays.find(
    (day) => day.id === Number(dayId),
  );
  if (!programDay) return redirect("/workout");

  return (
    <>
      <NavHeader programDay={programDay} />

      <TargetMuscles programDay={programDay} />

      <Exercises programDay={programDay} />

      <ActionButtons programDay={programDay} />
    </>
  );
}
