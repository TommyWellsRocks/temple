import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { workoutPrograms } from "~/server/db/schema";
import { createDayGroup } from "./groups";

export async function getMyPrograms(userId: string) {
  const program = await db.query.workoutPrograms.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    with: {
      groups: { columns: { id: true } },
      programDays: {
        columns: { createdAt: false },
        with: {
          group: { columns: { id: true } },
          dayExercises: {
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
          },
        },
      },
    },
    columns: {
      createdAt: false,
    },
  });
  return program;
}

export async function getMyProgram(userId: string, programId: number) {
  const program = await db.query.workoutPrograms.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.userId, userId), eq(model.id, programId)),
    with: {
      groups: { columns: { id: true } },
      programDays: {
        columns: { createdAt: false },
        with: {
          group: { columns: { id: true } },
          dayExercises: {
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
          },
        },
      },
    },
    columns: {
      createdAt: false,
    },
  });
  return program;
}

export async function createWorkoutProgram(
  userId: string,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  const newProgram = await db
    .insert(workoutPrograms)
    .values({
      userId,
      name,
      startDate,
      endDate,
    })
    .returning();
  await createDayGroup(userId, newProgram[0]!.id);
  return { id: newProgram[0]!.id };
}

export async function editWorkoutProgram(
  userId: string,
  programId: number,
  name: string,
  startDate: Date,
  endDate: Date,
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
