"use server";

import { revalidatePath } from "next/cache";
import {
  createUserExercise,
  deleteUserExercise,
  editUserExercise,
} from "~/server/db/queries/workout/exercises";

import type { TitleCaseEquipment, TitleCaseMuscle } from "doNotChangeMe";

export async function handleCreateUserExercise(
  userId: string,
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
  await createUserExercise(
    userId,
    name,
    equipment,
    primaryMuscle,
    secondaryMuscles,
  );
  revalidatePath("/workout");
}

export async function handleDeleteUserExercise(
  userId: string,
  exerciseId: number,
) {
  await deleteUserExercise(userId, exerciseId);
  revalidatePath("/workout");
}

export async function handleEditUserExercise(
  userId: string,
  exerciseId: number,
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
  editUserExercise(
    userId,
    exerciseId,
    name,
    equipment,
    primaryMuscle,
    secondaryMuscles,
  );
  revalidatePath("/workout");
}
