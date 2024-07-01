import "server-only";
import { db } from "../db";

export async function getMyWorkouts(userId: number) {
  return await db.query.workouts.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.updatedAt),
    with: {
      sessionExercises: {
        with: {
          info: true,
          notes: true,
        },
      },
    },
  });
}

export async function getTodaysWorkout(userId: number) {
  return await db.query.workouts.findFirst({
    where: (model, { eq, and }) =>
      and(
        eq(model.userId, userId),
        eq(model.nextOccurrenceDate, String(new Date())),
      ),
    with: {
      sessionExercises: {
        with: {
          info: true,
          notes: true,
        },
      },
    },
  });
}

export async function getWorkout(userId: number, planId: number) {
  return await db.query.workouts.findFirst({
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.id, planId)),
    with: {
      sessionExercises: {
        with: {
          info: true,
          notes: true,
        },
      },
    },
  });
}
