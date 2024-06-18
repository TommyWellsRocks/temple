import { Request, Response } from "express";
import { newWorkoutSession } from "../../../../interfaces/newWorkoutSession";
import { isWorkoutSessionFormat } from "./functions/isWorkoutSessionFormat";
import { updateRows } from "../../../../utils/db";

export async function editWorkoutSession(req: Request, res: Response) {
	const { newWorkoutItems } = req.body;

	const workoutSessionObject: newWorkoutSession = {
		user_id: res.locals.user.id,
		workout_items: newWorkoutItems,
	};

	const errorMessage = isWorkoutSessionFormat(workoutSessionObject);

	if (errorMessage) {
		res.status(409).send({ message: `Workout Session update failed due to: [${errorMessage}].` });
	} else {
		await updateRows("workout_sessions", workoutSessionObject, {
			id: res.locals.workoutSession.id,
		});
		res.send({ message: "Workout Session updated successfully." });
	}
}
