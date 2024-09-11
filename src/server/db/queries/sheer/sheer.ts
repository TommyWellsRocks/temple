import "server-only";

import { db } from "~/server/db";
import { sheerResponses } from "~/server/db/schema";

export async function getTodaysResponse(userId: string) {
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
  const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

  return await db.query.sheerResponses.findFirst({
    columns: { response: true },
    where: (model, { and, eq, gte, lte }) =>
      and(
        eq(model.userId, userId),
        gte(model.date, todayStart),
        lte(model.date, todayEnd),
      ),
  });
}

export async function postTodaysResponse(
  userId: string,
  response: boolean,
  why?: string,
) {
  await db.insert(sheerResponses).values({ userId, response, why });
}

export async function getWinStreak(userId: string) {
  const responses = await db.query.sheerResponses.findMany({
    columns: { date: true },
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.response, true)),
    orderBy: (model, { desc }) => desc(model.date),
  });
  let contiguousWins = 0;
  if (responses.length === 0) return contiguousWins;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const { date } of responses) {
    const resDate = new Date(date);
    resDate.setHours(0, 0, 0, 0);

    if (resDate.getTime() === currentDate.getTime()) {
      currentDate.setDate(currentDate.getDate() + 1);
      contiguousWins++;
    } else return contiguousWins;
  }

  return contiguousWins;
}
