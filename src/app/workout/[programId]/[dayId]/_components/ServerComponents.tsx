"use server";

import { revalidatePath } from "next/cache";
import { addDayExercise, deleteDayExercise } from "~/server/queries/workouts";

export async function handleAddExercise(
  userId: string,
  programId: number,
  dayId: number,

  exerciseId: number,
) {
  await addDayExercise(userId, programId, dayId, exerciseId);
  revalidatePath(`/workout/${programId}`);
}

export async function handleDeleteExercise(
  userId: string,
  programId: number,
  dayId: number,
  dayExerciseId: number,
) {
  await deleteDayExercise(userId, programId, dayId, dayExerciseId);
  revalidatePath(`/workout/${programId}`);
}
