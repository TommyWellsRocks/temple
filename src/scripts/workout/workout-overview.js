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

// Listen To Back Button
backButtonListener(workoutOverviewURL);

// Set Quote
setDailyQuote("Slow Form + Big Weight = Big Muscles", "Tommy Wells");

