import { z } from "zod";

export const exerciseVolumeSchema = z.object({
  dayExerciseId: z.number(),
  userId: z.string(),
  reps: z.number().array(),
  weight: z.number().array(),
});

export const exerciseSetsSchema = z.object({
  dayExerciseId: z.number(),
  userId: z.string(),
  reps: z.number().array(),
  weight: z.number().array(),
  loggedSetsCount: z.number(),
});

export const exerciseLoggedSetsSchema = z.object({
  dayExerciseId: z.number(),
  userId: z.string(),
  loggedSetsCount: z.number(),
});

export const exerciseNoteSchema = z.object({
  userId: z.string(),
  exerciseId: z.number(),
  noteValue: z.string(),
  noteId: z.number().optional(),
});
