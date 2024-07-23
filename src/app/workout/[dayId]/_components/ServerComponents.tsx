"use server";

import { revalidatePath } from "next/cache";
import {
  addWorkoutExercise,
  deleteDayExercise,
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
  dayId: number,
  exerciseId: number,
) {
  await deleteDayExercise(userId, dayId, exerciseId);
  revalidatePath(`/workout/${dayId}`);
}
