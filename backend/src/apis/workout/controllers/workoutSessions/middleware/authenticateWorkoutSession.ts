import { Request, Response, NextFunction } from "express";
import { selectRows } from "../../../../../utils/db";

export async function authenticateWorkoutSession(req: Request, res: Response, next: NextFunction) {
	const { id, user_id } = req.body;
	const workoutSession = await selectRows("workout_session", { id, user_id }, 1);

	if (workoutSession) {
		res.locals.workoutSession = workoutSession;
		return next();
	} else {
		res.status(401).send({ message: "Unauthorized. Invalid user_id or session id." });
	}
}
