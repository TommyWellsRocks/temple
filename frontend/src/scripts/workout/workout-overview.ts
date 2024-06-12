import "../../styles/shared/globals.css";
import "../../styles/shared/workout/nav.css";
import "../../styles/shared/workout/chart.css";
import "../../styles/pages/workout-overview/checklist.css";
import "../../styles/pages/workout-overview/specs.css";
import "../../styles/pages/workout-overview/muscles.css";

import timeIconURL from "../../content/images/workout-pages/workout-overview/time.svg";
import burnIconURL from "../../content/images/workout-pages/workout-overview/burn.svg";

import { checklistItem } from "../../interfaces/checklistItem.ts";
import { workoutOverviewURL, checklistItemsList, lastWeek, thisWeek } from "../config.ts";
import { backButtonListener } from "./components/backButtonListener.ts";
import { workoutChecklistHTML } from "./components/workoutChecklist.ts";
import { Chart } from "chart.js/auto";

function renderWorkoutOverview(
	timeMin: number,
	burnKcal: number,
	checklistItemsList: checklistItem[],
	workoutOverviewURL: string,
	workoutChecklistHTML: Function
) {
    let analyticsChart: Chart | null = null;

	// * HTML Functions
    function renderChart() {
        function getPreviousChartData() {
            const previousData = lastWeek.map(day =>
                day.reduce((dayVolume, exercise) =>
                    dayVolume + exercise.reps.reduce((exerciseVolume, repCount, set) =>
                        exerciseVolume + repCount * (exercise.weight[set] || 1), 0), 0));
            return previousData;
        }
        
        function getCurrentChartData() {
            const currentData: number[] = thisWeek.map(day =>
                day.reduce((dayVolume, exercise) =>
                    dayVolume + exercise.reps.reduce((exerciseVolume, repCount, set) =>
                        exerciseVolume + repCount * (exercise.weight[set] || 1), 0), 0));;
            
			return currentData;
		}

		if (analyticsChart) {
			analyticsChart.destroy();
		}

		const previousData = getPreviousChartData();
		const currentData = getCurrentChartData();
		const chart_location: HTMLCanvasElement = document.querySelector(".analytics-chart")!;
		const yAxisMin = Math.min(...previousData, ...currentData) * 0.8;
		const yAxisMax = Math.max(...previousData, ...currentData) * 1.2;

		analyticsChart = new Chart(chart_location, {
			type: "line",
			data: {
				labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				datasets: [
					{
						label: "Last Weeks's Volume",
						data: previousData,
						fill: true,
						borderColor: "#999",
						backgroundColor: "rgba(153, 153, 153, 0.5)",
						tension: 0.3,
						borderDash: [5, 5],
					},
					{
						label: "This Week's Volume",
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
                            callback: function(value) {
								return `${value}lbs`
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

	function workoutSpecsHTML(timeMin: number, burnKcal: number) {
		return `
            <div class="workout-specs-container">
                <div class="time-container">
                    <img src=${timeIconURL} class="specs-image" />
                    <div class="time-info">
                        <p class="specs-header">Time</p>
                        <p class="specs-text">${timeMin} min</p>
                    </div>
                    </div>
                    <div class="divider"></div>
                    <div class="burn-container">
                        <img src=${burnIconURL} class="specs-image" />
                        <div class="burn-info">
                            <p class="specs-header">Burn</p>
                            <p class="specs-text">${burnKcal} kcal</p>
                        </div>
                </div>
            </div>
        `;
	}

	function workoutMusclesHTML(checklistItemsList: checklistItem[]) {
		const workoutMuscles: string[] = [];
		const imagesHTML: string[] = [];
		checklistItemsList.forEach((checklistItem) => {
			if (!workoutMuscles.includes(checklistItem.muscle_images[0])) {
				workoutMuscles.push(checklistItem.muscle_images[0]);
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
	document.querySelector(".js-workout-overview")!.innerHTML = `
        <div class="chart-container">
			<canvas class="analytics-chart"></canvas>
		</div>

        ${workoutSpecsHTML(timeMin, burnKcal)}

        ${workoutMusclesHTML(checklistItemsList)}

        ${workoutChecklistHTML(checklistItemsList)}
    `;

	renderChart();

	// * Add Listeners
	// Nav Back Button
	backButtonListener(workoutOverviewURL);
}

// * LOREM IPSUM
const timeMin = 60;
const burnKcal = 495;

// Render WorkoutOverview Page
renderWorkoutOverview(
	timeMin,
	burnKcal,
	checklistItemsList,
	workoutOverviewURL,
	workoutChecklistHTML
);
