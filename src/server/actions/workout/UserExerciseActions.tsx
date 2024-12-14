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
import { auth } from "~/server/auth";

export async function handleCreateUserExercise(
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

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
    name,
    equipment,
    primaryMuscle,
    secondaryMuscles,
  );
}

export async function handleEditUserExercise(
  exerciseId: number,
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

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
    exerciseId,
    name,
    equipment,
    primaryMuscle,
    secondaryMuscles,
  );
}

export async function handleDeleteUserExercise(exerciseId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

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

  return await deleteUserExercise(exerciseId);
}
