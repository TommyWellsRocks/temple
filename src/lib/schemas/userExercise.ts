import { z } from "zod";
import { TitleCaseEquipmentEnum, TitleCaseMuscleEnum } from "./types";

export const createUserExerciseSchema = z.object({
  userId: z.string(),
  name: z.string(),
  equipment: TitleCaseEquipmentEnum.array().nullable(),
  primaryMuscle: TitleCaseMuscleEnum.nullable(),
  secondaryMuscles: TitleCaseMuscleEnum.array().nullable(),
});

export const editUserExerciseSchema = z.object({
  userId: z.string(),
  exerciseId: z.number(),
  name: z.string(),
  equipment: TitleCaseEquipmentEnum.array().nullable(),
  primaryMuscle: TitleCaseMuscleEnum.nullable(),
  secondaryMuscles: TitleCaseMuscleEnum.array().nullable(),
});

export const deleteUserExerciseSchema = z.object({
  userId: z.string(),
  exerciseId: z.number(),
});
