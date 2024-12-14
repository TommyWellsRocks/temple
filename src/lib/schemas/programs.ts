import { z } from "zod";

export const getProgramSchema = z.object({
  userId: z.string(),
  programId: z.number(),
});

export const createProgramSchema = z.object({
  userId: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export const updateProgramSchema = z.object({
  userId: z.string(),
  programId: z.number(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});
