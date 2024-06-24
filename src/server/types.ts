import { z } from "zod";
import { db } from "./db";

export interface WorkoutItem {
  exerciseId: number;
  reps: number[];
  weight: number[];
}

export const workoutItemSchema = z.object({
  exerciseId: z
    .number()
    .nonnegative()
    .refine((exerciseId) =>
      db.query.exercises.findFirst({
        where: (model, { eq }) => eq(model.id, exerciseId),
      }),
    ),
  reps: z.number().nonnegative().array(),
  weight: z.number().nonnegative().array(),
});

export interface DailyMacros {
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
}
