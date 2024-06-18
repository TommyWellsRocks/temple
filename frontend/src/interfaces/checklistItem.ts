export interface checklistItem {
	id: number;
	title: string;
	category: string;
	exercise_images: string[];
	exercise_creation_notes: string;
	primary_muscles: string[];
	secondary_muscles: string[];
	muscle_images: string[];
	instructions: string[];
	tips: string;
	is_time_based: boolean;
	is_single_arm_based: boolean;
	is_single_leg_based: boolean;
	notes: string;
	done: number;
	count: number;
	previousReps: number[];
	previousWeight: number[];
	currentReps: number[];
	currentWeight: number[];
}