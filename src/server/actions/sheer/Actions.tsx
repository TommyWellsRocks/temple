"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { sheerSchema } from "~/lib/schemas/sheer";
import { postTodaysResponse } from "~/server/db/queries/sheer/sheer";

export async function handlePostTodaysResponse(
  userId: string,
  response: boolean,
  why?: string,
) {
  try {
    await sheerSchema.parseAsync({ userId, response, why });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercises validation error." };
  }

  const { err } = await postTodaysResponse(userId, response, why);
  if (err) return { err };

  revalidatePath(`/sheer`);
  return { err: null };
}
