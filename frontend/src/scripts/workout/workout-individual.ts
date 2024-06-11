import "../../styles/shared/globals.css";
import "../../styles/shared/workout/nav.css";
import "../../styles/shared/workout/chart.css";
import "../../styles/shared/workout/checklist.css";
import "../../styles/pages/workout-individual/about.css";
import "../../styles/pages/workout-individual/input.css";

import backButtonURL from "../../content/images/back-button.svg";
import trophyButtonURL from "../../content/images/workout-pages/action-trophy.svg";

import { checklistItem } from "../../interfaces/checklistItem.ts";
import { workoutOverviewURL, checklistItemsList } from "../config.ts";
import { backButtonListener } from "./components/backButtonListener.ts";
import { workoutChecklistHTML } from "./components/workoutChecklist.ts";
import { Chart } from "chart.js/auto";

function renderWorkoutIndividual(checklistItemsList: checklistItem[]) {
	// TODO Get Previous Data
	function getExercise() {
		const exerciseId = Number(new URL(window.location.href).searchParams.get("exerciseId"));
		let checklistItem: checklistItem;
		checklistItemsList.forEach((item) => {
			if (item.id === exerciseId) {
				checklistItem = item;
			}
		});
		return checklistItem!;
	}

	function headerNavHTML(title: string) {
		return `
		<div class="nav-title">
			<img class="back-button" alt="" src=${backButtonURL} />
			<h1 class="title">${title}</h1>
		</div>	
        `;
	}

	function workoutInputHTML(setCount: number) {
		function renderSetCount() {
			let innerText: string;
			if (setCount == 1) {
				innerText = `${setCount} Set`;
			} else {
				innerText = `${setCount} Sets`;
			}
			return `<div class="sets-count">${innerText}</div>`;
		}

		function renderInputRowsHTML() {
			const rowsHTML = [];
			for (let i = 1; i <= setCount; i++) {
				rowsHTML.push(`
						<div class="exercise-input-row">
							<div class="input-row-counter">${i}</div>
							<div class="input-row-input-field reps-input">0</div>
							<div class="workout-input-title">Reps</div>
							<div class="divider"></div>
							<div class="input-row-input-field weight-input">0</div>
							<div class="workout-input-title">Pounds</div>
						</div>
					`);
			}
			return rowsHTML.join("");
		}

		return `
			<div class="exercise-input-container">
				${renderSetCount()}
				${renderInputRowsHTML()}
			</div>
        `;
	}

	function aboutWorkoutHTML(checklistItem: checklistItem) {
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

	function renderChart(previousData: number[], currentData: number[]) {
		const chart_location: HTMLCanvasElement = document.querySelector(".exercise-chart")!;
		const yAxisMin = Math.min(...previousData, ...currentData) * 0.6;
		const yAxisMax = Math.max(...previousData, ...currentData) * 1.2;
		const xAxisLength = () => {
			if (previousData.length < currentData.length) {
				return currentData.map((_, index) => `Set ${index + 1}`);
			} else {
				return previousData.map((_, index) => `Set ${index + 1}`);
			}
		};

		const volumeChart = new Chart(chart_location, {
			type: "line",
			data: {
				labels: xAxisLength(),
				datasets: [
					{
						label: "Previous Session Volume",
						data: previousData,
						fill: true,
						borderColor: "#999",
						backgroundColor: "rgba(153, 153, 153, 0.5)",
						tension: 0.3,
						borderDash: [5, 5],
					},
					{
						label: "Current Volume",
						data: currentData,
						fill: true,
						borderColor: "rgba(103, 57, 255, 1)",
						backgroundColor: "rgba(103, 57, 255)",
						tension: 0.3,
					},
				],
			},
			options: {
				scales: {
					x: {
						grid: {
							display: false,
						},
					},
					y: {
						grid: {
							display: false,
						},
						min: yAxisMin,
						max: yAxisMax,
					},
				},
			},
		});
		return volumeChart;
	}

	function handleExerciseInput(field: Element) {
		const inputRow = field.parentElement!;

		if (field.querySelector("input")) return;

		// Remove Active From All Other
		exerciseInputFields.forEach((field) => {
			field.parentElement!.classList.remove("exercise-input-row-active");
			field.parentNode!.firstElementChild!.classList.remove("input-row-counter-active");
		});
		// Add Active To Current Row
		inputRow.classList.add("exercise-input-row-active");
		inputRow.children[0].classList.add("input-row-counter-active");

		// Edit Field
		const currentValue = String(field.textContent);
		const input = document.createElement("input");
		input.type = "number";
		input.value = currentValue;
		input.classList.add("exercise-input-field");
		input.addEventListener("blur", () => {
			const newValue = input.value;
			input.parentNode!.textContent = newValue;
			input.parentNode?.removeChild(input);
			volumeChart.destroy();
			volumeChart = renderChart(previousData, getCurrentData());
		});
		field.textContent = "";
		field.appendChild(input);
	}

	// Get Current Data
	function getCurrentData() {
		const currentData: number[] = [];
		exerciseInputFields.forEach((field, index) => {
			if (field.classList.contains("reps-input") && Number(field.textContent) !== 0) {
				let weightField = Number(exerciseInputFields[index + 1].textContent)
				if (weightField === 0) {
					weightField = 1
				}
				currentData.push(
					Number(field.textContent) * weightField
				);
			}
		});
		return currentData;
	}

	function handleTabChange(tab: Element, tabs: NodeListOf<Element>, infoSection: Element) {
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
				const instructions = checklistItem.instructions.map(
					(string: string, index: number) => `${index + 1}. ${string}`
				);
				infoSection.innerHTML = instructions.join("\n");
				break;
			case "Muscles":
				infoSection.innerHTML = `This is lorem ipsum text that might make sense.`;
				break;
		}
	}

	const checklistItem = getExercise() satisfies checklistItem;
	const previousData = checklistItem.previousReps.map((set, index) => {
		return set * checklistItem.previousWeight[index];
	});
	const setCount = 4;

	// * Render All HTML
	document.querySelector(".js-workout-individual")!.innerHTML = `
        ${headerNavHTML(checklistItem.title)}

		<div class="chart-container">
			<canvas class="exercise-chart"></canvas>
		</div>

        ${workoutInputHTML(setCount)}

        ${aboutWorkoutHTML(checklistItem)}

        ${workoutChecklistHTML(checklistItemsList)}
    `;

	let volumeChart = renderChart(previousData, []);

	// * Add Listeners
	// Nav Back Button
	backButtonListener(workoutOverviewURL);

	// Exercise Input Change
	const exerciseInputFields = document.querySelectorAll(".input-row-input-field");
	exerciseInputFields.forEach((field, index) => {
		// * Initialize Input Row
		if (index === 0) {
			field.parentElement!.classList.add("exercise-input-row-active");
			field.parentNode!.firstElementChild!.classList.add("input-row-counter-active");
		}
		field.addEventListener("click", () => handleExerciseInput(field));
	});

	// About Tabs
	const tabs = document.querySelectorAll(".about-workout-tab");
	const infoSection = document.querySelector(".tab-info")!;
	tabs.forEach((tab) => {
		tab.addEventListener("click", () => handleTabChange(tab, tabs, infoSection));
	});
}

renderWorkoutIndividual(checklistItemsList);
