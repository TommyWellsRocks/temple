import { Request, Response, NextFunction } from "express";
import { env } from "../../../../../utils/env";
import jwt from "jsonwebtoken";
env();

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies["api-auth-token"];

	if (!token) {
		return res.status(401).send({ message: "Unauthorized. No token provided." });
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: number };
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).send({ message: "Unauthorized. Invalid token." });
	}
}
