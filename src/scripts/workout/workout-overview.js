import { workoutOverviewURL } from "../config.js";
import { backButtonListener } from "../utils/backButtonListener.js";

function renderWorkoutOverview(
	quote,
	author,
	timeMin,
	burnKcal,
	muscleImgName,
	checklistItemsList
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

	function workoutMusclesHTML(muscleImgName) {
		const imagesHTML = [];
		muscleImgName.forEach((imgName) => {
			imagesHTML.push(`
                <img src="../content/images/muscle-groups/${imgName}" class="muscle-img" />
            `);
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
                        <div class="checklist-item-container checklist-item-done">
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

	// Render All
	document.querySelector(".js-workout-overview").innerHTML = `
        ${dailyQuoteHTML(quote, author)}

        ${workoutSpecsHTML(timeMin, burnKcal)}

        ${workoutMusclesHTML(muscleImgName)}

        ${workoutChecklistHTML(checklistItemsList)}
    `;
}

// Listen To Back Button
backButtonListener(workoutOverviewURL);

const quote = "Slow Form + Big Weight = Big Muscles";
const author = "Tommy Wells";
const timeMin = 60;
const burnKcal = 495;
const muscleImgName = ["muscle1.svg", "muscle1.svg"];
const checklistItemsList = [
	{
		title: "Lunges",
		notes: "This is tips or notes about the exercise to focus on...",
		imgName: "lunge.svg",
		done: 3,
		count: 3,
	},
	{
		title: "Squats",
		notes: "This is tips or notes about the exercise to focus on...",
		imgName: "lunge.svg",
		done: 2,
		count: 3,
	},
	{
		title: "Wide Lat Pulldowns",
		notes: "This is tips or notes about the exercise to focus on...",
		imgName: "lunge.svg",
		done: 3,
		count: 3,
	},
	{
		title: "Hammer Curls",
		notes: "This is tips or notes about the exercise to focus on...",
		imgName: "lunge.svg",
		done: 1,
		count: 3,
	},
	{
		title: "Bench Press",
		notes: "This is tips or notes about the exercise to focus on...",
		imgName: "lunge.svg",
		done: 1,
		count: 3,
	},
];

// Render WorkoutOverview Page
renderWorkoutOverview(quote, author, timeMin, burnKcal, muscleImgName, checklistItemsList);
