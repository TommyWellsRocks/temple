import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { workoutProgramDays } from "~/server/db/schema";

export async function getProgramDay(userId: string, dayId: number) {
  try {
    return {
      value: await db.query.workoutProgramDays.findFirst({
        where: (model, { and, eq }) =>
          and(eq(model.userId, userId), eq(model.id, dayId)),
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
      }),
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting day from DB." };
  }
}

export async function createProgramDay(
  userId: string,
  programId: number,
  groupId: number,
  name: string,
  repeatOn: number[] | null,
) {
  try {
    const newDay = await db
      .insert(workoutProgramDays)
      .values({ userId, programId, groupId, name, repeatOn })
      .returning({ id: workoutProgramDays.id });
    return { value: newDay[0]!.id, err: null };
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error creating day in DB." };
  }
}

export async function editProgramDay(
  userId: string,
  programId: number,
  dayId: number,
  name: string,
  repeatOn: number[] | null,
) {
  try {
    await db
      .update(workoutProgramDays)
      .set({ name, repeatOn, updatedAt: new Date() })
      .where(
        and(
          eq(workoutProgramDays.userId, userId),
          eq(workoutProgramDays.programId, programId),
          eq(workoutProgramDays.id, dayId),
        ),
      );
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error updating day in DB." };
  }
  return { err: null };
}

export async function deleteProgramDay(
  userId: string,
  programId: number,
  dayId: number,
) {
  try {
    await db
      .delete(workoutProgramDays)
      .where(
        and(
          eq(workoutProgramDays.userId, userId),
          eq(workoutProgramDays.programId, programId),
          eq(workoutProgramDays.id, dayId),
        ),
      );
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error deleting day from DB." };
  }
  return { err: null };
}

export async function startWorkout(userId: string, dayId: number) {
  try {
    await db
      .update(workoutProgramDays)
      .set({ startedWorkout: new Date() })
      .where(
        and(
          eq(workoutProgramDays.userId, userId),
          eq(workoutProgramDays.id, dayId),
        ),
      );
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error updating workout in DB." };
  }
  return { err: null };
}

export async function endWorkout(userId: string, dayId: number) {
  try {
    await db
      .update(workoutProgramDays)
      .set({ endedWorkout: new Date() })
      .where(
        and(
          eq(workoutProgramDays.userId, userId),
          eq(workoutProgramDays.id, dayId),
        ),
      );
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error updating workout in DB." };
  }
  return { err: null };
}
