import { selectRows } from "../../../../../utils/db";

export async function isRegisteredEmail(email: string) {
	return await selectRows("users", { email }, 1);
}