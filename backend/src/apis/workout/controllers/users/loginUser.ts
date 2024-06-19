import { Request, Response } from "express";
import { isEmailFormat } from "./functions/isEmailFormat";
import { isPasswordFormat } from "./functions/isPasswordFormat";
import { selectRows } from "../../../../utils/db";
import { users } from "../../../../interfaces/tableColumns";
import { env } from "../../../../utils/env";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
env();

export async function loginUser(req: Request, res: Response) {
	const { email, password } = req.body as { email: string; password: string };
	const validEmailFormat = isEmailFormat(email);
	const validPasswordFormat = isPasswordFormat(password);

	if (validEmailFormat && validPasswordFormat) {
		const isUser = (await selectRows("users", { email, password }, 1)) as users;
		if (isUser) {
			// Gen Token
			const token = jwt.sign({ id: isUser.id }, process.env.SECRET_KEY!, { expiresIn: "7d" });
			// Return As Cookie
			res.cookie("api-auth-token", token, {
				httpOnly: true,
				secure: false,
				expires: dayjs().add(7, "days").toDate(),
				sameSite: "strict"
			});
			return res.send({ message: "Login successful." });
		}
	}
	return res.status(401).send({ message: "Unauthorized. Invalid email or password." });
}
