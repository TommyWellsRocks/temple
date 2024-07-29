import "server-only";
import { db } from "../db";
import {
  calculateExerciseVolume,
  calculateSessionVolume,
  getWeeksEndDates,
  getDayOfWeek,
  getYearsEndDates,
  calculateMonthActiveDays,
} from "./utils/workoutVolume";
import { DayExercise } from "../types";
import {
  workoutDayExercises,
  workoutProgramDays,
  workoutPrograms,
} from "../db/schema";
import { and, eq } from "drizzle-orm";

// * Program
export async function getMyPrograms(userId: string) {
  return await db.query.workoutPrograms.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
    columns: { createdAt: false, updatedAt: false },
    with: {
      programDays: {
        columns: { name: true },
        with: {
          dayExercises: { columns: { reps: true } },
        },
      },
    },
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
export async function getMyProgram(userId: string, programId: number) {
  return await db.query.workoutPrograms.findFirst({
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.id, programId)),
    with: {
      programDays: {
        columns: { createdAt: false },
        with: {
          dayExercises: {
            columns: { reps: true, weight: true },
            with: { info: { columns: { name: true } } },
          },
        },
      },
    },
    columns: { name: true },
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
export async function getMyProgramDay(
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
    columns: { createdAt: false, updatedAt: false },
    with: {
      dayExercises: {
        columns: { reps: true, id: true },
        with: {
          info: {
            columns: {
              targetMuscleImages: true,
              images: true,
              tips: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

// * Chart Information
export async function getMyYearDaysActiveAnalytics(userId: string) {
  const [lastYearStart, lastYearEnd, thisYearStart, thisYearEnd] =
    getYearsEndDates();
  const yearSessionItems = async (firstDay: Date, lastDay: Date) => {
    return await db.query.workoutDayExercises.findMany({
      where: (model, { and, eq, ne, between }) =>
        and(
          eq(model.userId, userId),
          ne(model.reps, [0, 0, 0, 0]),
          between(model.updatedAt, firstDay, lastDay),
        ),
      orderBy: (model, { asc }) => asc(model.updatedAt),
      columns: { dayId: true, updatedAt: true },
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

export async function getMyWeekAnalytics(userId: string) {
  // Go through all exercises between dates, and calculate the day's total session volume.
  const weekVolume = async (firstDay: Date, lastDay: Date) => {
    const weekExercises = await db.query.workoutDayExercises.findMany({
      where: (model, { and, eq, between }) =>
        and(
          eq(model.userId, userId),
          between(model.updatedAt, firstDay, lastDay),
        ),
      columns: { dayId: true, updatedAt: true },
      with: {
        day: {
          with: { dayExercises: { columns: { reps: true, weight: true } } },
        },
      },
    });

    const dayIds = new Set<number>();
    const weekVolume = [0, 0, 0, 0, 0, 0, 0];
    weekExercises.forEach((exercise) => {
      if (!dayIds.has(exercise.dayId)) {
        dayIds.add(exercise.dayId);
        const sessionVolume = calculateSessionVolume(exercise.day.dayExercises);
        const dayOfWeek = getDayOfWeek(exercise.updatedAt);
        weekVolume[dayOfWeek]! += sessionVolume;
      }
    });
    return weekVolume;
  };

  const [lastSun, lastSat, thisSun, thisSat] = getWeeksEndDates();
  const lastWeekVolume = await weekVolume(lastSun!, lastSat!);
  const thisWeekVolume = await weekVolume(thisSun!, thisSat!);

  return [lastWeekVolume, thisWeekVolume];
}

export async function getMyExerciseAnalytics(
  currentDayExercise: DayExercise,
  lastDayExercise: DayExercise,
) {
  const lastSession = lastDayExercise
    ? calculateExerciseVolume(lastDayExercise)
    : [0];
  const currentSession = calculateExerciseVolume(currentDayExercise);

  return [lastSession, currentSession];
}

// * Day Exercise
export async function getMyDayExercise(
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
    columns: {
      reps: true,
      dayId: true,
      id: true,
      weight: true,
      updatedAt: true,
      userId: true,
      exerciseId: true,
    },
    with: {
      info: {
        columns: {
          id: true,
          name: true,
          tips: true,
          instructions: true,
          targetMuscleImages: true,
        },
      },
      notes: { columns: { notes: true, id: true } },
    },
  });
}

export async function getLastSessionExercise(dayExercise: DayExercise) {
  return await db.query.workoutDayExercises.findFirst({
    where: (model, { and, eq, ne, lt }) =>
      and(
        eq(model.userId, dayExercise!.userId),
        eq(model.exerciseId, dayExercise!.exerciseId),
        ne(model.dayId, dayExercise!.dayId),
        lt(model.updatedAt, dayExercise!.updatedAt),
        ne(model.reps, [0, 0, 0, 0]), // Last Not-Default
        // not(sql`0 = ANY(${model.reps})`), // Last Fully completed
      ),
    orderBy: (model, { desc }) => desc(model.updatedAt),
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
    .set(
      updateType === "Reps"
        ? { reps: newValues, updatedAt: new Date() }
        : { weight: newValues, updatedAt: new Date() },
    )
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
    .set({ reps: repValues, weight: weightValues, updatedAt: new Date() })
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
