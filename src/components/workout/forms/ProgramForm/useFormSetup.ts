import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Program } from "~/server/types";
import { addDays } from "date-fns";

const PROGRAM_ACTIVE_DAYS = 45;

export const formSchema = z.object({
  name: z.string().max(20, {
    message: "Program name must be less than 20 characters.",
  }),
  start: z.date(),
  end: z.date(),
});

export function useFormSetup(programInfo: Program) {
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
