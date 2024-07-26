import "server-only";
import { db } from "../db";
import {
  calculateExerciseVolume,
  calculateSessionVolume,
  getWeeksEndDates,
  getDayOfWeek,
  getYearsEndDates,
  calculateMonthActiveDays,
  calculateProgramVolumeAnalytics,
} from "./utils/workoutVolume";
import { Program, SessionExercise } from "../types";
import {
  workoutDayExercises,
  workoutProgramDays,
  workoutPrograms,
} from "../db/schema";
import { and, eq } from "drizzle-orm";

// * Program
export async function getMyWorkoutPrograms(userId: string) {
  return await db.query.workoutPrograms.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.updatedAt),
    with: { programDays: true },
  });
}

export async function createWorkoutProgram(
  userId: string,
  name: string,
  startDate: string,
  endDate: string,
) {
  await db.insert(workoutPrograms).values({
    userId,
    name,
    startDate,
    endDate,
  });
}

export async function editWorkoutProgram(
  userId: string,
  programId: number,
  name: string,
  startDate: string,
  endDate: string,
) {
  await db
    .update(workoutPrograms)
    .set({ name, startDate, endDate, updatedAt: new Date() })
    .where(
      and(
        eq(workoutPrograms.userId, userId),
        eq(workoutPrograms.id, programId),
      ),
    );
}

export async function deleteWorkoutProgram(userId: string, programId: number) {
  await db
    .delete(workoutPrograms)
    .where(
      and(
        eq(workoutPrograms.userId, userId),
        eq(workoutPrograms.id, programId),
      ),
    );
}

// * Program Days
export async function getProgram(userId: string, programId: number) {
  return await db.query.workoutPrograms.findFirst({
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.id, programId)),
    with: {
      programDays: {
        with: {
          dayExercises: { with: { info: true, notes: true } },
        },
      },
    },
  });
}

export async function getProgramDays(userId: string, programId: number) {
  return await db.query.workoutProgramDays.findMany({
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.programId, programId)),
    with: {
      dayExercises: { with: { info: true, notes: true } },
      program: true,
    },
  });
}

export async function createProgramDay(
  userId: string,
  programId: number,
  name: string,
  repeatOn: number[] | null,
) {
  await db
    .insert(workoutProgramDays)
    .values({ userId, programId, name, repeatOn });
}

export async function editProgramDay(
  userId: string,
  programId: number,
  dayId: number,
  name: string,
  repeatOn: number[] | null,
) {
  await db
    .update(workoutProgramDays)
    .set({ name, repeatOn, updatedAt: new Date() })
    .where(
      and(
        eq(workoutProgramDays.userId, userId),
        eq(workoutProgramDays.programId, programId),
        eq(workoutProgramDays.id, dayId),
      ),
    );
}

export async function deleteProgramDay(
  userId: string,
  programId: number,
  dayId: number,
) {
  await db
    .delete(workoutProgramDays)
    .where(
      and(
        eq(workoutProgramDays.userId, userId),
        eq(workoutProgramDays.programId, programId),
        eq(workoutProgramDays.id, dayId),
      ),
    );
}

// * Program Day
export async function getProgramDay(
  userId: string,
  programId: number,
  dayId: number,
) {
  return await db.query.workoutProgramDays.findFirst({
    where: (model, { and, eq }) =>
      and(
        eq(model.userId, userId),
        eq(model.programId, programId),
        eq(model.id, dayId),
      ),
    with: { dayExercises: { with: { info: true, notes: true } } },
  });
}

// * Chart Information
export async function getMyYearDaysActiveAnalytics(userId: string) {
  const [lastYearStart, lastYearEnd, thisYearStart, thisYearEnd] =
    getYearsEndDates();
  const yearSessionItems = async (firstDay: Date, lastDay: Date) => {
    return await db.query.workoutDayExercises.findMany({
      where: (model, { and, eq, lt, between }) =>
        and(
          eq(model.userId, userId),
          lt(model.createdAt, model.updatedAt),
          between(model.updatedAt, firstDay, lastDay),
        ),
      orderBy: (model, { asc }) => asc(model.updatedAt),
    });
  };

  const lastYearSessionItems = await yearSessionItems(
    lastYearStart!,
    lastYearEnd!,
  );
  const thisYearSessionItems = await yearSessionItems(
    thisYearStart!,
    thisYearEnd!,
  );
  const lastYearActivity = calculateMonthActiveDays(lastYearSessionItems);
  const thisYearActivity = calculateMonthActiveDays(thisYearSessionItems);

  return [lastYearActivity, thisYearActivity];
}

export async function getMyExerciseAnalytics(
  userId: string,
  exerciseId: number,
  currentSessionExercise: SessionExercise,
) {
  const lastSessionExercise = await db.query.workoutDayExercises.findFirst({
    where: (model, { and, eq, ne, lt }) =>
      and(
        eq(model.userId, userId),
        eq(model.exerciseId, exerciseId),
        ne(model.dayId, currentSessionExercise.dayId),
        lt(model.createdAt, currentSessionExercise.updatedAt),
      ),
    orderBy: (model, { desc }) => desc(model.updatedAt),
  });

  const lastSession = lastSessionExercise
    ? calculateExerciseVolume(lastSessionExercise)
    : [0];
  const currentSession = calculateExerciseVolume(currentSessionExercise);

  return [lastSession, currentSession];
}

export async function getMyWeekAnalytics(userId: string) {
  const [lastSun, lastSat, thisSun, thisSat] = getWeeksEndDates();
  const weekVolume = async (firstDay: Date, lastDay: Date) => {
    const weekSessions = await db.query.workoutProgramDays.findMany({
      where: (model, { and, eq, between }) =>
        and(
          eq(model.userId, userId),
          between(model.createdAt, firstDay, lastDay),
        ),
      with: {
        dayExercises: {
          where: (model, { ne }) => ne(model.reps, [0, 0, 0, 0]),
          with: { info: true, notes: true },
        },
      },
    });

    const weekVolume = [0, 0, 0, 0, 0, 0, 0];
    weekSessions.forEach((session) => {
      const sessionVolume = calculateSessionVolume(session.dayExercises);
      const dayOfWeek = getDayOfWeek(session.createdAt);
      weekVolume[dayOfWeek]! += sessionVolume;
    });
    return weekVolume;
  };
  const lastWeekVolume = weekVolume(lastSun!, lastSat!);
  const thisWeekVolume = weekVolume(thisSun!, thisSat!);

  return [lastWeekVolume, thisWeekVolume];
}

// * Day Exercise
export async function getDayExercise(
  userId: string,
  programId: number,
  dayId: number,
  dayExerciseId: number,
) {
  return await db.query.workoutDayExercises.findFirst({
    where: (model, { and, eq }) =>
      and(
        eq(model.userId, userId),
        eq(model.programId, programId),
        eq(model.dayId, dayId),
        eq(model.id, dayExerciseId),
      ),
    with: { info: true, notes: true },
  });
}

export async function addDayExercise(
  userId: string,
  programId: number,
  dayId: number,
  exerciseId: number,
) {
  await db
    .insert(workoutDayExercises)
    .values({ userId, programId, dayId, exerciseId });
}

export async function deleteDayExercise(
  userId: string,
  programId: number,
  dayId: number,
  dayExerciseId: number,
) {
  await db
    .delete(workoutDayExercises)
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.programId, programId),
        eq(workoutDayExercises.dayId, dayId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

export async function updateDayExerciseInput(
  userId: string,
  dayExerciseId: number,
  updateType: "Reps" | "Weight",
  newValues: number[],
) {
  await db
    .update(workoutDayExercises)
    .set(updateType === "Reps" ? { reps: newValues } : { weight: newValues })
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

export async function updateDayExerciseSets(
  userId: string,
  dayExerciseId: number,
  repValues: number[],
  weightValues: number[],
) {
  await db
    .update(workoutDayExercises)
    .set({ reps: repValues, weight: weightValues })
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

// export async function getTodaysWorkout(userId: string) {
//   const today = new Date();
//   const todayString = String(today);
//   return await db.query.workoutProgramDays.findFirst({
//     where: (model, { and, eq, gte, lte, sql }) =>
//       and(
//         eq(model.userId, userId),
//         lte(model.repeatStart, todayString),
//         gte(model.repeatEnd, todayString),
//         sql`${model.repeatOn} @> {${today.getDay()}}`,
//       ),
//     with: {
//       sessionExercises: {
//         with: {
//           info: true,
//           notes: true,
//         },
//       },
//     },
//   });
// }
