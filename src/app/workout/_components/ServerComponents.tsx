"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkoutProgram,
  editWorkoutProgram,
  deleteWorkoutProgram,
} from "~/server/queries/workouts";

export async function handleCreateWorkoutProgram(
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

export async function handleEditWorkoutProgram(
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

export async function handleDeleteWorkout(userId: string, workoutId: number) {
  await deleteWorkoutProgram(userId, workoutId);
  revalidatePath("/workout");
}
