"use server";

import { ZodError } from "zod";
import { settingsSchema } from "~/lib/schemas/settings";
import { toggleRedirectWorkout } from "~/server/db/queries/settings/settings";

export async function handleToggleRedirectWorkout(
  userId: string,
  toggleValue: boolean,
) {
  try {
    await settingsSchema.parseAsync({ userId, toggleValue });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercises validation error." };
  }

  const { err } = await toggleRedirectWorkout(userId, toggleValue);
  if (err) return { err };

  return { err: null };
}
