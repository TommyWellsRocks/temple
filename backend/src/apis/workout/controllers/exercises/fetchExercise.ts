import { Request, Response } from "express";

export async function fetchExercise(req: Request, res: Response) {
	res.send({ exercise: req.exercise });
}