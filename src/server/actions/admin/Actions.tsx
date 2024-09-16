"use server";

import { insertExercises } from "~/server/db/queries/admin/admin";

import type { TitleCaseEquipment, TitleCaseMuscle } from "doNotChangeMe";

export async function handleInsertExercises(
  formattedData: {
    id: number | undefined;
    name: string;
    equipment: TitleCaseEquipment[];
    primaryMuscle: TitleCaseMuscle;
    secondaryMuscles: TitleCaseMuscle[];
    video: undefined;
  }[],
) {
  await insertExercises(formattedData);
}
