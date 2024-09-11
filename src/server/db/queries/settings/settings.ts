import "server-only";

import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export async function getUserSettings(userId: string) {
  return await db.query.users.findFirst({
    columns: {
      redirectOnLoadWorkout: true,
      weightInPounds: true,
    },
    where: (model, { eq }) => eq(model.id, userId),
  });
}

export async function toggleRedirectWorkout(
  userId: string,
  toggleValue: boolean,
) {
  await db
    .update(users)
    .set({ redirectOnLoadWorkout: toggleValue })
    .where(eq(users.id, userId));
}
