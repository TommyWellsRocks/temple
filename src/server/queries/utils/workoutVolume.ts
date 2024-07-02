import { SessionExercise } from "~/server/types";

export function getBetweenDays() {
  const today = new Date();
  const currentDay = today.getDay();
  const currentDate = today.getDate();

  const lastSun = new Date(today);
  lastSun.setDate(currentDate - currentDay - 6);
  const lastSat = new Date(today);
  lastSat.setDate(currentDate - currentDay - 1);

  const thisSun = new Date(today);
  thisSun.setDate(currentDate - currentDay);
  const thisSat = new Date(today);
  thisSat.setDate(currentDate - currentDay + 6);

  return [lastSun, lastSat, thisSun, thisSat];
}

export function getDayOfWeek(timestamp: Date) {
  const date = new Date(timestamp);
  return date.getDay();
}

export function calculateSessionVolume(sessionExercises: SessionExercise[]) {
  return sessionExercises.reduce((totalVolume, exercise) => {
    const exerciseVolume = exercise.reps.reduce(
      (total, repCount, index) =>
        total + repCount * (exercise.weight[index] || 1),
      0,
    );
    return totalVolume + exerciseVolume;
  }, 0);
}

export function calculateExerciseVolume(sessionExercise: SessionExercise) {
  const volume = sessionExercise.reps.map(
    (repCount, index) => repCount * (sessionExercise.weight[index] || 1),
  );
  if (!volume) return [0];
  return volume;
}
