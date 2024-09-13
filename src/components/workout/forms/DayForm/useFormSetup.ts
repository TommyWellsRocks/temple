import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProgramDay } from "~/server/types";

export const formSchema = z.object({
  name: z.string().max(30, {
    message: "Day name must be less than 30 characters.",
  }),
  repeatOn: z.array(z.number()).optional(),
});

export function useFormSetup(dayInfo: ProgramDay) {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: dayInfo ? dayInfo.name : "",
      repeatOn: dayInfo?.repeatOn != null ? dayInfo.repeatOn : [1],
    },
  });
}
