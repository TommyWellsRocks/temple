"use server";

import { ZodError } from "zod";
import {
  addExerciseSchema,
  deleteExerciseSchema,
  editExerciseNameSchema,
  getExerciseSchema,
  startEndWorkoutSchema,
} from "~/lib/schemas/day";
import { auth } from "~/server/auth";
import { endWorkout, startWorkout } from "~/server/db/queries/workout/day";
import {
  addDayExercise,
  deleteDayExercise,
  getDayExercise,
} from "~/server/db/queries/workout/dayExercises";
import { editUserExerciseName } from "~/server/db/queries/workout/exercises";

export async function handleGetExercise(dayExerciseId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { value: null, err: "Authentication error." };

  try {
    await getExerciseSchema.parseAsync({ userId, dayExerciseId });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Exercises validation error." };
  }

  return await getDayExercise(dayExerciseId);
}

export async function handleAddExercise(
  programId: number,
  groupId: number,
  dayId: number,
  exerciseId: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { value: null, err: "Authentication error." };

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

  return await addDayExercise(programId, groupId, dayId, exerciseId);
}

export async function handleEditExerciseName(
  exerciseId: number,
  newName: string,
  noteId?: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { value: null, err: "Authentication error." };

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

  return await editUserExerciseName(exerciseId, newName, noteId);
}

export async function handleDeleteExercise(dayExerciseId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { err: "Authentication error." };

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

  return await deleteDayExercise(dayExerciseId);
}

export async function handleStartWorkout(dayId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { err: "Authentication error." };

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

  return await startWorkout(dayId);
}

export async function handleEndWorkout(dayId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { err: "Authentication error." };

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

  return await endWorkout(dayId);
}
