"use server";

import { revalidatePath } from "next/cache";
import { editExerciseNote } from "~/server/queries/exercises";
import {
  updateDayExerciseInput,
  updateDayExerciseSets,
} from "~/server/queries/workouts";

export async function handleExerciseVolumeInput(dayExercise: {
  id: number;
  programId: number;
  dayId: number;
  userId: string;
  reps: number[];
  weight: number[];
}) {
  await updateDayExerciseInput(dayExercise);
  revalidatePath(
    `/workout/${dayExercise!.programId}/${dayExercise!.dayId}/${dayExercise!.id}`,
  );
}

export async function handleEditSetCount(
  dayExercise: {
    id: number;
    programId: number;
    dayId: number;
    userId: string;
  },
  repValues: number[],
  weightValues: number[],
) {
  await updateDayExerciseSets(
    dayExercise!.userId,
    dayExercise!.id,
    repValues,
    weightValues,
  );
  revalidatePath(
    `/workout/${dayExercise!.programId}/${dayExercise!.dayId}/${dayExercise!.id}`,
  );
}

export async function handleExerciseNoteInput(
  dayExercise: {
    id: number;
    programId: number;
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
  revalidatePath(
    `/workout/${dayExercise!.programId}/${dayExercise!.dayId}/${dayExercise!.id}`,
  );
}
