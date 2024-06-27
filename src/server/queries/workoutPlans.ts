import "server-only";
import { db } from "../db";

export async function getMyWorkoutPlans(userId: number) {
  return await db.query.workout_plans.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.updatedAt),
  });
}

export async function getWorkoutPlan(userId: number, id: number) {
  return await db.query.workout_plans.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.userId, userId), eq(model.id, id)),
  });
}

export async function getTodaysWorkoutPlan(userId: number) {
  return await db.query.workout_plans.findFirst({
    where: (model, { eq, and }) =>
      and(
        eq(model.userId, userId),
        eq(model.nextOccurrenceDate, String(new Date())),
      ),
  });
}
