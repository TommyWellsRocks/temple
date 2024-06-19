import { Request, Response } from "express";
import { deleteRows } from "../../../../utils/db";

export async function deleteWorkoutSession(req: Request, res: Response) {
	await deleteRows("exercises", { id: req.workoutSession!.id });
	return res.send({ message: "Exercise deleted successfully." });
}
