import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { workoutProgramDays } from "~/server/db/schema";

export async function createProgramDay(
  userId: string,
  programId: number,
  groupId: number,
  name: string,
  repeatOn: number[] | null,
) {
  await db
    .insert(workoutProgramDays)
    .values({ userId, programId, groupId, name, repeatOn });
}

export async function editProgramDay(
  userId: string,
  programId: number,
  dayId: number,
  name: string,
  repeatOn: number[] | null,
) {
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
}

export async function deleteProgramDay(
  userId: string,
  programId: number,
  dayId: number,
) {
  await db
    .delete(workoutProgramDays)
    .where(
      and(
        eq(workoutProgramDays.userId, userId),
        eq(workoutProgramDays.programId, programId),
        eq(workoutProgramDays.id, dayId),
      ),
    );
}

export async function startWorkout(
  userId: string,
  dayId: number,
  startedWorkout: Date,
) {
  await db
    .update(workoutProgramDays)
    .set({ startedWorkout })
    .where(
      and(
        eq(workoutProgramDays.userId, userId),
        eq(workoutProgramDays.id, dayId),
      ),
    );
}

export async function endWorkout(
  userId: string,
  dayId: number,
  endedWorkout: Date,
) {
  await db
    .update(workoutProgramDays)
    .set({ endedWorkout })
    .where(
      and(
        eq(workoutProgramDays.userId, userId),
        eq(workoutProgramDays.id, dayId),
      ),
    );
}
