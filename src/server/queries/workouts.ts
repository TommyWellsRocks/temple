import "server-only";
import { db } from "../db";
import {
  calculateExerciseVolume,
  calculateSessionVolume,
  getBetweenDays,
  getDayOfWeek,
} from "./utils/workoutVolume";
import { SessionExercise } from "../types";

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

export async function getExerciseAnalytics(
  userId: number,
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

export async function getWeekAnalytics(userId: number) {
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
