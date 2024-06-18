import { Request, Response, NextFunction } from "express";
import { selectRows } from "../../../../../utils/db";
import { isEmailFormat } from "../functions/isEmailFormat";
import { isPasswordFormat } from "../functions/isPasswordFormat";

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
	const { email, password } = req.body;
	const validEmailFormat = isEmailFormat(email);
	const validPasswordFormat = isPasswordFormat(password);

	if (validEmailFormat && validPasswordFormat) {
		const isUser = await selectRows("users", { email, password }, 1);
		if (isUser) {
			res.locals.user = isUser;
			return next();
		}
	}
	res.status(401).send({ message: "Unauthorized. Invalid email or password." });
}
