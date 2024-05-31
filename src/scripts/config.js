// Workout Overview Page
export const workoutOverviewURL = 'http://localhost:5500/src/pages/workout-overview.html'
export const workoutIndividualURL = 'http://localhost:5500/src/pages/workout-individual.html'

// Note: 
// (exercise).muscles should be same name as content/images/muscles (lower-case)
// (exercise).title should be plural (title-case)
// (exercise).imgName should be singular (lower-case)
// User gets own notes, done, count for their session per exercise (not in table)
// For now using strengthlog instructions and images


// ! Put everything.json into sql




// Input Exercises Into DB table exercises:
const exercisesList = [
	{
		title: "Lunges",
		imgName: "lunge.svg",
		muscles: ["abs", "glutes", "lunge"],
		notes: "This is tips or notes about the exercise to focus on...",
		done: 3,
		count: 3,
	},
	{
		title: "Squats",
		imgName: "lunge.svg",
		muscles: ["abs", "glutes", "lunge"],
		notes: "This is tips or notes about the exercise to focus on...",
		done: 2,
		count: 3,
	},
	{
		title: "Wide Lat Pulldowns",
		imgName: "lunge.svg",
		muscles: ["abs", "glutes", "lunge"],
		notes: "This is tips or notes about the exercise to focus on...",
		done: 3,
		count: 3,
	},
	{
		title: "Hammer Curls",
		imgName: "lunge.svg",
		muscles: ["abs", "glutes", "lunge"],
		notes: "This is tips or notes about the exercise to focus on...",
		done: 1,
		count: 3,
	},
	{
		title: "Bench Press",
		imgName: "lunge.svg",
		muscles: ["abs", "glutes", "lunge"],
		notes: "This is tips or notes about the exercise to focus on...",
		done: 1,
		count: 3,
	},
];
