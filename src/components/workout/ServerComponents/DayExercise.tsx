"use server";

import { revalidatePath } from "next/cache";
import { editExerciseNote } from "~/server/queries/exercises";
import {
  updateDayExerciseInput,
  updateDayExerciseSets,
} from "~/server/queries/workouts";
import { DayExercise } from "~/server/types";

export async function handleExerciseVolumeInput(
  userId: string,
  dayExercise: DayExercise,
  updateType: "Reps" | "Weight",
  newValues: number[],
) {
  await updateDayExerciseInput(userId, dayExercise!.id, updateType, newValues);
  revalidatePath(`/workout/${dayExercise!.dayId}/${dayExercise!.id}`);
}

export async function handleEditSetCount(
  userId: string,
  dayExercise: DayExercise,
  repValues: number[],
  weightValues: number[],
) {
  await updateDayExerciseSets(userId, dayExercise!.id, repValues, weightValues);
  revalidatePath(`/workout/${dayExercise!.dayId}/${dayExercise!.id}`);
}

export async function handleExerciseNoteInput(
  dayExercise: DayExercise,
  noteValue: string,
  noteId?: number,
) {
  await editExerciseNote(dayExercise!.userId, dayExercise!.exerciseId, noteValue, noteId);
  revalidatePath(`/workout/${dayExercise!.dayId}/${dayExercise!.id}`);
}
