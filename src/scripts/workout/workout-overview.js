import { workoutOverviewURL } from "../config.js";
import { backButtonListener } from "../utils/backButtonListener.js";

function renderWorkoutOverview(
	quote,
	author,
	timeMin,
	burnKcal,
	checklistItemsList,
	workoutOverviewURL
) {
	function dailyQuoteHTML(quote, author) {
		return `
            <div class="quote-container">
                <p class="quote-container-header">Daily Quote</p>
                <p class="quote">${quote}</p>
                <p class="quote-author">- ${author}</p>
            </div>
        `;
	}

	function workoutSpecsHTML(timeMin, burnKcal) {
		return `
            <div class="workout-specs-container">
                <div class="time-container">
                    <img src="../content/images/workout-pages/workout-overview/time.svg" class="specs-image" />
                    <div class="time-info">
                        <p class="specs-header">Time</p>
                        <p class="specs-text">${timeMin} min</p>
                    </div>
                    </div>
                    <div class="divider"></div>
                    <div class="burn-container">
                        <img src="../content/images/workout-pages/workout-overview/burn.svg" class="specs-image" />
                        <div class="burn-info">
                            <p class="specs-header">Burn</p>
                            <p class="specs-text">${burnKcal} kcal</p>
                        </div>
                </div>
            </div>
        `;
	}

	function workoutMusclesHTML(checklistItemsList) {
		const workoutMuscles = [];
		const imagesHTML = [];
		checklistItemsList.forEach((checklistItem) => {
			checklistItem.muscles.forEach((muscle) => {
				if (!workoutMuscles.includes(muscle)) {
					workoutMuscles.push(muscle);
					imagesHTML.push(`
                    <img src="../content/images/muscles/${muscle}.svg" class="muscle-img" />
                    `);
				}
			});
		});
		return `
            <div class="muscles-section-container">
                <h3 class="container-title">Today's Muscles</h3>
                <div class="muscles-display-container">
                    ${imagesHTML.join("")}
                </div>
            </div>
        `;
	}

	function workoutChecklistHTML(checklistItemsList) {
		let listDoneCount = 0;
		const listTotalCount = checklistItemsList.length;

		// Get Checklist Items
		const checklistItemsHTML = [];
		checklistItemsList.forEach((item) => {
			if (item.done === item.count) {
				listDoneCount += 1;
				checklistItemsHTML.push(`
                        <div class="checklist-item-container checklist-item-done" data-title="">
                            <img src="../content/images/exercises/${item.imgName}" class="checklist-item-img"/>
                            <div class="checklist-item-texts">
                                <div class="checklist-item-title">${item.title}</div>
                                <div class="checklist-item-notes">${item.notes}</div>
                            </div>
                            <img
                                src="../content/images/workout-pages/action-trophy.svg"
                                class="checklist-item-action"
                            />
                        </div>
                    `);
			} else {
				checklistItemsHTML.push(`
                        <div class="checklist-item-container">
                            <img src="../content/images/exercises/${item.imgName}" class="checklist-item-img"/>
                            <div class="checklist-item-texts">
                                <div class="checklist-item-title">${item.title}</div>
                                <div class="checklist-item-notes">${item.notes}</div>
                            </div>
                            <img
                                src="../content/images/workout-pages/action-play.svg"
                                class="checklist-item-action"
                            />
                        </div>
                    `);
			}
		});

		// Render All
		return `
            <div class="workout-checklist">
                <div class="checklist-title-container">
                    <h3 class="container-title">The Checklist 😎</h3>
                    <h3 class="checklist-count">
                        <strong class="checklist-done-count">${listDoneCount}</strong> / ${listTotalCount}
                    </h3>
                </div>
                <div class="workout-checklist-items">
                    ${checklistItemsHTML.join("")}
                </div>
            </div>
        `;
	}

	// * Render HTML
	document.querySelector(".js-workout-overview").innerHTML = `
        ${dailyQuoteHTML(quote, author)}

        ${workoutSpecsHTML(timeMin, burnKcal)}

        ${workoutMusclesHTML(checklistItemsList)}

        ${workoutChecklistHTML(checklistItemsList)}
    `;

	// * Add Listeners
	// Nav Back Button
	backButtonListener(workoutOverviewURL);
	// Checklist
	document.querySelectorAll(".checklist-item-container").forEach((checklistItem) => {
        checklistItem.addEventListener("click", () => {
            
        });
	});
}

const quote = "Slow Form + Big Weight = Big Muscles";
const author = "Tommy Wells";
const timeMin = 60;
const burnKcal = 495;
const checklistItemsList = [
	{
		title: "Lunges",
		imgName: "lunge.svg",
        muscles: ["abs", "glutes", "lunge"],
        id: ,
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

// Render WorkoutOverview Page
renderWorkoutOverview(quote, author, timeMin, burnKcal, checklistItemsList, workoutOverviewURL);
