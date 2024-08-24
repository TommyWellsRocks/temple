import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { TargetMuscles } from "~/components/workout/ExerciseList/TargetMuscles";
import { CheckList } from "~/components/workout/ExerciseList/Exercises";
import { useProgram } from "~/context/useProgram";
import { ActionButtons } from "~/components/workout/ExerciseList/ActionButtons";
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

  const muscleURLs = programDay.dayExercises.map((ex) =>
    ex.info.musclesImage ? ex.info.musclesImage : "",
  );

  return (
    <>
      <NavHeader day={programDay} />

      <TargetMuscles muscleURLs={muscleURLs} />

      <CheckList
        userId={session.user.id}
        programId={Number(programId)}
        dayId={Number(dayId)}
        programDay={programDay}
      />

      <ActionButtons programDay={programDay} />
    </>
  );
}
