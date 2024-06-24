import { z } from "zod";
import { db } from "~/server/db";

export async function validateNewEmail(email: string) {
  return await z
    .string()
    .email()
    .refine(async (email) => {
      const existingUser = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.email, email),
      });
      return !existingUser;
    }, "Email already exists")
    .safeParseAsync(email);
}

export function validatePassword(password: string) {
  return z.string().min(9).safeParse(password);
}
