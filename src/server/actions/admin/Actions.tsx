"use server";

import { insertExercises } from "~/server/db/queries/admin/admin";

import { adminExercisesSchema } from "~/lib/schemas/adminExercises";
import { ZodError } from "zod";
import type { FormattedJsonExercise } from "~/server/types";

export async function handleInsertExercises(
  formattedData: FormattedJsonExercise[],
) {
  try {
    await adminExercisesSchema.parseAsync(formattedData);
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercises validation error." };
  }

  const { err } = await insertExercises(formattedData);
  if (err) return { err };

  return { err: null };
}
