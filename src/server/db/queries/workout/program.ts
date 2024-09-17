import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { workoutPrograms } from "~/server/db/schema";
import { createDayGroup } from "./groups";

export async function getMyPrograms(userId: string) {
  return await db.query.workoutPrograms.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
    columns: { createdAt: false, updatedAt: false },
  });
}

export async function getMyProgram(userId: string, programId: number) {
  const program = await db.query.workoutPrograms.findFirst({
    where: (model, { and, eq }) =>
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
              day: { columns: { startedWorkout: true, endedWorkout: true } },
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
      name: true,
      userId: true,
      id: true,
      startDate: true,
      endDate: true,
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
  const newProgramId = await db
    .insert(workoutPrograms)
    .values({
      userId,
      name,
      startDate,
      endDate,
    })
    .returning({ id: workoutPrograms.id });
  const newGroup = await createDayGroup(userId, newProgramId[0]!.id);
  return newGroup[0]?.newGroupId;
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
