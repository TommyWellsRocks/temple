import { Request, Response } from "express";
import { newWorkoutSession } from "../../../../interfaces/newWorkoutSession";
import { isWorkoutSessionFormat } from "./functions/isWorkoutSessionFormat";
import { updateRows } from "../../../../utils/db";

export async function editWorkoutSession(req: Request, res: Response) {
	const { newWorkoutItems } = req.body;

	const workoutSessionObject: newWorkoutSession = {
		user_id: req.user!.id,
		workout_items: newWorkoutItems,
	};

	const errorMessage = isWorkoutSessionFormat(workoutSessionObject);

	if (errorMessage) {
		return res.status(409).send({ message: `Workout Session update failed due to: [${errorMessage}].` });
	} else {
		await updateRows("workout_sessions", workoutSessionObject, {
			id: req.workoutSession!.id,
		});
		return res.send({ message: "Workout Session updated successfully." });
	}
}
