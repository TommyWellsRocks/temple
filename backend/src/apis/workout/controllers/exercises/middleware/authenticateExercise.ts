import { Request, Response, NextFunction } from "express";
import { selectRows } from "../../../../../utils/db";

export async function authenticateExercise(req: Request, res: Response, next: NextFunction) {
	const { name, id } = req.body;
	let exercise = null;

	if (id) {
		exercise = await selectRows("exercises", { id }, 1);
	} else if (name) {
		exercise = await selectRows("exercises", { name }, 1);
	}

	if (exercise) {
		res.locals.exercise = exercise;
		return next();
	} else {
		res.status(400).send({
			message: "No exercise found. Please provide a valid id or name.",
		});
	}
}
