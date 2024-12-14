import "server-only";

import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";
import { auth } from "~/server/auth";

export async function getUserSettings() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  try {
    return {
      value: await db.query.users.findFirst({
        columns: {
          redirectOnLoadWorkout: true,
          weightInPounds: true,
        },
        where: (model, { eq }) => eq(model.id, userId),
      }),
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting settings from DB." };
  }
}

export async function toggleRedirectWorkout(toggleValue: boolean) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

  try {
    await db
      .update(users)
      .set({ redirectOnLoadWorkout: toggleValue })
      .where(eq(users.id, userId));
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error updating redirectWorkout in DB." };
  }
  return { err: null };
}
