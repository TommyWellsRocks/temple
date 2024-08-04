"use server";

import { revalidatePath } from "next/cache";
import { postTodaysResponse } from "~/server/queries/sheer";

export async function handlePostTodaysResponse(
  userId: string,
  response: boolean,
  why?: string
) {
  await postTodaysResponse(userId, response, why);
  revalidatePath(`/sheer`);
}
