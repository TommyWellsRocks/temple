"use server";

import { revalidatePath } from "next/cache";
import {
  updateDayExerciseInput,
  updateDayExerciseSets,
} from "~/server/queries/workouts";
import { DayExercise } from "~/server/types";

export async function handleInput(
  userId: string,
  dayExercise: DayExercise,
  updateType: "Reps" | "Weight",
  newValues: number[],
) {
  await updateDayExerciseInput(userId, dayExercise!.id, updateType, newValues);
  revalidatePath(`/workout/${dayExercise!.dayId}/${dayExercise!.id}`);
}

export async function handleEditSets(
  userId: string,
  dayExercise: DayExercise,
  repValues: number[],
  weightValues: number[],
) {
  await updateDayExerciseSets(userId, dayExercise!.id, repValues, weightValues);
  revalidatePath(`/workout/${dayExercise!.dayId}/${dayExercise!.id}`);
}
