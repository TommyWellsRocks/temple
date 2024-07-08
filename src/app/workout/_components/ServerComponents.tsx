"use server";
import { revalidatePath } from "next/cache";
import { createWorkout } from "~/server/queries/workouts";

export async function handleCreateWorkout(
  userId: string,
  name: string,
  repeatStart?: string,
  repeatEnd?: string,
  repeatOn?: number[],
) {
  await createWorkout(userId, name, repeatStart, repeatEnd, repeatOn);
  revalidatePath("/workout");
}
