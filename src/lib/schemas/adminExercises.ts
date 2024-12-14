import { z } from "zod";
import { TitleCaseEquipmentEnum, TitleCaseMuscleEnum } from "./types";

export const adminExercisesSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  equipment: z.array(TitleCaseEquipmentEnum),
  primaryMuscle: TitleCaseMuscleEnum,
  secondaryMuscles: z.array(TitleCaseMuscleEnum),
  video: z.undefined(),
});
