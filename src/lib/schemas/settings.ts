import { z } from "zod";

export const settingsSchema = z.object({
  userId: z.string(),
  toggleValue: z.boolean(),
});
