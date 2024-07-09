"use server";

import { revalidatePath } from "next/cache";
import { createWorkout, editWorkout } from "~/server/queries/workouts";

export async function handleCreateWorkout(
  userId: string,
  name: string,
  repeatStart: string | null,
  repeatEnd: string | null,
  repeatOn: number[] | null,
) {
  await createWorkout(userId, name, repeatStart, repeatEnd, repeatOn);
  revalidatePath("/workout");
}

export async function handleEditWorkout(
  userId: string,
  workoutId: number,
  name: string,
  repeatStart: string | null,
  repeatEnd: string | null,
  repeatOn: number[] | null,
) {
  await editWorkout(userId, workoutId, name, repeatStart, repeatEnd, repeatOn);
  revalidatePath("/workout");
}
