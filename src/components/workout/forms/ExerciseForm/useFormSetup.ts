import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
  name: z.string(),
});

export function useFormSetup() {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
}
