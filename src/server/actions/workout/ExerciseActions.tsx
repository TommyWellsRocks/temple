"use server";

import { editExerciseNote } from "~/server/queries/exercises";
import {
  updateDayExerciseInput,
  updateDayExerciseSets,
  updateLoggedSets,
} from "~/server/queries/workouts";

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
  dayExerciseId: number,
  userId: string,
  loggedSetsCount: number,
) {
  await updateLoggedSets(dayExerciseId, userId, loggedSetsCount);
}
