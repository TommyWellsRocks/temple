import { z } from "zod";

export const getExerciseSchema = z.object({
  userId: z.string(),
  dayExerciseId: z.number(),
});

export const addExerciseSchema = z.object({
  userId: z.string(),
  programId: z.number(),
  groupId: z.number(),
  dayId: z.number(),
  exerciseId: z.number(),
});

export const editExerciseNameSchema = z.object({
  userId: z.string(),
  exerciseId: z.number(),
  newName: z.string(),
  noteId: z.number().optional(),
});

export const deleteExerciseSchema = z.object({
  userId: z.string(),
  dayExerciseId: z.number(),
});

export const startEndWorkoutSchema = z.object({
  userId: z.string(),
  dayId: z.number(),
});
