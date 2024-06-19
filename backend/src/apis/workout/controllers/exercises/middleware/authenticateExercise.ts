import { Request, Response, NextFunction } from "express";
import { selectRows } from "../../../../../utils/db";
import { exercises } from "../../../../../interfaces/tableColumns";

export async function authenticateExercise(req: Request, res: Response, next: NextFunction) {
	const { name, id } = req.body as { name: string; id: number };
	let exercise = null;

	if (id) {
		exercise = await selectRows("exercises", { id }, 1) as exercises;
	} else if (name) {
		exercise = await selectRows("exercises", { name }, 1) as exercises;
	} else {
		return res.status(400).send({
			message: "No exercise found. Please provide a valid id or name.",
		});
	}

	if (exercise) {
		req.exercise = exercise;
		return next();
	} else {
		return res.status(400).send({
			message: "No exercise found. Please provide a valid id or name.",
		});
	}
}
