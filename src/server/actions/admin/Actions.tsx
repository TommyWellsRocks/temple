"use server";

import { insertExercises } from "~/server/db/queries/admin/admin";

import { adminExercisesSchema } from "~/lib/schemas/adminExercises";
import { ZodError } from "zod";
import type { FormattedJsonExercise } from "~/server/types";
import { auth } from "~/server/auth";

export async function handleInsertExercises(
  formattedData: FormattedJsonExercise[],
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

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
