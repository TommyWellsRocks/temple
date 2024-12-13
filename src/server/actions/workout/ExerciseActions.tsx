"use server";

import { ZodError } from "zod";
import {
  exerciseLoggedSetsSchema,
  exerciseNoteSchema,
  exerciseSetsSchema,
  exerciseVolumeSchema,
} from "~/lib/schemas/exercise";
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
  try {
    await exerciseVolumeSchema.parseAsync({
      userId,
      dayExerciseId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercises validation error." };
  }

  return await updateDayExerciseInput(dayExerciseId, userId, reps, weight);
}

export async function handleExerciseSetsChange(
  dayExerciseId: number,
  userId: string,
  reps: number[],
  weight: number[],
  loggedSetsCount: number,
) {
  try {
    await exerciseSetsSchema.parseAsync({
      userId,
      dayExerciseId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercises validation error." };
  }

  return await updateDayExerciseSets(
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
  try {
    await exerciseLoggedSetsSchema.parseAsync({
      userId,
      dayExerciseId,
      loggedSetsCount,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercises validation error." };
  }

  return await updateLoggedSets(dayExerciseId, userId, loggedSetsCount);
}

export async function handleExerciseNoteInput(
  userId: string,
  exerciseId: number,
  noteValue: string,
  noteId?: number,
) {
  try {
    await exerciseNoteSchema.parseAsync({
      userId,
      exerciseId,
      noteValue,
      noteId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Exercises validation error." };
  }

  return await editUserExerciseNote(userId, exerciseId, noteValue, noteId);
}
