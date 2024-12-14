import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { workoutDayExercises } from "~/server/db/schema";
import { auth } from "~/server/auth";

export async function getExerciseIdFromDay(dayExerciseId: number) {
  try {
    return {
      value: await db.query.workoutDayExercises.findFirst({
        where: (model, { eq }) => eq(model.id, dayExerciseId),
        columns: { userId: true, exerciseId: true },
      }),
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting exerciseId from DB." };
  }
}

export async function getExerciseHistory(exerciseId: number, dayExId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  try {
    return {
      value: await db.query.workoutDayExercises.findMany({
        columns: { reps: true, weight: true, id: true, updatedAt: true },
        where: (model, { and, eq, ne, sql }) =>
          and(
            eq(model.userId, userId),
            eq(model.exerciseId, exerciseId),
            ne(model.id, dayExId),
            eq(model.loggedSetsCount, sql`CARDINALITY(${model.reps})`),
          ),
        orderBy: (model, { desc }) => desc(model.updatedAt),
      }),
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting exercise history from DB." };
  }
}

export async function getDayExercise(dayExerciseId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  try {
    return {
      value: await db.query.workoutDayExercises.findFirst({
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
      }),
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return {
      value: null,
      err: "Error getting exercise from DB.",
    };
  }
}

export async function addDayExercise(
  programId: number,
  groupId: number,
  dayId: number,
  exerciseId: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  let last:
    | {
        reps: number[];
        weight: number[];
      }
    | undefined = undefined;
  try {
    last = await db.query.workoutDayExercises.findFirst({
      columns: { reps: true, weight: true },
      where: (model, { and, eq, sql }) =>
        and(
          eq(model.userId, userId),
          eq(model.exerciseId, exerciseId),
          eq(model.loggedSetsCount, sql`CARDINALITY(${model.reps})`),
        ),
      orderBy: (model, { desc }) => desc(model.updatedAt),
    });
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting last exercise from DB." };
  }

  let newEx: {
    id: number;
  }[];
  try {
    newEx = await db
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
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error adding day exercise to DB." };
  }
  return { value: newEx[0]!.id, err: null };
}

export async function deleteDayExercise(dayExerciseId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

  try {
    await db
      .delete(workoutDayExercises)
      .where(
        and(
          eq(workoutDayExercises.userId, userId),
          eq(workoutDayExercises.id, dayExerciseId),
        ),
      );
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error deleting day exercise in DB." };
  }
  return { err: null };
}

export async function updateDayExerciseInput(
  dayExerciseId: number,
  reps: number[],
  weight: number[],
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

  try {
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
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error updating exercise input in DB." };
  }
  return { err: null };
}

export async function updateDayExerciseSets(
  dayExerciseId: number,
  reps: number[],
  weight: number[],
  loggedSetsCount: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

  try {
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
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error updating exercise sets in DB." };
  }
  return { err: null };
}

export async function updateLoggedSets(
  dayExerciseId: number,
  loggedSetsCount: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

  try {
    await db
      .update(workoutDayExercises)
      .set({ loggedSetsCount: loggedSetsCount, updatedAt: new Date() })
      .where(
        and(
          eq(workoutDayExercises.userId, userId),
          eq(workoutDayExercises.id, dayExerciseId),
        ),
      );
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error updating logged sets in DB." };
  }
  return { err: null };
}
