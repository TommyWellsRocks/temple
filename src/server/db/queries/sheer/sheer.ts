import "server-only";
import { ZodError } from "zod";
import { userSchema } from "~/lib/schemas/user";
import { auth } from "~/server/auth";

import { db } from "~/server/db";
import { sheerResponses } from "~/server/db/schema";

export async function getTodaysResponse() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  try {
    await userSchema.parseAsync({ userId });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "UserId validation error." };
  }

  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
  const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

  try {
    const val = await db.query.sheerResponses.findFirst({
      columns: { response: true },
      where: (model, { and, eq, gte, lte }) =>
        and(
          eq(model.userId, userId),
          gte(model.date, todayStart),
          lte(model.date, todayEnd),
        ),
    });
    return {
      value: val?.response,
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting today's response from DB." };
  }
}

export async function postTodaysResponse(response: boolean, why?: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

  try {
    await db.insert(sheerResponses).values({ userId, response, why });
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error inserting sheerResponse to DB." };
  }
  return { err: null };
}

export async function getWinStreak() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  try {
    await userSchema.parseAsync({ userId });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "UserId validation error." };
  }

  let responses: {
    date: Date;
  }[];
  let contiguousWins = 0;
  try {
    responses = await db.query.sheerResponses.findMany({
      columns: { date: true },
      where: (model, { and, eq }) =>
        and(eq(model.userId, userId), eq(model.response, true)),
      orderBy: (model, { desc }) => desc(model.date),
    });
  } catch (err: any) {
    console.error(err.message);
    return { value: contiguousWins, err: "Error getting responses from DB." };
  }
  if (responses.length === 0) return { value: contiguousWins, err: null };

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const { date } of responses) {
    const resDate = new Date(date);
    resDate.setHours(0, 0, 0, 0);

    if (resDate.getTime() === currentDate.getTime()) {
      currentDate.setDate(currentDate.getDate() + 1);
      contiguousWins++;
    } else return { value: contiguousWins, err: null };
  }

  return { value: contiguousWins, err: null };
}
