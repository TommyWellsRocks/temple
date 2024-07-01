import { Exercise, SessionExercise, WorkoutSession } from "~/server/types";
export function getBetweenDays() {
  const today = new Date();
  const currentDay = today.getDay();
  const currentDate = today.getDate();

  const lastStart = new Date(today);
  lastStart.setDate(currentDate - currentDay - 6);
  const lastEnd = new Date(today);
  lastEnd.setDate(currentDate - currentDay - 1);

  const thisStart = new Date(today);
  thisStart.setDate(currentDate - currentDay);
  const thisEnd = new Date(today);
  thisEnd.setDate(currentDate - currentDay + 6);

  return [lastStart, lastEnd, thisStart, thisEnd];
}

function getDayOfWeek(timestamp: Date) {
  const date = new Date(timestamp);
  return date.getDay();
}

export function weekVolume(week: WorkoutSession[]) {
  const weekVolume = [0, 0, 0, 0, 0, 0, 0];
  week.forEach((session) => {
    const sessionVolume = session.workoutItems
      .map((exercise) => {
        return exercise.reps.reduce(
          (exerciseVolume, repCount, setIndex) =>
            exerciseVolume + repCount * (exercise.weight[setIndex] || 1),
          0,
        );
      })
      .reduce((total, num) => total + num, 0);

    const dayOfWeek = getDayOfWeek(session.createdAt);
    weekVolume[dayOfWeek]! += sessionVolume;
  });
  return weekVolume;
}

// export function calculateSessionVolume(sessionExercises: SessionExercise[]) {
//   return sessionExercises.reduce((exercise) => {}),
// }
// repCount * (exercise.weight[index] || 1);