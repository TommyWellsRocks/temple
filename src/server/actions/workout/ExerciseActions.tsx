"use server";

import { ZodError } from "zod";
import {
  exerciseLoggedSetsSchema,
  exerciseNoteSchema,
  exerciseSetsSchema,
  exerciseVolumeSchema,
} from "~/lib/schemas/exercise";
import { auth } from "~/server/auth";
import {
  updateDayExerciseInput,
  updateDayExerciseSets,
  updateLoggedSets,
} from "~/server/db/queries/workout/dayExercises";
import { editUserExerciseNote } from "~/server/db/queries/workout/exercises";

export async function handleExerciseVolumeInput(
  dayExerciseId: number,
  reps: number[],
  weight: number[],
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { err: "Authentication error." };

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

  return await updateDayExerciseInput(dayExerciseId, reps, weight);
}

export async function handleExerciseSetsChange(
  dayExerciseId: number,
  reps: number[],
  weight: number[],
  loggedSetsCount: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { err: "Authentication error." };

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
    reps,
    weight,
    loggedSetsCount,
  );
}

export async function handleUpdateLoggedSets(
  dayExerciseId: number,
  loggedSetsCount: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { err: "Authentication error." };

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

  return await updateLoggedSets(dayExerciseId, loggedSetsCount);
}

export async function handleExerciseNoteInput(
  exerciseId: number,
  noteValue: string,
  noteId?: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { value: null, err: "Authentication error." };

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

  return await editUserExerciseNote(exerciseId, noteValue, noteId);
}
