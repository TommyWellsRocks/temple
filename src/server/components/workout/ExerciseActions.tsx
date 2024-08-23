"use server";

import { editExerciseNote } from "~/server/queries/exercises";
import {
  updateDayExerciseInput,
  updateExercise,
  updateLoggedSets,
} from "~/server/queries/workouts";
import type { DayExercise } from "~/server/types";

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
}

export async function handleUpdateLoggedSets(
  id: number,
  userId: string,
  loggedSetsCount: number,
) {
  await updateLoggedSets(id, userId, loggedSetsCount);
}

export async function handleUpdateExercise(dayEx: DayExercise) {
  await updateExercise(dayEx);
}
