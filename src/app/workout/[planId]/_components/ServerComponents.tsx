"use server";

import { revalidatePath } from "next/cache";
import {
  addWorkoutExercise,
  deleteWorkoutExercise,
} from "~/server/queries/workouts";

export async function handleAddExercise(
  userId: string,
  workoutId: number,
  exerciseId: number,
) {
  await addWorkoutExercise(userId, workoutId, exerciseId);
  revalidatePath(`/workout/${workoutId}`);
}

export async function handleDeleteExercise(
  userId: string,
  workoutId: number,
  exerciseId: number,
) {
  await deleteWorkoutExercise(userId, workoutId, exerciseId);
  revalidatePath(`/workout/${workoutId}`);
}
