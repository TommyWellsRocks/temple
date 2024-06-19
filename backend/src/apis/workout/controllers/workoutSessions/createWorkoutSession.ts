import { Request, Response } from "express";
import { newWorkoutSession } from "../../../../interfaces/newWorkoutSession";
import { insertRows } from "../../../../utils/db";
import { isWorkoutSessionFormat } from "./functions/isWorkoutSessionFormat";

export async function createWorkoutSession(req: Request, res: Response) {
	const { workout_items } = req.body;

	const newWorkoutSessionObject: newWorkoutSession = {
		user_id: req.user!.id,
		workout_items,
	};

	const errorMessage = isWorkoutSessionFormat(newWorkoutSessionObject);

	if (errorMessage) {
		return res.status(409).send({
			message: `Workout Session creation failed due to: [${errorMessage}].`,
		});
	} else {
		await insertRows("workout_sessions", newWorkoutSessionObject);
		return res.status(201).send({ message: "Workout Session created successfully." });
	}
}
