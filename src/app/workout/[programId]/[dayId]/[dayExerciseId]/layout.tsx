import { SetExerciseHistory } from "~/hooks/workout/useExerciseHistory";
import { SetExercise } from "~/hooks/workout/useProgram/actions/exercise";

import {
  getExerciseHistory,
  getExerciseIdFromDay,
} from "~/server/db/queries/workout/dayExercises";

export default async function ExerciseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { dayId: string; dayExerciseId: string };
}) {
  const dayExercise = await getExerciseIdFromDay(Number(params.dayExerciseId));
  if (!dayExercise) return;

  const exerciseHistory = await getExerciseHistory(
    dayExercise.userId,
    dayExercise.exerciseId,
    Number(params.dayExerciseId),
  );
  return (
    <>
      <SetExercise dayExerciseId={Number(params.dayExerciseId)} />
      <SetExerciseHistory exerciseHistory={exerciseHistory} />
      {children}
    </>
  );
}
