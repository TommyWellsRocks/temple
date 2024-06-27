import { z } from "zod";
import { db } from "./db";

export interface ExerciseObject {
  name: string;
  category: string;
  primaryMuscles: string[];
  secondaryMuscles?: string[];
  instructions: string[];
  tips: string;
  isSingleArmBased?: boolean;
  isSingleLegBased?: boolean;
  targetMuscleImages?: string[];
  images?: string[];
  videos?: string[];
  updatedAt?: Date;
}

export const exerciseObjectSchema = z.object({
  name: z.string(),
  category: z.string(),
  primaryMuscles: z.string().array(),
  secondaryMuscles: z.string().array().optional(),
  instructions: z.string().array(),
  tips: z.string(),
  isSingleArmBased: z.boolean().optional(),
  isSingleLegBased: z.boolean().optional(),
  targetMuscleImages: z.string().array().optional(),
  images: z.string().array().optional(),
  videos: z.string().array().optional(),
  updatedAt: z.date().optional(),
});

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

export interface WorkoutSession {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  workoutItems: WorkoutItem[];
}

export interface WorkoutPlan {
  updatedAt: Date;
  id: number;
  createdAt: Date;
  userId: number;
  workoutItems: WorkoutItem[];
  nextOccurrenceDate: string | null;
  activeThroughDate: string | null;
}

export interface Exercise {
  id: number;
  name: string;
  category: string;
  primaryMuscles: string[];
  secondaryMuscles: string[] | null;
  instructions: string[];
  tips: string;
  isSingleArmBased: boolean | null;
  isSingleLegBased: boolean | null;
  targetMuscleImages: string[] | null;
  images: string[] | null;
  videos: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}
