"use server";

import { revalidatePath } from "next/cache";
import { updateExerciseInput } from "~/server/queries/workouts";

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
