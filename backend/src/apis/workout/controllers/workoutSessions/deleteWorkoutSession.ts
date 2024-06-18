import { Request, Response } from "express";
import { deleteRows } from "../../../../utils/db";

export async function deleteWorkoutSession(_: Request, res: Response) {
	await deleteRows("exercises", { id: res.locals.workoutSession.id });
	res.send({ message: "Exercise deleted successfully." });
}
