"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { sheerSchema } from "~/lib/schemas/sheer";
import { auth } from "~/server/auth";
import { postTodaysResponse } from "~/server/db/queries/sheer/sheer";

export async function handlePostTodaysResponse(
  response: boolean,
  why?: string,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { err: "Authentication error." };

  try {
    await sheerSchema.parseAsync({ userId, response, why });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Exercises validation error." };
  }

  const { err } = await postTodaysResponse(response, why);
  if (err) return { err };

  revalidatePath(`/sheer`);
  return { err: null };
}
