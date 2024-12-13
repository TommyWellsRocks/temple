"use server";

import { ZodError } from "zod";
import {
  addExerciseSchema,
  deleteExerciseSchema,
  editExerciseNameSchema,
  getExerciseSchema,
  startEndWorkoutSchema,
} from "~/lib/schemas/day";
import { endWorkout, startWorkout } from "~/server/db/queries/workout/day";
import {
  addDayExercise,
  deleteDayExercise,
  getDayExercise,
} from "~/server/db/queries/workout/dayExercises";
import { editUserExerciseName } from "~/server/db/queries/workout/exercises";

export async function handleGetExercise(userId: string, dayExerciseId: number) {
  try {
    await getExerciseSchema.parseAsync({ userId, dayExerciseId });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Exercises validation error." };
  }

  return await getDayExercise(userId, dayExerciseId);
}

export async function handleAddExercise(
  userId: string,
  programId: number,
  groupId: number,
  dayId: number,
  exerciseId: number,
) {
  try {
    await addExerciseSchema.parseAsync({
      userId,
      programId,
      groupId,
      dayId,
      exerciseId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Exercises validation error." };
  }

  return await addDayExercise(userId, programId, groupId, dayId, exerciseId);
}

export async function handleEditExerciseName(
  userId: string,
  exerciseId: number,
  newName: string,
  noteId?: number,
) {
  try {
    await editExerciseNameSchema.parseAsync({
      userId,
      exerciseId,
      newName,
      noteId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Name validation error." };
  }

  return await editUserExerciseName(userId, exerciseId, newName, noteId);
}

export async function handleDeleteExercise(
  userId: string,
  dayExerciseId: number,
) {
  try {
    await deleteExerciseSchema.parseAsync({
      userId,
      dayExerciseId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercises validation error." };
  }

  return await deleteDayExercise(userId, dayExerciseId);
}

export async function handleStartWorkout(userId: string, dayId: number) {
  try {
    await startEndWorkoutSchema.parseAsync({
      userId,
      dayId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Workout validation error." };
  }

  return await startWorkout(userId, dayId);
}

export async function handleEndWorkout(userId: string, dayId: number) {
  try {
    await startEndWorkoutSchema.parseAsync({
      userId,
      dayId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Workout validation error." };
  }

  return await endWorkout(userId, dayId);
}
