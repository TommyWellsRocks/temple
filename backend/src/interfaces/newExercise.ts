export interface newExercise {
	// Required
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
}

export const exerciseCategories = [
	"Legs",
	"Glutes",
	"Back",
	"Abs",
	"Calves",
	"Grip & Forearm Flexors",
	"Forearm Extensors",
	"Chest",
	"Shoulders",
	"Biceps",
	"Triceps",
];
export const muscles = [
	"Hamstrings",
	"Glutes",
	"Lower Back",
	"Adductors",
	"Trapezius",
	"Forearm Flexors",
	"Lats",
	"Rear Deltoids",
	"Biceps",
	"Rotator Cuffs",
	"Quads",
	"Rotator Cuff",
	"Lower back",
	"Abs",
	"Obliques",
	"Front Deltoids",
	"Calves",
	"Front Deltoid",
	"Triceps",
	"Lateral Deltoid",
	"Abductors",
	"Chest",
	"Lateral Deltoids",
	"Forearm Extensors",
	"Shoulders",
	"Deltoids",
	"Rotator Cuff (posterior)",
	"Rotator Cuff (anterior)",
	"Rear Deltoid",
	"Front Deltoid ",
];
