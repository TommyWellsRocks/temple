import { WorkoutItem } from "./WorkoutItem";

export interface users {
	id: number;
	email: string;
	password: string;
	creation_timestamp: string;
}

// * Workout
export interface exercises {
	// Required
	id: number;
	name: string;
	category: string;
	primary_muscles: string[];
	instructions: string[];
	tips: string;
	author_id: number;
	// Not Required
	is_single_arm_based: boolean;
	is_single_leg_based: boolean;
	secondary_muscles: string[];
	target_muscle_images: string[];
	images: string[];
	videos: string[];
	creation_notes: string;
	creation_timestamp: string;
}

export interface workout_sessions {
	id: number;
	user_id: number;
	workout_items: WorkoutItem[];
	creation_timestamp: string;
}

export interface workout_plans {
	id: number;
	user_id: number;
	next_occurrence_date: string;
	workout_items: WorkoutItem[];
	active_through_date: string;
}

// * Weigh Ins

export interface weigh_ins {
	id: number;
	user_id: number;
	picture_url: string;
	video_url: string;
	daily_ccfp_macros: string;
	variables_changes: string;
	weight: string;
	bf_percentage: string;
	notes: string;
	creation_timestamp: string;
}
