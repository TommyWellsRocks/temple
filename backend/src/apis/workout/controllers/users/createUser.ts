import { Request, Response } from "express";
import { isRegisteredEmail } from "./functions/isRegisteredEmail";
import { isEmailFormat } from "./functions/isEmailFormat";
import { isPasswordFormat } from "./functions/isPasswordFormat";
import { insertRows } from "../../../../utils/db";

export async function createUser(req: Request, res: Response) {
	const { email, password } = req.body;

	const isValidEmail = isEmailFormat(email);
	const isValidPassword = isPasswordFormat(password);

	if (isValidEmail && isValidPassword) {
		const isUserEmail = await isRegisteredEmail(email);
		if (isUserEmail) {
			res.status(409).send({ message: "User already exists. Please login." });
		} else {
			await insertRows("users", { email, password });
			res.status(201).send({ message: "User created successfully." });
		}
	} else if (!isValidEmail) {
		res.status(400).send({ message: "Invalid email. Please try something different." });
	} else if (!isValidPassword) {
		res.status(400).send({
			message: "Invalid password length. Please try something different.",
		});
	}
}
