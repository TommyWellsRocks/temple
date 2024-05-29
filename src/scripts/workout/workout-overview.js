import { workoutOverviewURL } from "../config.js";
import { backButtonListener } from "../utils/backButtonListener.js";

// Daily Quote
function setDailyQuote(quote, author) {
	document.querySelector(".quote-container").innerHTML = `
        <p class="quote-container-header">Daily Quote</p>
        <p class="quote">${quote}</p>
        <p class="quote-author">- ${author}</p>
    `;
}

function setWorkoutSpecs(timeMin, burnKcal) {
	document.querySelector(".workout-specs-container").innerHTML = `
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
    `;
}

// Listen To Back Button
backButtonListener(workoutOverviewURL);

// Set Quote
setDailyQuote("Slow Form + Big Weight = Big Muscles", "Tommy Wells");

// Set Specs
setWorkoutSpecs(60, 495);