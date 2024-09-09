"use server";

import { revalidatePath } from "next/cache";
import { editUserExerciseName } from "~/server/queries/exercises";
import {
  addDayExercise,
  deleteDayExercise,
  endWorkout,
  startWorkout,
} from "~/server/queries/workouts";

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

export async function handleEditExerciseName(
  userId: string,
  programId: number,
  exerciseId: number,
  newName: string,
  noteId?: number,
) {
  await editUserExerciseName(userId, exerciseId, newName, noteId);
  revalidatePath(`/workout/${programId}`);
}

export async function handleDeleteExercise(
  userId: string,
  programId: number,
  dayExerciseId: number,
) {
  await deleteDayExercise(userId, dayExerciseId);
  revalidatePath(`/workout/${programId}`);
}

export async function handleStartWorkout(
  userId: string,
  dayId: number,
  startedWorkout: Date,
) {
  await startWorkout(userId, dayId, startedWorkout);
}

export async function handleEndWorkout(
  userId: string,
  dayId: number,
  endedWorkout: Date,
) {
  await endWorkout(userId, dayId, endedWorkout);
}
