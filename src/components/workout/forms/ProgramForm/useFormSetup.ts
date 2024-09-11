import { useForm } from "react-hook-form";

import { z } from "zod";
import { addDays } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";

import type { WorkoutPrograms } from "~/server/types";

const PROGRAM_ACTIVE_DAYS = 45;

export const formSchema = z.object({
  name: z.string().max(20, {
    message: "Program name must be less than 20 characters.",
  }),
  start: z.date(),
  end: z.date(),
});

export function useFormSetup(programInfo?: WorkoutPrograms[0]) {
  const today = new Date();
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: programInfo ? programInfo.name : "",
      start: programInfo ? addDays(new Date(programInfo.startDate), 1) : today,
      end: programInfo
        ? addDays(new Date(programInfo.endDate), 1)
        : addDays(today, PROGRAM_ACTIVE_DAYS),
    },
  });
}
