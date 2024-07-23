"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkoutProgram,
  editWorkoutProgram,
  deleteWorkoutProgram,
} from "~/server/queries/workouts";

export async function handleCreateProgram(
  userId: string,
  name: string,
  repeatStart: Date,
  repeatEnd: Date,
) {
  await createWorkoutProgram(
    userId,
    name,
    repeatStart.toISOString(),
    repeatEnd.toISOString(),
  );
  revalidatePath("/workout");
}

export async function handleEditProgram(
  userId: string,
  programId: number,
  name: string,
  repeatStart: Date,
  repeatEnd: Date,
) {
  await editWorkoutProgram(
    userId,
    programId,
    name,
    repeatStart.toISOString(),
    repeatEnd.toISOString(),
  );
  revalidatePath("/workout");
}

export async function handleDeleteProgram(userId: string, programId: number) {
  await deleteWorkoutProgram(userId, programId);
  revalidatePath("/workout");
}
