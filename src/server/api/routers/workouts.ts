import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getMyWorkouts } from "~/server/queries/workouts";

const inputSchema = z.object({
  "0": z.object({
    json: z.object({
      userId: z.string(),
    }),
  }),
});

export const workoutsRouter = createTRPCRouter({
  getMyWorkouts: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({input}) => {
      return await getMyWorkouts(input.userId);
    }),
});
