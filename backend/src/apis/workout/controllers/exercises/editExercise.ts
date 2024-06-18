import { Request, Response } from "express";
import { newExercise } from "../../../../interfaces/newExercise";
import { isExerciseFormat } from "./functions/isExerciseFormat";
import { updateRows } from "../../../../utils/db";

export async function editExercise(req: Request, res: Response) {
	const {
		new_name,
		new_category,
		new_primary_muscles,
		new_instructions,
		new_tips,
		new_is_single_arm_based,
		new_is_single_leg_based,
		new_secondary_muscles,
		new_target_muscle_images,
		new_images,
		new_videos,
		new_creation_notes,
	} = req.body;

	const newExerciseObject: newExercise = {
		name: new_name,
		category: new_category,
		primary_muscles: new_primary_muscles,
		instructions: new_instructions,
		tips: new_tips,
		author_id: res.locals.user.id,
		is_single_arm_based: new_is_single_arm_based,
		is_single_leg_based: new_is_single_leg_based,
		secondary_muscles: new_secondary_muscles,
		target_muscle_images: new_target_muscle_images,
		images: new_images,
		videos: new_videos,
		creation_notes: new_creation_notes,
	};

	const errorMessage = isExerciseFormat(newExerciseObject);

	if (errorMessage) {
		res.status(409).send({ message: `Exercise update failed due to: [${errorMessage}].` });
	} else {
		await updateRows("exercises", newExerciseObject, { id: res.locals.exercise.id });
		res.send({ message: "Exercise updated successfully." });
	}
}
