import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { workoutPrograms } from "~/server/db/schema";
import { createDayGroup } from "./groups";

export async function getMyPrograms(userId: string) {
  try {
    return {
      value: await db.query.workoutPrograms.findMany({
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
      }),
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting my programs from DB." };
  }
}

export async function getMyProgram(userId: string, programId: number) {
  try {
    return {
      value: await db.query.workoutPrograms.findFirst({
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
      }),
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting program from DB" };
  }
}

export async function createWorkoutProgram(
  userId: string,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  let newProgramId: number;
  try {
    const newProgram = await db
      .insert(workoutPrograms)
      .values({
        userId,
        name,
        startDate,
        endDate,
      })
      .returning({ id: workoutPrograms.id });
    newProgramId = newProgram[0]!.id;
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error creating program in DB." };
  }
  const { err } = await createDayGroup(userId, newProgramId);
  if (err) return { value: newProgramId, err };

  return { value: newProgramId, err: null };
}

export async function editWorkoutProgram(
  userId: string,
  programId: number,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  try {
    await db
      .update(workoutPrograms)
      .set({ name, startDate, endDate, updatedAt: new Date() })
      .where(
        and(
          eq(workoutPrograms.userId, userId),
          eq(workoutPrograms.id, programId),
        ),
      );
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error updating program in DB." };
  }
  return { err: null };
}

export async function deleteWorkoutProgram(userId: string, programId: number) {
  try {
    await db
      .delete(workoutPrograms)
      .where(
        and(
          eq(workoutPrograms.userId, userId),
          eq(workoutPrograms.id, programId),
        ),
      );
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error deleting program in DB." };
  }
  return { err: null };
}
