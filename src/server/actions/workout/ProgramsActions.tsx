"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkoutProgram,
  deleteWorkoutProgram,
  editWorkoutProgram,
} from "~/server/db/queries/workout/program";

export async function handleCreateProgram(
  userId: string,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  const newGroupId = await createWorkoutProgram(
    userId,
    name,
    startDate,
    endDate,
  );
  revalidatePath("/workout");
  return newGroupId;
}

export async function handleEditProgram(
  userId: string,
  programId: number,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  await editWorkoutProgram(userId, programId, name, startDate, endDate);
  revalidatePath("/workout");
}

export async function handleDeleteProgram(userId: string, programId: number) {
  await deleteWorkoutProgram(userId, programId);
  revalidatePath("/workout");
}
