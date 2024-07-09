"use server";

import { revalidatePath } from "next/cache";
import { addWorkoutExercise } from "~/server/queries/workouts";

export async function handleAddExercise(
  userId: string,
  workoutId: number,
  exerciseId: number,
) {
  await addWorkoutExercise(userId, workoutId, exerciseId);
  revalidatePath(`/workout/${workoutId}`);
}
