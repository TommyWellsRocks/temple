import { Program, SessionExercise } from "~/server/types";

export function getYearsEndDates() {
  const today = new Date();
  const lastYear = today.getFullYear() - 1;
  const thisYear = today.getFullYear();

  const lastYearStart = new Date(lastYear, 0, 1);
  const lastYearEnd = new Date(lastYear, 11, 31);
  const thisYearStart = new Date(thisYear, 0, 1);
  const thisYearEnd = new Date(thisYear, 11, 31);

  return [lastYearStart, lastYearEnd, thisYearStart, thisYearEnd];
}

export function getWeeksEndDates() {
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

function getWeekNumber(date: Date): number {
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstJan.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstJan.getDay() + 1) / 7);
}

export function getDayOfWeek(timestamp: Date) {
  const date = new Date(timestamp);
  return date.getDay();
}

export function calculateMonthActiveDays(sessionExercises: SessionExercise[]) {
  const year: number[] = Array(12).fill(0);
  const dayIds = new Set<number>();
  sessionExercises.forEach((session) => {
    if (!dayIds.has(session.dayId)) {
      dayIds.add(session.dayId);
      year[session.updatedAt.getMonth()]!++;
    }
  });
  return year;
}

export function calculateProgramVolumeAnalytics(program: Program) {
  const weekVolumes: { [weekNumber: number]: number } = {};
  let minWeekNumber = Infinity;
  let maxWeekNumber = -Infinity;

  program!.programDays.forEach((day) => {
    const sessionVolume = calculateSessionVolume(day.dayExercises);
    const weekNumber = getWeekNumber(day.updatedAt);
    weekVolumes[weekNumber] = (weekVolumes[weekNumber] || 0) + sessionVolume;
    minWeekNumber = Math.min(minWeekNumber, weekNumber);
    maxWeekNumber = Math.max(maxWeekNumber, weekNumber);
  });

  // Fill missing weeks with zero
  for (let i = minWeekNumber; i <= maxWeekNumber; i++) {
    if (!(i in weekVolumes)) {
      weekVolumes[i] = 0;
    }
  }
  const programVolume = [];
  for (let i = minWeekNumber; i <= maxWeekNumber; i++) {
    programVolume.push(weekVolumes[i]);
  }

  return programVolume;
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
