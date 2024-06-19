import { Request, Response } from "express";
import { isRegisteredEmail } from "./functions/isRegisteredEmail";
import { isEmailFormat } from "./functions/isEmailFormat";
import { isPasswordFormat } from "./functions/isPasswordFormat";
import { insertRows, selectRows } from "../../../../utils/db";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { users } from "../../../../interfaces/tableColumns";

export async function createUser(req: Request, res: Response) {
	const { email, password } = req.body;

	const isValidEmail = isEmailFormat(email);
	const isValidPassword = isPasswordFormat(password);

	if (isValidEmail && isValidPassword) {
		const isUserEmail = await isRegisteredEmail(email);
		if (isUserEmail) {
			return res.status(409).send({ message: "User already exists. Please login." });
		} else {
			await insertRows("users", { email, password });
			const isUser = (await selectRows("users", { email, password })) as users;
			const token = jwt.sign({ id: isUser.id }, process.env.SECRET_KEY!, { expiresIn: "7d" });
			// Return As Cookie
			res.cookie("api-auth-token", token, {
				httpOnly: true,
				secure: false,
				expires: dayjs().add(7, "days").toDate(),
				sameSite: "strict",
			});
			return res.status(201).send({ message: "User created successfully." });
		}
	} else if (!isValidEmail) {
		return res.status(400).send({ message: "Invalid email. Please try something different." });
	} else if (!isValidPassword) {
		return res.status(400).send({
			message: "Invalid password length. Please try something different.",
		});
	}
}
