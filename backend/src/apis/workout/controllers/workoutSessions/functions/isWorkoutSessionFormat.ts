import { newWorkoutSession } from "../../../../../interfaces/newWorkoutSession";
import { selectRows } from "../../../../../utils/db";

export async function isWorkoutSessionFormat(workoutSessionObject: newWorkoutSession) {
	let errorMessage: string[] = [];

	// user_id | Required
	if (workoutSessionObject.user_id) {
		if (typeof workoutSessionObject.user_id === "number") {
			const isUser = await selectRows("users", { id: workoutSessionObject.user_id }, 1);
			if (!isUser) {
				errorMessage.push("User must exist.");
			}
		} else {
			errorMessage.push("user_id must be a number.");
		}
	} else {
		errorMessage.push("Missing user_id.");
	}

	// workout_items | Required
	if (workoutSessionObject.workout_items) {
		if (!(typeof workoutSessionObject.workout_items === "object")) {
			errorMessage.push("workout_items must be an object.");
		} else {
			workoutSessionObject.workout_items.forEach(async workoutItem => {
				const exercise = await selectRows("exercises", { id: workoutItem.exercise_id }, 1)
				if (!exercise) {
					errorMessage.push("Invalid exercise id.")
				}
			})
		}
	} else {
		errorMessage.push("Missing workout_items.");
	}

	return errorMessage;
}
