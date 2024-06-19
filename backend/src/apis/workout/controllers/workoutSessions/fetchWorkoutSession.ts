import { Request, Response } from "express";

export function fetchWorkoutSession(req: Request, res: Response) {
	return res.send({ workout_session: req.workoutSession! });
}
