import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { workoutDayExercises } from "~/server/db/schema";

export async function getExerciseIdFromDay(dayExerciseId: number) {
  return await db.query.workoutDayExercises.findFirst({
    where: (model, { eq }) => eq(model.id, dayExerciseId),
    columns: { userId: true, exerciseId: true },
  });
}

export async function getExerciseHistory(
  userId: string,
  exerciseId: number,
  dayExId: number,
) {
  return await db.query.workoutDayExercises.findMany({
    columns: { reps: true, weight: true, id: true, updatedAt: true },
    where: (model, { and, eq, ne, sql }) =>
      and(
        eq(model.userId, userId),
        eq(model.exerciseId, exerciseId),
        ne(model.id, dayExId),
        eq(model.loggedSetsCount, sql`CARDINALITY(${model.reps})`),
      ),
    orderBy: (model, { desc }) => desc(model.updatedAt),
  });
}

export async function getDayExercise(userId: string, dayExerciseId: number) {
  return await db.query.workoutDayExercises.findFirst({
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.id, dayExerciseId)),
    columns: {
      id: true,
      userId: true,
      programId: true,
      dayId: true,
      reps: true,
      weight: true,
      updatedAt: true,
      exerciseId: true,
      loggedSetsCount: true,
    },
    with: {
      info: {
        columns: {
          id: true,
          name: true,
          video: true,
          equipment: true,
          primaryMuscle: true,
          secondaryMuscles: true,
        },
      },
      notes: { columns: { id: true, name: true, notes: true } },
    },
  });
}

export async function addDayExercise(
  userId: string,
  programId: number,
  groupId: number,
  dayId: number,
  exerciseId: number,
) {
  const last = await db.query.workoutDayExercises.findFirst({
    columns: { reps: true, weight: true },
    where: (model, { and, eq, sql }) =>
      and(
        eq(model.userId, userId),
        eq(model.exerciseId, exerciseId),
        eq(model.loggedSetsCount, sql`CARDINALITY(${model.reps})`),
      ),
    orderBy: (model, { desc }) => desc(model.updatedAt),
  });

  const newEx = await db
    .insert(workoutDayExercises)
    .values({
      userId,
      programId,
      groupId,
      dayId,
      exerciseId,
      reps: last?.reps || [0, 0, 0, 0],
      weight: last?.weight || [0, 0, 0, 0],
    })
    .returning({ id: workoutDayExercises.id });
  return newEx[0]!;
}

export async function deleteDayExercise(userId: string, dayExerciseId: number) {
  await db
    .delete(workoutDayExercises)
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

export async function updateDayExerciseInput(
  dayExerciseId: number,
  userId: string,
  reps: number[],
  weight: number[],
) {
  await db
    .update(workoutDayExercises)
    .set({
      reps,
      weight,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

export async function updateDayExerciseSets(
  dayExerciseId: number,
  userId: string,
  reps: number[],
  weight: number[],
  loggedSetsCount: number,
) {
  await db
    .update(workoutDayExercises)
    .set({
      reps,
      weight,
      updatedAt: new Date(),
      loggedSetsCount,
    })
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

export async function updateLoggedSets(
  dayExerciseId: number,
  userId: string,
  loggedSetsCount: number,
) {
  await db
    .update(workoutDayExercises)
    .set({ loggedSetsCount: loggedSetsCount, updatedAt: new Date() })
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}
