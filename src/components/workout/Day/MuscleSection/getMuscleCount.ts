import type { DayExercise } from "~/server/types";

export function getMuscleCount(dayExercises: DayExercise[]) {
  const muscleCount: { [muscle: string]: number } = {};
  dayExercises.forEach((ex) => {
    if (!ex) return;

    const primaryMuscle = ex.info.primaryMuscle;
    const secondaryMuscles = ex.info.secondaryMuscles;

    if (primaryMuscle) {
      muscleCount[primaryMuscle] = (muscleCount[primaryMuscle] || 0) + 1;
    }
    if (secondaryMuscles && secondaryMuscles.length >= 1) {
      secondaryMuscles.forEach((muscle) => {
        muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
      });
    }
  });
  return Object.entries(muscleCount).sort(
    ([_, countA], [__, countB]) => countB - countA,
  );
}
