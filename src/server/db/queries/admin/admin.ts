import "server-only";

import { db } from "~/server/db";
import { exercises } from "~/server/db/schema";

import type { TitleCaseMuscle } from "doNotChangeMe";

export async function insertExercises(
  formattedData: {
    id: number | undefined;
    name: string;
    equipment: string[];
    primaryMuscle: TitleCaseMuscle;
    secondaryMuscles: TitleCaseMuscle[];
    video: undefined;
  }[],
) {
  await db.insert(exercises).values(formattedData);
}
