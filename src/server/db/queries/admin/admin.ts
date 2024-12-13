import "server-only";

import { db } from "~/server/db";
import { exercises } from "~/server/db/schema";

import type { FormattedJsonExercise } from "~/server/types";

export async function insertExercises(formattedData: FormattedJsonExercise[]) {
  try {
    await db.insert(exercises).values(formattedData);
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error inserting exercises to DB." };
  }
  return { err: null };
}
