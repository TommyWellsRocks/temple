import { workoutOverviewURL } from "../config.js";
import { backButtonListener } from "./backButtonListener.js";
import { workoutChecklistHTML } from "./workoutChecklist.js";
import { checklistItemsList } from "../config.js";

function renderWorkoutOverview(
	quote,
	author,
	timeMin,
	burnKcal,
	checklistItemsList,
	workoutOverviewURL,
	workoutChecklistHTML
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
			if (!workoutMuscles.includes(checklistItem.muscle_images)) {
				workoutMuscles.push(checklistItem.muscle_images);
				imagesHTML.push(`
                <img src="${checklistItem.muscle_images}" class="muscle-img" />
                `);
			}
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

	// * Render All HTML
	document.querySelector(".js-workout-overview").innerHTML = `
        ${dailyQuoteHTML(quote, author)}

        ${workoutSpecsHTML(timeMin, burnKcal)}

        ${workoutMusclesHTML(checklistItemsList)}

        ${workoutChecklistHTML(checklistItemsList)}
    `;

	// * Add Listeners
	// Nav Back Button
	backButtonListener(workoutOverviewURL);
}

// * LOREM IPSUM
const quote = "Slow Form + Big Weight = Big Muscles";
const author = "Tommy Wells";
const timeMin = 60;
const burnKcal = 495;

// Render WorkoutOverview Page
renderWorkoutOverview(
	quote,
	author,
	timeMin,
	burnKcal,
	checklistItemsList,
	workoutOverviewURL,
	workoutChecklistHTML
);
