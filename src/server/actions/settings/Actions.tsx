"use server";

import { toggleRedirectWorkout } from "~/server/db/queries/settings/settings";

export async function handleToggleRedirectWorkout(
  userId: string,
  toggleValue: boolean,
) {
  await toggleRedirectWorkout(userId, toggleValue);
}
