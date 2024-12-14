import "server-only";

import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export async function getUserSettings(userId: string) {
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

export async function toggleRedirectWorkout(
  userId: string,
  toggleValue: boolean,
) {
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
