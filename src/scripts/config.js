// Workout Overview Page
export const workoutOverviewURL = 'http://localhost:5500/src/pages/workout-overview.html'
export const workoutIndividualURL = 'http://localhost:5500/src/pages/workout-individual.html'

// Note: 
// (exercise).muscles should be same name as content/images/muscles (lower-case)
// (exercise).title should be plural (title-case)
// (exercise).imgName should be singular (lower-case)
// User gets own notes, done, count for their session per exercise (not in table)
// For now using strengthlog instructions and images







// Input Exercises Into DB table exercises:
export const checklistItemsList = [
	{
		"id": 836,
		"title": "Snatch Grip Deadlift",
		"category": "Back",
		"images": ["https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/05/Lifting-tempo-strength-training.jpg?resize=500%2C480&ssl=1"],
		"url_reference": "https://www.strengthlog.com/snatch-grip-deadlift/",
		"primary_muscles": ["Glutes", "Lower Back"],
		"secondary_muscles": ["Quads", "Hamstrings", "Adductors", "Trapezius", "Forearm Flexors"],
		"muscle_images": [
			"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-snatch-grip-deadlift.png?resize=700%2C700&ssl=1"
		],
		"instructions": [
			"Step up close to the bar, so that it is about over the middle of your foot.",
			"Inhale, lean forward and take a wide grip, like in a snatch.",
			"Hold your breath, brace your core slightly, and lift the bar.",
			"Pull the bar close to your body, with a straight back, until you are standing straight.",
			"Lower the bar back to the ground with control.",
			"Take another breath, and repeat for reps."
		],
		"tips": "This is tips or notes about the exercise to focus on...",
		"is_time_based": null,
		"is_single_arm_based": null,
		"is_single_leg_based": null,
		notes: "This is tips or notes about the exercise to focus on...",
		done: 3,
		count: 3,
	},
	{
		"id": 846,
		"title": "Stiff-Legged Deadlift",
		"category": "Back",
		"images": ["https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/05/Lifting-tempo-strength-training.jpg?resize=500%2C480&ssl=1"],
		"url_reference": "https://www.strengthlog.com/stiff-legged-deadlift/",
		"primary_muscles": ["Glutes", "Lower Back", "Hamstrings"],
		"secondary_muscles": ["Adductors", "Trapezius", "Forearm Flexors"],
		"muscle_images": [
			"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/09/Muscles-worked-by-stiff-legged-deadlifts.jpg?resize=700%2C700&ssl=1"
		],
		"instructions": [
			"Step up close to the bar, so that it is about over the middle of your foot. Keep your feet shoulder-width apart.",
			"Inhale, lean forward with only a slight bend in your knees, and grip the bar.",
			"Hold your breath, brace your core slightly, and lift the bar.",
			"Pull the bar close to your body, with a straight back, until you have reached a standing position.",
			"Lower the bar back to the ground with control, still keeping your legs straight.",
			"Take another breath, and repeat for reps."
		],
		"tips": "This is tips or notes about the exercise to focus on...",
		"is_time_based": null,
		"is_single_arm_based": null,
		"is_single_leg_based": null,
		notes: "This is tips or notes about the exercise to focus on...",
		done: 2,
		count: 3,
	},
	{
		"id": 839,
		"title": "Concentration Curl",
		"category": "Biceps",
		"images": ["https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/05/Lifting-tempo-strength-training.jpg?resize=500%2C480&ssl=1"],
		"url_reference": "https://www.strengthlog.com/concentration-curl/",
		"primary_muscles": ["Biceps"],
		"secondary_muscles": ["Forearm Flexors"],
		"muscle_images": [
			"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-concentration-curl-exercise-1024x1024.jpg?resize=700%2C700&ssl=1"
		],
		"instructions": [
			"Sit on a bench with a dumbbell in hand. Lean your elbow onto the inside of your leg.",
			"Lift the dumbbell with control by flexing your elbow.",
			"Reverse the movement and lower the dumbbell back to the starting position."
		],
		"tips": "This is tips or notes about the exercise to focus on...",
		"is_time_based": null,
		"is_single_arm_based": null,
		"is_single_leg_based": null,
		notes: "This is tips or notes about the exercise to focus on...",
		done: 1,
		count: 3,
	},
	{
		"id": 845,
		"title": "Dumbbell Curl",
		"category": "Biceps",
		"images": ["https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/05/Lifting-tempo-strength-training.jpg?resize=500%2C480&ssl=1"],
		"url_reference": "https://www.strengthlog.com/dumbbell-curl/",
		"primary_muscles": ["Biceps"],
		"secondary_muscles": ["Forearm Flexors"],
		"muscle_images": [
			"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/02/Muscles-worked-in-dumbbell-curl-exercise2-1024x1024.png?resize=700%2C700&ssl=1",
			"https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/02/Muscles-worked-in-dumbbell-curl-exercise-1024x1024.png?resize=700%2C700&ssl=1"
		],
		"instructions": [
			"Hold a pair of dumbbells in an underhand (supinated) grip, arms hanging by your sides.",
			"Lift the dumbbells with control, by flexing your elbows.",
			"Don't let your upper arms travel back during the curl. Keep them at your sides, or move them slightly forward.",
			"Reverse the movement and lower the dumbbells back to the starting position."
		],
		"tips": "This is tips or notes about the exercise to focus on...",
		"is_time_based": null,
		"is_single_arm_based": null,
		"is_single_leg_based": null,
		notes: "This is tips or notes about the exercise to focus on...",
		done: 3,
		count: 3,
	},
];
