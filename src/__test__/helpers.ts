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
  await page.locator("#add-button").click();

  const testProgramName = generateRandomString(12);
  await page.getByPlaceholder(/Squatober/i).fill(testProgramName);
  await page.getByRole("button", { name: /Create/i }).click();
  return testProgramName;
}
