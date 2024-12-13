"use server";

import {
  createUserExercise,
  deleteUserExercise,
  editUserExercise,
} from "~/server/db/queries/workout/exercises";

import type { TitleCaseEquipment, TitleCaseMuscle } from "doNotChangeMe";
import { ZodError } from "zod";
import {
  createUserExerciseSchema,
  deleteUserExerciseSchema,
} from "~/lib/schemas/userExercise";
import { editExerciseNameSchema } from "~/lib/schemas/day";

export async function handleCreateUserExercise(
  userId: string,
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
  try {
    await createUserExerciseSchema.parseAsync({
      userId,
      name,
      equipment,
      primaryMuscle,
      secondaryMuscles,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Exercise validation error." };
  }

  return await createUserExercise(
    userId,
    name,
    equipment,
    primaryMuscle,
    secondaryMuscles,
  );
}

export async function handleEditUserExercise(
  userId: string,
  exerciseId: number,
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
  try {
    await editExerciseNameSchema.parseAsync({
      userId,
      exerciseId,
      name,
      equipment,
      primaryMuscle,
      secondaryMuscles,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercise validation error." };
  }

  return await editUserExercise(
    userId,
    exerciseId,
    name,
    equipment,
    primaryMuscle,
    secondaryMuscles,
  );
}

export async function handleDeleteUserExercise(
  userId: string,
  exerciseId: number,
) {
  try {
    await deleteUserExerciseSchema.parseAsync({
      userId,
      exerciseId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercise validation error." };
  }

  return await deleteUserExercise(userId, exerciseId);
}
