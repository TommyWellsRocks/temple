import "server-only";

import { db } from "~/server/db";
import { exercises } from "~/server/db/schema";

export async function insertExercises(
  formattedData: {
    id: number | undefined;
    name: string;
    equipment: string[];
    primaryMuscle: string;
    secondaryMuscles: string[];
    video: undefined;
  }[],
) {
  await db.insert(exercises).values(formattedData);
}
