import { newExercise, exerciseCategories, muscles } from "../../../../../interfaces/newExercise";
import { selectRows } from "../../../../../utils/db";
import { isValidURL } from "../../../../../utils/isValidURL";

export async function isExerciseFormat(exerciseObject: newExercise) {
	let errorMessage: string[] = [];

	// name | Required
	if (exerciseObject.name) {
		if (typeof exerciseObject.name === "string") {
			const existingExercise = await selectRows(
				"exercises",
				{ name: exerciseObject.name },
				1
			);
			if (existingExercise) {
				errorMessage.push("name must be unique.");
			}
		} else {
			errorMessage.push("name must be a string.");
		}
	} else {
		errorMessage.push("Missing name.");
	}

	// category | Required
	if (exerciseObject.category) {
		if (typeof exerciseObject.category === "string") {
			if (!exerciseCategories.includes(exerciseObject.category)) {
				errorMessage.push(`category must be from: ${exerciseCategories}`);
			}
		} else {
			errorMessage.push("category must be a string.");
		}
	} else {
		errorMessage.push("Missing category.");
	}

	// primary_muscles | Required
	if (exerciseObject.primary_muscles) {
		for (let i = 0; i <= exerciseObject.primary_muscles.length; i++) {
			if (typeof exerciseObject.primary_muscles[i] === "string") {
				if (!muscles.includes(exerciseObject.primary_muscles[i])) {
					errorMessage.push(`primary_muscles must be from: ${muscles}`);
					break;
				}
			} else {
				errorMessage.push("primary_muscles must contain strings.");
				break;
			}
		}
	} else {
		errorMessage.push("Missing primary_muscles.");
	}

	// instructions | Required
	if (exerciseObject.instructions) {
		for (let i = 0; i <= exerciseObject.instructions.length; i++) {
			if (!(typeof exerciseObject.instructions[i] === "string")) {
				errorMessage.push("instructions must be contain strings.");
				break;
			}
		}
	} else {
		errorMessage.push("Missing instructions.");
	}

	// tips | Required
	if (exerciseObject.tips) {
		if (!(typeof exerciseObject.tips === "string")) {
			errorMessage.push("tips must be a string.");
		}
	} else {
		errorMessage.push("Missing tips.");
	}

	// is_single_arm_based
	if (exerciseObject.is_single_arm_based) {
		if (!(typeof exerciseObject.is_single_arm_based === "boolean")) {
			errorMessage.push("is_single_arm_based must be a boolean.");
		}
	}

	// is_single_leg_based
	if (exerciseObject.is_single_leg_based) {
		if (!(typeof exerciseObject.is_single_leg_based === "boolean")) {
			errorMessage.push("is_single_leg_based must be a boolean.");
		}
	}

	// secondary_muscles
	if (exerciseObject.secondary_muscles) {
		for (let i = 0; i <= exerciseObject.secondary_muscles.length; i++) {
			if (typeof exerciseObject.secondary_muscles[i] === "string") {
				if (!muscles.includes(exerciseObject.secondary_muscles[i])) {
					errorMessage.push(`secondary_muscles must be from: ${muscles}`);
					break;
				}
			} else {
				errorMessage.push("secondary_muscles must contain strings.");
				break;
			}
		}
	}

	// target_muscle_images
	if (exerciseObject.target_muscle_images) {
		for (let i = 0; i <= exerciseObject.target_muscle_images.length; i++) {
			if (typeof exerciseObject.target_muscle_images[i] === "string") {
				if (!isValidURL(exerciseObject.target_muscle_images[i])) {
					errorMessage.push("target_muscle_images must contain valid urls.");
					break;
				}
			} else {
				errorMessage.push("target_muscle_images must contain strings.");
				break;
			}
		}
	}

	// images
	if (exerciseObject.images) {
		for (let i = 0; i <= exerciseObject.images.length; i++) {
			if (typeof exerciseObject.images[i] === "string") {
				if (!isValidURL(exerciseObject.images[i])) {
					errorMessage.push("images must contain valid urls.");
					break;
				}
			} else {
				errorMessage.push("images must contain strings.");
				break;
			}
		}
	}

	// videos
	if (exerciseObject.videos) {
		for (let i = 0; i <= exerciseObject.videos.length; i++) {
			if (typeof exerciseObject.videos[i] === "string") {
				if (!isValidURL(exerciseObject.videos[i])) {
					errorMessage.push("videos must contain valid urls.");
					break;
				}
			} else {
				errorMessage.push("videos must contain strings.");
				break;
			}
		}
	}

	// creation_notes
	if (exerciseObject.creation_notes) {
		if (!(typeof exerciseObject.creation_notes === "string")) {
			errorMessage.push("creation_notes must be a string.");
		}
	}

	// Eventually, contains bad words, AI check makes sense/generate

	return errorMessage;
}
