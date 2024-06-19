import { Request, Response, NextFunction } from "express";
import { selectRows } from "../../../../../utils/db";
import { workout_sessions } from "../../../../../interfaces/tableColumns";

export async function authenticateWorkoutSession(req: Request, res: Response, next: NextFunction) {
	const { id } = req.body;
	const workoutSession = await selectRows("workout_session", { id, user_id: req.user!.id }, 1) as workout_sessions;

	if (workoutSession) {
		req.workoutSession = workoutSession;
		return next();
	} else {
		return res.status(401).send({ message: "Unauthorized. Invalid user_id or session id." });
	}
}
