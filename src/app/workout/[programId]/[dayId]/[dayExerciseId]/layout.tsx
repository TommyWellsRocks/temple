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
  params: { programId: string; dayId: string; dayExerciseId: string };
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
      <SetExercise
        programId={Number(params.programId)}
        dayId={Number(params.dayId)}
        dayExerciseId={Number(params.dayExerciseId)}
      />
      <SetExerciseHistory exerciseHistory={exerciseHistory} />
      {children}
    </>
  );
}
