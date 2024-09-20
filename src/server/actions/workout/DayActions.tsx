"use server";

import { endWorkout, startWorkout } from "~/server/db/queries/workout/day";
import {
  addDayExercise,
  deleteDayExercise,
  getDayExercise,
} from "~/server/db/queries/workout/dayExercises";
import { editUserExerciseName } from "~/server/db/queries/workout/exercises";

export async function handleGetExercise(userId: string, dayExerciseId: number) {
  return await getDayExercise(userId, dayExerciseId);
}

export async function handleAddExercise(
  userId: string,
  programId: number,
  groupId: number,
  dayId: number,
  exerciseId: number,
) {
  return await addDayExercise(userId, programId, groupId, dayId, exerciseId);
}

export async function handleEditExerciseName(
  userId: string,
  exerciseId: number,
  newName: string,
  noteId?: number,
) {
  return await editUserExerciseName(userId, exerciseId, newName, noteId);
}

export async function handleDeleteExercise(
  userId: string,
  dayExerciseId: number,
) {
  await deleteDayExercise(userId, dayExerciseId);
}

export async function handleStartWorkout(userId: string, dayId: number) {
  await startWorkout(userId, dayId);
}

export async function handleEndWorkout(userId: string, dayId: number) {
  await endWorkout(userId, dayId);
}
