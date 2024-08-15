"use server";

import { insertExercises } from "~/server/queries/exercises";

export async function handleInsertExercises(
  formattedData: {
    name: string;
    category: string;
    muscles: string[];
    musclesImage: string;
    equipment: string[];
  }[],
) {
  await insertExercises(formattedData);
}
