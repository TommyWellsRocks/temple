import type { Page } from "@playwright/test";

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export async function createProgram(page: Page) {
  await page.locator("#add-program-button").click();

  const programName = generateRandomString(12);
  await page.getByPlaceholder(/Squatober/i).fill(programName);
  await page.getByRole("button", { name: /Create/i }).click();
  return programName;
}

export async function createDay(page: Page) {
  await page.locator("#add-day-button").click();

  const dayName = generateRandomString(12);
  await page.getByPlaceholder(/Leg day/i).fill(dayName);
  await page.getByRole("button", { name: /Create/i }).click();
  return dayName;
}

export async function addExercise(page: Page) {
  await page.locator("#add-exercise-button").click();

  const testExercise = "Seated Tricep Press";

  const exercise = page.getByRole("row", { name: testExercise });
  const exerciseCheckbox = exercise.getByRole("checkbox");

  if (!(await exerciseCheckbox.isChecked())) {
    await exerciseCheckbox.click();
  }

  await page.locator("#close-button").click()

  return testExercise;
}
