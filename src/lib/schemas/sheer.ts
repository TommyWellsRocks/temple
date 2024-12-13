import { z } from "zod";

export const sheerSchema = z.object({
  userId: z.string(),
  response: z.boolean(),
  why: z.string().optional(),
});
