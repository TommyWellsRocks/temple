import { Request, Response } from "express";
import { deleteRows } from "../../../../utils/db";

export async function deleteExercise(req: Request, res: Response) {
	await deleteRows("exercises", { id: req.exercise!.id });
	return res.send({ message: "Exercise deleted successfully." });
}
