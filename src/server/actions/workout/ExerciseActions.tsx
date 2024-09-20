"use server";

import { revalidatePath } from "next/cache";
import {
  updateDayExerciseInput,
  updateDayExerciseSets,
  updateLoggedSets,
} from "~/server/db/queries/workout/dayExercises";
import { editUserExerciseNote } from "~/server/db/queries/workout/exercises";

export async function handleExerciseVolumeInput(
  dayExerciseId: number,
  userId: string,
  reps: number[],
  weight: number[],
) {
  await updateDayExerciseInput(dayExerciseId, userId, reps, weight);
}

export async function handleExerciseSetsChange(
  dayExerciseId: number,
  userId: string,
  reps: number[],
  weight: number[],
  loggedSetsCount: number,
) {
  await updateDayExerciseSets(
    dayExerciseId,
    userId,
    reps,
    weight,
    loggedSetsCount,
  );
}

export async function handleUpdateLoggedSets(
  dayExerciseId: number,
  userId: string,
  loggedSetsCount: number,
) {
  await updateLoggedSets(dayExerciseId, userId, loggedSetsCount);
}

export async function handleExerciseNoteInput(
  userId: string,
  exerciseId: number,
  noteValue: string,
  noteId?: number,
) {
  await editUserExerciseNote(userId, exerciseId, noteValue, noteId);
  if (noteId) revalidatePath("/workout");
}
