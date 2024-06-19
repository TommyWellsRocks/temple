import { Request } from "express";
import { exercises, workout_sessions } from "./tableColumns";

declare module "express" {
	interface Request {
		user?: {
			id: number;
		};
		exercise?: exercises;
		workoutSession?: workout_sessions;
	}
}
