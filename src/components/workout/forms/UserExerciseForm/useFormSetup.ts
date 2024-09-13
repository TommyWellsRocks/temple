import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
  name: z.string().max(75, {
    message: "Exercise name must be less than 75 characters.",
  }),
  equipment: z.string().optional(),
  primaryMuscle: z.string().optional(),
  secondaryMuscles: z.string().optional(),
});

export function useFormSetup() {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
}
