import { ExHistoryProvider } from "~/hooks/workout/useExerciseHistory";
import {
  getExerciseHistory,
  getExerciseIdFromDay,
} from "~/server/queries/workouts";

export default async function ExerciseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { dayId: string, dayExerciseId: string };
}) {
  const dayExercise = await getExerciseIdFromDay(Number(params.dayExerciseId));
  if (!dayExercise) return;

  const exerciseHistory = await getExerciseHistory(
    dayExercise.userId,
    dayExercise.exerciseId,
    Number(params.dayId),
  );
  return (
    <ExHistoryProvider exHistory={exerciseHistory}>
      {children}
    </ExHistoryProvider>
  );
}
