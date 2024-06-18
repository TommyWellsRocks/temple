import { Request, Response } from "express";

export function fetchUser(_: Request, res: Response) {
	res.send({ user: res.locals.user });
}
