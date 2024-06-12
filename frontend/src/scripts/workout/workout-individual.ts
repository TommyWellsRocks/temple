import "../../styles/shared/globals.css";
import "../../styles/shared/workout/nav.css";
import "../../styles/shared/workout/chart.css";
import "../../styles/pages/workout-individual/about.css";
import "../../styles/pages/workout-individual/input.css";

import backButtonURL from "../../content/images/back-button.svg";

import { checklistItem } from "../../interfaces/checklistItem.ts";
import { workoutOverviewURL, checklistItemsList } from "../config.ts";
import { backButtonListener } from "./components/backButtonListener.ts";
import { Chart } from "chart.js/auto";

function renderWorkoutIndividual(checklistItemsList: checklistItem[]) {
	let volumeChart: Chart | null = null;

	// * Helper Functions
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

	function getExerciseInputFields() {
		return document.querySelectorAll(".input-row-input-field");
	}

	// * HTML Functions
	function headerNavHTML(title: string) {
		return `
		<div class="nav-title">
			<img class="back-button" alt="" src=${backButtonURL} />
			<h1 class="title">${title}</h1>
		</div>	
        `;
	}

	function renderChart() {
		function getPreviousChartData() {
			const previousData = checklistItem.previousReps.map((set, index) => {
				return set * (checklistItem.previousWeight[index] || 1);
			});
			return previousData;
		}
		function getCurrentChartData() {
			const currentData: number[] = [];
			const exerciseInputFields = getExerciseInputFields();
			exerciseInputFields.forEach((field, index) => {
				if (field.classList.contains("reps-input") && Number(field.textContent) !== 0) {
					let weightField = Number(exerciseInputFields[index + 1].textContent) || 1;
					currentData.push(Number(field.textContent) * weightField);
				}
			});
			return currentData;
		}

		if (volumeChart) {
			volumeChart.destroy();
		}

		const previousData = getPreviousChartData();
		const currentData = getCurrentChartData();
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

		volumeChart = new Chart(chart_location, {
			type: "line",
			data: {
				xLabels: xAxisLength(),
				datasets: [
					{
						label: "Last Session's Volume",
						data: previousData,
						fill: true,
						borderColor: "#999",
						backgroundColor: "rgba(153, 153, 153, 0.5)",
						tension: 0.3,
						borderDash: [5, 5],
					},
					{
						label: "Current Session's Volume",
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
						ticks: {
							align: "inner",
						},
					},
					y: {
						grid: {
							display: false,
						},
						ticks: {
							callback: function (value) {
								return `${value}lbs`;
							},
							autoSkipPadding: 20,
						},
						min: yAxisMin,
						max: yAxisMax,
					},
				},
			},
			plugins: [],
		});
	}

	function renderSetCount() {
		let innerText: string;
		if (setCount == 1) {
			innerText = `${setCount} Set`;
		} else {
			innerText = `${setCount} Sets`;
		}
		return `<div class="sets-count">${innerText}</div>`;
	}

	function workoutInputHTML() {
		function renderInputRowsHTML() {
			const rowsHTML = [];
			for (let i = 1; i <= setCount; i++) {
				rowsHTML.push(`
						<div class="exercise-input-row">
							<div class="input-row-counter">${i}</div>
							<div class="input-row-input-field reps-input">${checklistItem.currentReps[i - 1] || 0}</div>
							<div class="workout-input-title">Reps</div>
							<div class="divider"></div>
							<div class="input-row-input-field weight-input">${checklistItem.currentWeight[i - 1] || 0}</div>
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
					<div class="about-workout-tab">Tips</div>
                    <div class="about-workout-tab">Instructions</div>
                    <div class="about-workout-tab">Muscles</div>
                </div>
                <div class="tab-info">${checklistItem.notes}</div>
            </div>
        `;
	}

	// * Handler Functions
	function handleExerciseInput(field: Element) {
		const inputRow = field.parentElement!;

		if (field.querySelector("input")) return;

		// Remove Active From All Other
		const exerciseInputFields = getExerciseInputFields();
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
			renderChart();

			// Log To Exercise Object
			const repsFields = document.querySelectorAll(".reps-input");
			const weightFields = document.querySelectorAll(".weight-input");
			repsFields.forEach((field, index) => {
				checklistItem.currentReps[index] = Number(field.textContent);
			});
			weightFields.forEach((field, index) => {
				checklistItem.currentWeight[index] = Number(field.textContent);
			});
		});
		field.textContent = "";
		field.appendChild(input);
	}

	function handleAddSet() {
		setCount += 1;
		checklistItem.currentReps.push(0);
		checklistItem.currentWeight.push(0);
		document.querySelector(".sets-count")!.innerHTML = renderSetCount();
		document.querySelector(".exercise-input-container")!.innerHTML += `
			<div class="exercise-input-row">
				<div class="input-row-counter">${setCount}</div>
				<div class="input-row-input-field reps-input">0</div>
				<div class="workout-input-title">Reps</div>
				<div class="divider"></div>
				<div class="input-row-input-field weight-input">0</div>
				<div class="workout-input-title">Pounds</div>
			</div>
		`;

		// Add Listener To It
		exerciseInputListeners();
		renderChart();
	}

	function handleDeleteSet() {
		setCount -= 1;
		checklistItem.currentReps.pop();
		checklistItem.currentWeight.pop();
		document.querySelector(".sets-count")!.innerHTML = renderSetCount();
		document.querySelector(".exercise-input-container")!.lastElementChild?.remove();

		exerciseInputListeners();
		renderChart();
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
			case "Tips":
				infoSection.innerHTML = checklistItem.tips;
				break;
			case "Instructions":
				const instructions = checklistItem.instructions.map(
					(string: string, index: number) => `<div class="instruction-item">${index + 1}. ${string}</div>`
				);
				infoSection.innerHTML = instructions.join("\n");
				break;
			case "Muscles":
				infoSection.innerHTML = `<img class="muscle-img" src="${checklistItem.muscle_images[0]}">`;
				break;
		}
	}

	// * Listener Functions
	function exerciseInputListeners() {
		const exerciseInputFields = getExerciseInputFields();
		exerciseInputFields.forEach((field) => {
			field.addEventListener("click", () => handleExerciseInput(field));
		});
	}

	// * Get Data
	const checklistItem = getExercise() satisfies checklistItem;
	let setCount = checklistItem.previousReps.length;
	for (let i = 1; i <= setCount; i++) {
		checklistItem.currentReps.push(0);
		checklistItem.currentWeight.push(0);
	}

	// * Render All HTML
	document.querySelector(".js-workout-individual")!.innerHTML = `
	${headerNavHTML(checklistItem.title)}

	<div class="chart-container">
		<canvas class="exercise-chart"></canvas>
	</div>

	${workoutInputHTML()}
	<div class="exercise-input-row adjustment-row">
		<div class="input-row-counter create-set">+</div>
		<div class="input-row-counter delete-set">🗑️</div>
	</div>

	${aboutWorkoutHTML(checklistItem)}
	`;

	renderChart();

	// * Add Listeners
	// Nav Back Button
	backButtonListener(workoutOverviewURL);

	exerciseInputListeners();

	// Initialize Input Row
	const firstRow = document.querySelector(".exercise-input-row");
	firstRow?.classList.add("exercise-input-row-active");
	firstRow?.firstElementChild?.classList.add("input-row-counter-active");

	// Exercise Set Row Adjustments
	document.querySelector(".create-set")!.addEventListener("click", () => handleAddSet());
	document.querySelector(".delete-set")!.addEventListener("click", () => handleDeleteSet());

	// About Tabs
	const tabs = document.querySelectorAll(".about-workout-tab");
	const infoSection = document.querySelector(".tab-info")!;
	tabs.forEach((tab) => {
		tab.addEventListener("click", () => handleTabChange(tab, tabs, infoSection));
	});
}

renderWorkoutIndividual(checklistItemsList);
