"use server";

import { revalidatePath } from "next/cache";
import { editSets, updateExerciseInput } from "~/server/queries/workouts";

export async function handleInput(
  userId: string,
  workoutId: number,
  exerciseId: number,
  sessionExerciseId: number,
  method: "Reps" | "Weight",
  newValues: number[],
) {
  await updateExerciseInput(userId, sessionExerciseId, method, newValues);
  revalidatePath(`/workout/${workoutId}/${exerciseId}`);
}

export async function handleEditSets(
  userId: string,
  workoutId: number,
  exerciseId: number,
  sessionExerciseId: number,
  repValues: number[],
  weightValues: number[],
) {
  await editSets(userId, sessionExerciseId, repValues, weightValues);
  revalidatePath(`/workout/${workoutId}/${exerciseId}`);
}
