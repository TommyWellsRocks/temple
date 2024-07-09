import "server-only";
import { db } from "../db";
import {
  calculateExerciseVolume,
  calculateSessionVolume,
  getBetweenDays,
  getDayOfWeek,
} from "./utils/workoutVolume";
import { SessionExercise } from "../types";
import { workout_session_exercises, workouts } from "../db/schema";
import { and, eq } from "drizzle-orm";

export async function getMyWorkouts(userId: string) {
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

export async function getTodaysWorkout(userId: string) {
  const today = new Date();
  const todayString = String(today);
  return await db.query.workouts.findFirst({
    where: (model, { and, eq, gte, lte, sql }) =>
      and(
        eq(model.userId, userId),
        lte(model.repeatStart, todayString),
        gte(model.repeatEnd, todayString),
        sql`${model.repeatOn} @> {${today.getDay()}}`,
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

export async function createWorkout(
  userId: string,
  name: string,
  repeatStart: string | null,
  repeatEnd: string | null,
  repeatOn: number[] | null,
) {
  await db
    .insert(workouts)
    .values({ userId, name, repeatStart, repeatEnd, repeatOn });
}

export async function getWorkout(userId: string, planId: number) {
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

export async function getExerciseAnalytics(
  userId: string,
  exerciseId: number,
  sessionExercise: SessionExercise,
) {
  const today = new Date();
  const lastWorkout = await db.query.workouts.findFirst({
    where: (model, { lt, and, eq }) =>
      and(eq(model.userId, userId), lt(model.createdAt, today)),
    with: {
      sessionExercises: {
        where: (model, { and, eq, ne }) =>
          and(eq(model.exerciseId, exerciseId), ne(model.reps, [0, 0, 0, 0])),
      },
    },
  });

  let lastSession: number[];
  if (lastWorkout) {
    const index = lastWorkout.sessionExercises.findIndex(
      (item) => item.exerciseId === exerciseId,
    );
    lastSession = calculateExerciseVolume(lastWorkout.sessionExercises[index]!);
  } else {
    lastSession = [0];
  }
  const currentSession = calculateExerciseVolume(sessionExercise);

  return [lastSession, currentSession];
}

export async function getWeekAnalytics(userId: string) {
  const [lastSun, lastSat, thisSun, thisSat] = getBetweenDays();
  const weekVolume = async (firstDay: Date, lastDay: Date) => {
    const weekSessions = await db.query.workouts.findMany({
      where: (model, { and, eq, between }) =>
        and(
          eq(model.userId, userId),
          between(model.createdAt, firstDay, lastDay),
        ),
      with: {
        sessionExercises: {
          where: (model, { ne }) => ne(model.reps, [0, 0, 0, 0]),
          with: { info: true, notes: true },
        },
      },
    });

    const weekVolume = [0, 0, 0, 0, 0, 0, 0];
    weekSessions.forEach((session) => {
      const sessionVolume = calculateSessionVolume(session.sessionExercises);
      const dayOfWeek = getDayOfWeek(session.createdAt);
      weekVolume[dayOfWeek]! += sessionVolume;
    });
    return weekVolume;
  };
  const lastWeekVolume = weekVolume(lastSun!, lastSat!);
  const thisWeekVolume = weekVolume(thisSun!, thisSat!);

  return [lastWeekVolume, thisWeekVolume];
}

export async function editWorkout(
  userId: string,
  workoutId: number,
  name: string,
  repeatStart: string | null,
  repeatEnd: string | null,
  repeatOn: number[] | null,
) {
  await db
    .update(workouts)
    .set({ name, repeatStart, repeatEnd, repeatOn, updatedAt: new Date() })
    .where(and(eq(workouts.userId, userId), eq(workouts.id, workoutId)));
}

export async function addWorkoutExercise(
  userId: string,
  workoutId: number,
  exerciseId: number,
) {
  await db
    .insert(workout_session_exercises)
    .values({ userId, workoutId, exerciseId });
}

export async function deleteWorkoutExercise(
  userId: string,
  workoutId: number,
  exerciseId: number,
) {
  await db
    .delete(workout_session_exercises)
    .where(
      and(
        eq(workout_session_exercises.userId, userId),
        eq(workout_session_exercises.workoutId, workoutId),
        eq(workout_session_exercises.exerciseId, exerciseId),
      ),
    );
}
