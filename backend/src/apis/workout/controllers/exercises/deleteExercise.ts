import { Request, Response } from "express";
import { deleteRows } from "../../../../utils/db";

export async function deleteExercise(_: Request, res: Response) {
	await deleteRows("exercises", { id: res.locals.exercise.id });
	res.send({ message: "Exercise deleted successfully." });
}
