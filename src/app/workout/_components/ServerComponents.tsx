"use server";

import { revalidatePath } from "next/cache";
import { createWorkout, editWorkout } from "~/server/queries/workouts";

export async function handleCreateWorkout(
  userId: string,
  name: string,
  repeatStart: Date | undefined,
  repeatEnd: Date | undefined,
  repeatOn: number[] | undefined,
) {
  await createWorkout(userId, name, repeatStart ? repeatStart.toISOString() : null, repeatEnd ? repeatEnd.toISOString() : null, repeatOn ? repeatOn : null);
  revalidatePath("/workout");
}

export async function handleEditWorkout(
  userId: string,
  workoutId: number,
  name: string,
  repeatStart: Date | undefined,
  repeatEnd: Date | undefined,
  repeatOn: number[] | undefined,
) {
  await editWorkout(userId, workoutId, name, repeatStart ? repeatStart.toISOString() : null, repeatEnd ? repeatEnd.toISOString() : null, repeatOn ? repeatOn : null);
  revalidatePath("/workout");
}
