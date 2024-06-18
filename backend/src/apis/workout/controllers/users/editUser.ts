import { Request, Response } from "express";
import { updateRows } from "../../../../utils/db";
import { isEmailFormat } from "./functions/isEmailFormat";
import { isPasswordFormat } from "./functions/isPasswordFormat";
import { isRegisteredEmail } from "./functions/isRegisteredEmail";

export async function editUser(req: Request, res: Response) {
	const { newEmail, newPassword } = req.body;

	if (newEmail && newPassword) {
		res.status(403).send({ message: "Too many update requests. Update email OR password." });
	} else if (newEmail) {
		const isValidEmail = isEmailFormat(newEmail);
		if (isValidEmail) {
			const existingUser = await isRegisteredEmail(newEmail);
			if (existingUser) {
				res.status(409).send({
					message: "User email update failed. User email already exists.",
				});
			} else {
				await updateRows("users", { email: newEmail }, { id: res.locals.user.id });
				res.send({ message: "User email updated successfully." });
			}
		} else {
			res.status(400).send({ message: "User email update failed. Invalid email." });
		}
	} else if (newPassword) {
		const isValidPassword = isPasswordFormat(newPassword);
		if (isValidPassword) {
			await updateRows("users", { password: newPassword }, { id: res.locals.user.id });
			res.send({ message: "User password updated successfully." });
		} else {
			res.status(400).send({ message: "User password update failed. Invalid password." });
		}
	}
}
