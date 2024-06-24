import "server-only";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { validateNewEmail, validatePassword } from "./utils/usersValidation";

export async function createUser(email: string, password: string) {
  const validEmail = await validateNewEmail(email);
  const validPassword = validatePassword(password);

  if (validEmail.success && validPassword.success)
    await db
      .insert(users)
      .values({ email: validEmail.data, password: validPassword.data });
  else if (!validEmail.success) return validEmail.error.errors[0]!.message;
  else return validPassword.error!.errors[0]!.message;
}

export async function deleteUser(id: number) {
  await db.delete(users).where(eq(users.id, id));
}

export async function editUser(
  id: number,
  newEmail?: string,
  newPassword?: string,
) {
  if (newEmail) {
    const validEmail = await validateNewEmail(newEmail);
    if (validEmail.success)
      await db
        .update(users)
        .set({ password: validEmail.data, updatedAt: new Date() })
        .where(eq(users.id, id));
    else return validEmail.error.errors[0]!.message;
  }
  if (newPassword) {
    const validPassword = validatePassword(newPassword);
    if (validPassword.success)
      await db
        .update(users)
        .set({ password: validPassword.data, updatedAt: new Date() })
        .where(eq(users.id, id));
    else return validPassword.error.errors[0]!.message;
  }
}

export async function getUser(id: number) {
  return await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
}
