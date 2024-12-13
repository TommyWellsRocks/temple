import { z } from "zod";

export const getProgramSchema = z.object({
  userId: z.string(),
  dayId: z.number(),
});

export const createUpdateDaySchema = z.object({
  userId: z.string(),
  programId: z.number(),
  groupId: z.number(),
  name: z.string(),
  repeatOn: z.number().array().nullable(),
});

export const deleteDaySchema = z.object({
  userId: z.string(),
  programId: z.number(),
  dayId: z.number(),
});

export const getWeekSchema = z.object({
  userId: z.string(),
  groupId: z.number(),
});

export const createWeekSchema = z.object({
  userId: z.string(),
  programId: z.number(),
});

export const deleteWeekSchema = z.object({
  userId: z.string(),
  programId: z.number(),
  groupId: z.number(),
})