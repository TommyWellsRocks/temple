import { checklistItem } from "../../interfaces/checklistItem.ts";
import { workoutIndividualURL } from "../config.ts";

// TODO href's onlick with url values like orders.js in js-amazon 
export function workoutChecklistHTML(checklistItemsList: checklistItem[]) {
	let listDoneCount = 0;
	const listTotalCount = checklistItemsList.length;

	const checklistItemsHTML: string[] = [];
	checklistItemsList.forEach((item) => {
		if (item.done === item.count) {
			listDoneCount += 1;
			checklistItemsHTML.push(`
					<a class="checklist-anchor" href="${workoutIndividualURL}?workoutId=${"DEFAULTVALUE"}&exerciseId=${item.id}">
						<div class="checklist-item-container checklist-item-done" data-title="">
							<img src="${item.images ? item.images[0] : "MISSING IMAGE"}" class="checklist-item-img"/>
							<div class="checklist-item-texts">
								<div class="checklist-item-title">${item.title}</div>
								<div class="checklist-item-notes">${item.tips}</div>
							</div>
							<img
								src="../content/images/workout-pages/action-trophy.svg"
								class="checklist-item-action"
							/>
						</div>
					</a>
				`);
		} else {
			checklistItemsHTML.push(`
					<a class="checklist-anchor" href="${workoutIndividualURL}?workoutId=${"DEFAULTVALUE"}&exerciseId=${item.id}">
						<div class="checklist-item-container">
							<img src="${item.images ? item.images[0] : "MISSING IMAGE"}" class="checklist-item-img"/>
							<div class="checklist-item-texts">
								<div class="checklist-item-title">${item.title}</div>
								<div class="checklist-item-notes">${item.tips}</div>
							</div>
							<img
								src="../content/images/workout-pages/action-play.svg"
								class="checklist-item-action"
							/>
						</div>
					</a>
				`);
		}
	});

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