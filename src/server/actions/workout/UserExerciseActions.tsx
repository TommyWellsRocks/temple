"use server";

import { revalidatePath } from "next/cache";
import {
  createUserExercise,
  deleteUserExercise,
  editUserExercise,
} from "~/server/db/queries/workout/exercises";

export async function handleCreateUserExercise(
  userId: string,
  name: string,
  equipment: string[] | null,
  primaryMuscle: string | null,
  secondaryMuscles: string[] | null,
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
  equipment: string[] | null,
  primaryMuscle: string | null,
  secondaryMuscles: string[] | null,
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
