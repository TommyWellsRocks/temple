import "server-only";

import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export async function getWorkoutRedirect(userId: string) {
  const shouldRedirect = await db.query.users.findFirst({
    columns: { redirectOnLoadWorkout: true, lastWorkoutRedirect: true },
    where: (model, { eq }) => eq(model.id, userId),
  });
  // Stop If Shouldn't Redirect
  if (!shouldRedirect?.redirectOnLoadWorkout) return;

  const today = new Date();

  // Stop If Redirected Already Today
  if (shouldRedirect.lastWorkoutRedirect) {
    const lastRedirect = new Date(shouldRedirect.lastWorkoutRedirect);
    today.setHours(0, 0, 0, 0);
    lastRedirect.setHours(0, 0, 0, 0);
    if (today.getDate() === lastRedirect.getDate()) return;
  }

  // Stop If No Scheduled Program
  const activeProgram = await db.query.workoutPrograms.findFirst({
    columns: { id: true },
    where: (model, { and, eq, lte, gte }) =>
      and(
        eq(model.userId, userId),
        lte(model.startDate, today),
        gte(model.endDate, today),
      ),
    with: {
      groups: {
        columns: {},
        with: {
          groupDays: {
            columns: { repeatOn: true, id: true },
            with: { dayExercises: { columns: { reps: true } } },
          },
        },
      },
    },
  });
  if (!activeProgram) return;

  // Will Return Redirect, So Input Into DB
  await db
    .update(users)
    .set({ lastWorkoutRedirect: new Date() })
    .where(eq(users.id, userId));

  // Stop If No Scheduled Day
  const todayDay = today.getDay();
  const finalGroupScheduledDay = activeProgram.groups[
    activeProgram.groups.length - 1
  ]!.groupDays.find((day) => day.repeatOn?.includes(todayDay));
  if (!finalGroupScheduledDay) return `workout/${activeProgram.id}`;

  // If Complete, Start New Group And Return Day
  // const dayComplete = finalGroupScheduledDay.dayExercises.find(
  //   (ex) => !ex.reps.includes(0),
  // );
  // if (dayComplete) {
  //   const newGroupId = (await createDayGroup(userId, activeProgram.id))[0]!
  //     .newGroupId;
  //   const groupDays = (await db.query.workoutProgramDayGroups.findFirst({
  //     columns: {},
  //     where: (model, { eq }) => eq(model.id, newGroupId),
  //     with: {
  //       groupDays: { columns: { id: true, repeatOn: true } },
  //     },
  //   }))!.groupDays;
  //   const newGroupDayId = groupDays.find((day) =>
  //     day.repeatOn?.includes(todayDay),
  //   )!.id;
  //   return `/workout/${activeProgram.id}/${newGroupDayId}`;
  // }

  // Return Day
  return `/workout/${activeProgram.id}/${finalGroupScheduledDay.id}`;
}
