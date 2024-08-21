"use server";

import { revalidatePath } from "next/cache";
import { editExerciseNote } from "~/server/queries/exercises";
import {
  updateDayExerciseInput,
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
    dayExercise.userId,
    dayExercise.exerciseId,
    noteValue,
    noteId,
  );
  revalidatePath(
    `/workout/${dayExercise.programId}/${dayExercise.dayId}/${dayExercise.id}`,
  );
}
