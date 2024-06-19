import { Request, Response } from "express";
import { newExercise } from "../../../../interfaces/newExercise";

import { isExerciseFormat } from "./functions/isExerciseFormat";
import { insertRows } from "../../../../utils/db";

export async function createExercise(req: Request, res: Response) {
	const {
		name,
		category,
		primary_muscles,
		instructions,
		tips,
		is_single_arm_based,
		is_single_leg_based,
		secondary_muscles,
		target_muscle_images,
		images,
		videos,
		creation_notes,
	} = req.body;

	const newExerciseObject: newExercise = {
		name,
		category,
		primary_muscles,
		instructions,
		tips,
		author_id: req.user!.id,
		is_single_arm_based,
		is_single_leg_based,
		secondary_muscles,
		target_muscle_images,
		images,
		videos,
		creation_notes,
	};

	const errorMessage = isExerciseFormat(newExerciseObject);

	if (errorMessage) {
		res.status(409).send({ message: `Exercise creation failed due to: [${errorMessage}].` });
	} else {
		await insertRows("exercises", newExerciseObject);
		res.status(201).send({ message: "Exercise created successfully." });
	}
}
