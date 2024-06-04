import { workoutOverviewURL, checklistItemsList } from "../config.js";
import { backButtonListener } from "./backButtonListener.js";
import { workoutChecklistHTML } from "./workoutChecklist.js";

function renderWorkoutIndividual(checklistItemsList) {
	function getExercise() {
		const exerciseId = new URL(window.location.href).searchParams.get("exerciseId");
		let checklistItem;
		checklistItemsList.forEach((item) => {
			if (item.id == exerciseId) {
				checklistItem = item;
			}
		});
		return checklistItem;
	}

	function headerHTML(title) {
		return `
        <div class="workout-img"></div>
            
        <div class="nav-title">
            <img class="back-button" alt="" src="../content/images/back-button.svg" />
            <h1 class="title">${title}</h1>
        </div>
        `;
	}

	function workoutInputHTML() {
		return `
        <div class="workout-input-container">
			<div class="sets-count">4 Sets</div>
			<div class="set-input-row">
				<img src="../content/images/workout-pages/action-play.svg" class="set-count-img" />
				<div class="workout-row-input reps-input">10</div>
				<div class="workout-input-title">Reps</div>
				<div class="divider"></div>
				<div class="workout-row-input weight-input">120</div>
				<div class="workout-input-title">lbs</div>
			</div>
			<div class="set-input-row">
				<img src="../content/images/workout-pages/action-play.svg" class="set-count-img" />
				<div class="workout-row-input reps-input">10</div>
				<div class="workout-input-title">Reps</div>
				<div class="divider"></div>
				<div class="workout-row-input weight-input">120</div>
				<div class="workout-input-title">lbs</div>
			</div>
			<div class="set-input-row">
				<img src="../content/images/workout-pages/action-play.svg" class="set-count-img" />
				<div class="workout-row-input reps-input">10</div>
				<div class="workout-input-title">Reps</div>
				<div class="divider"></div>
				<div class="workout-row-input weight-input">120</div>
				<div class="workout-input-title">lbs</div>
			</div>
			<div class="set-input-row">
				<img src="../content/images/workout-pages/action-play.svg" class="set-count-img" />
				<div class="workout-row-input reps-input">10</div>
				<div class="workout-input-title">Reps</div>
				<div class="divider"></div>
				<div class="workout-row-input weight-input">120</div>
				<div class="workout-input-title">lbs</div>
			</div>
		</div>
        `;
	}

	function aboutWorkoutHTML() {
		return `
            <div class="about-workout-container">
                <div class="about-workout-tabs">
                    <div class="about-workout-tab active">Notes</div>
                    <div class="about-workout-tab">Instructions</div>
                    <div class="about-workout-tab">Muscles</div>
                </div>
                <div class="tab-info">${checklistItem.notes}</div>
            </div>
        `;
	}

	function handleTabChange(tab, tabs, infoSection) {
		tabs.forEach((remainingTab) => {
			if (remainingTab != tab) {
				remainingTab.classList.remove("active");
			}
		});
		tab.classList.add("active");

		switch (tab.innerHTML) {
			case "Notes":
				infoSection.innerHTML = checklistItem.notes;
				break;
            case "Instructions":
                const instructions = checklistItem.instructions.map((string, index) => `${index + 1}. ${string}`);
				infoSection.innerHTML = instructions.join("\n");
				break;
			case "Muscles":
				infoSection.innerHTML = `This is lorem ipsum text that might make sense.`;
				break;
		}
	}

	const checklistItem = getExercise();

	// * Render All HTML
	document.querySelector(".js-workout-individual").innerHTML = `
        ${headerHTML(checklistItem.title)}

        ${workoutInputHTML()}

        ${aboutWorkoutHTML()}

        ${workoutChecklistHTML(checklistItemsList)}
    `;

	// * Add Listeners
	// Nav Back Button
	backButtonListener(workoutOverviewURL);
	// About Tabs
	const tabs = document.querySelectorAll(".about-workout-tab");
	const infoSection = document.querySelector(".tab-info");
	tabs.forEach((tab) => {
		tab.addEventListener("click", () => handleTabChange(tab, tabs, infoSection));
	});
}

renderWorkoutIndividual(checklistItemsList);
