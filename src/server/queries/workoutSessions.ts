import "server-only";
import { db } from "../db";
import { WorkoutItem } from "../types";
import { workout_sessions } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { validateWorkoutItems } from "./utils/workoutValidation";

export async function createWorkoutSession(
  userId: number,
  workoutItems: WorkoutItem[],
) {
  const validWorkoutItems = await validateWorkoutItems(workoutItems);

  if (typeof validWorkoutItems === "string") return validWorkoutItems;

  await db.insert(workout_sessions).values({ userId, workoutItems: validWorkoutItems });
}

export async function deleteWorkoutSession(userId: number, sessionId: number) {
  await db
    .delete(workout_sessions)
    .where(
      and(
        eq(workout_sessions.id, sessionId),
        eq(workout_sessions.userId, userId),
      ),
    );
}

export async function editWorkoutSession(
  userId: number,
  sessionId: number,
  newWorkoutItems: WorkoutItem[],
) {
  const validWorkoutItems = await validateWorkoutItems(newWorkoutItems);

  if (typeof validWorkoutItems === "string") return validWorkoutItems;

  await db
    .update(workout_sessions)
    .set({ workoutItems: validWorkoutItems, updatedAt: new Date() })
    .where(
      and(
        eq(workout_sessions.id, sessionId),
        eq(workout_sessions.userId, userId),
      ),
    );
}

export async function getWorkoutSession(userId: number, sessionId: number) {
  return await db.query.workout_sessions.findFirst({
    where: (model, { eq }) =>
      and(eq(model.id, sessionId), eq(model.userId, userId)),
  });
}

export async function getMyWorkoutSessions(userId: number) {
  return await db.query.workout_sessions.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.updatedAt),
  });
}
