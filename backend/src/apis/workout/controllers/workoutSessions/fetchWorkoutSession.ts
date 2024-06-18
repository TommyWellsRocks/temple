import { Request, Response } from "express";

export function fetchWorkoutSession(_: Request, res: Response) {
	res.send({ workout_session: res.locals.workoutSession });
}
