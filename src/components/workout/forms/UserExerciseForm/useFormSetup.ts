import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipment, muscles } from "doNotChangeMe";

const equipmentOptions = Object.values(equipment);
const musclesOptions = Object.values(muscles);

export const formSchema = z.object({
  name: z.string().min(2).max(75, {
    message: "Exercise name must be less than 75 characters.",
  }),
  equipment: z
    .string()
    .array()
    .optional()
    .refine(
      (value) =>
        value?.length
          ? value.filter((e) => !equipmentOptions.includes(e)).length === 0
          : true,
      {
        message: "Equipment not found.",
      },
    ),
  primaryMuscle: z
    .string()
    .optional()
    .refine((value) => (value ? musclesOptions.includes(value) : true), {
      message: "Muscle not found.",
    }),
  secondaryMuscles: z
    .string()
    .array()
    .optional()
    .refine(
      (value) =>
        value?.length
          ? value.filter((m) => !musclesOptions.includes(m)).length === 0
          : true,
      {
        message: "Muscle not found.",
      },
    ),
});

export function useFormSetup() {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
}
