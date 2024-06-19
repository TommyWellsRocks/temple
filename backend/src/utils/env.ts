import "dotenv/config";
import { configDotenv } from "dotenv";

export function env() {
	configDotenv({ path: "/workspaces/bodyproject/.env" });
}
