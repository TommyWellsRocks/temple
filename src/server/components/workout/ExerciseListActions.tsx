"use server";

import { revalidatePath } from "next/cache";
import { addDayExercise, deleteDayExercise } from "~/server/queries/workouts";

export async function handleAddExercise(
  userId: string,
  programId: number,
  groupId: number,
  dayId: number,
  exerciseId: number,
) {
  await addDayExercise(userId, programId, groupId, dayId, exerciseId);
  revalidatePath(`/workout/${programId}`);
}

export async function handleDeleteExercise(
  userId: string,
  programId: number,
  groupId: number,
  dayId: number,
  exerciseId: number,
) {
  await deleteDayExercise(userId, programId, groupId, dayId, exerciseId);
  revalidatePath(`/workout/${programId}`);
}
