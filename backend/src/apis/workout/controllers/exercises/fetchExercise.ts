import { Request, Response } from "express";

export async function fetchExercise(_: Request, res: Response) {
	res.send({ exercise: res.locals.exercise });
}