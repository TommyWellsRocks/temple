"use server";

import { insertExercises } from "~/server/db/queries/admin/admin";

export async function handleInsertExercises(
  formattedData: {
    id: number | undefined;
    name: string;
    equipment: string[];
    primaryMuscle: string;
    secondaryMuscles: string[];
    video: undefined;
  }[],
) {
  await insertExercises(formattedData);
}
