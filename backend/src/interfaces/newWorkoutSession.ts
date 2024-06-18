import { WorkoutItem } from "./WorkoutItem";

export interface newWorkoutSession {
	user_id: Number;
	workout_items: WorkoutItem[];
}
