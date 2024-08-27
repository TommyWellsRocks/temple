"use server";

import { toggleRedirectWorkout } from "~/server/queries/settings";

export async function handleToggleRedirectWorkout(
  userId: string,
  toggleValue: boolean,
) {
  await toggleRedirectWorkout(userId, toggleValue);
}
