"use server";

import { revalidatePath } from "next/cache";
import { editExerciseNote } from "~/server/queries/exercises";
import {
  updateDayExerciseInput,
  updateDayExerciseSets,
} from "~/server/queries/workouts";

export async function handleExerciseVolumeInput(
  userId: string,
  dayExercise: {
    id: number;
    dayId: number;
    userId: string;
  },
  updateType: "Reps" | "Weight",
  newValues: number[],
) {
  await updateDayExerciseInput(userId, dayExercise!.id, updateType, newValues);
  revalidatePath(`/workout/${dayExercise!.dayId}/${dayExercise!.id}`);
}

export async function handleEditSetCount(
  userId: string,
  dayExercise: {
    id: number;
    dayId: number;
    userId: string;
  },
  repValues: number[],
  weightValues: number[],
) {
  await updateDayExerciseSets(userId, dayExercise!.id, repValues, weightValues);
  revalidatePath(`/workout/${dayExercise!.dayId}/${dayExercise!.id}`);
}

export async function handleExerciseNoteInput(
  dayExercise: {
    id: number;
    dayId: number;
    userId: string;
    exerciseId: number;
  },
  noteValue: string,
  noteId?: number,
) {
  await editExerciseNote(
    dayExercise!.userId,
    dayExercise!.exerciseId,
    noteValue,
    noteId,
  );
  revalidatePath(`/workout/${dayExercise!.dayId}/${dayExercise!.id}`);
}
