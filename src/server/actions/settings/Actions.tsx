"use server";

import { ZodError } from "zod";
import { settingsSchema } from "~/lib/schemas/settings";
import { auth } from "~/server/auth";
import { toggleRedirectWorkout } from "~/server/db/queries/settings/settings";

export async function handleToggleRedirectWorkout(toggleValue: boolean) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

  try {
    await settingsSchema.parseAsync({ userId, toggleValue });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercises validation error." };
  }

  const { err } = await toggleRedirectWorkout(toggleValue);
  if (err) return { err };

  return { err: null };
}
