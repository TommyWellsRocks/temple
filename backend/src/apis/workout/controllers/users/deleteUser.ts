import { Request, Response } from "express";
import { deleteRows } from "../../../../utils/db";

export async function deleteUser(_: Request, res: Response) {
	await deleteRows("users", { id: res.locals.user.id });
	res.send({ message: "User account deleted successfully." });
}
