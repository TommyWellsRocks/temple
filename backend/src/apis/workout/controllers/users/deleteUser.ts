import { Request, Response } from "express";
import { deleteRows } from "../../../../utils/db";

export async function deleteUser(req: Request, res: Response) {
	await deleteRows("users", { id: req.user!.id });
	res.send({ message: "User account deleted successfully." });
}
