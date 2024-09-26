import { test, expect } from "@playwright/test";
const it = test;
const describe = test.describe;

// RENDER
// GET
// ACT
// ASSERT

describe("Workout/Programs", () => {
  test.beforeEach(
    async ({ page }) => await page.goto("http://localhost:3000/workout"),
  );

  describe("Navigation", () => {
    it("Renders navigation with back button", async ({ page }) => {
      const backButton = page.locator("#back-button");
      const header = page.locator("#page-title");

      await expect(backButton).toBeVisible();
      await expect(header).toBeVisible();
    });

    it("Navigates to /workout onClick of back button", async ({ page }) => {
      await page.locator("#back-button").click();
      await page.waitForURL("http://localhost:3000/");

      expect(page.url()).toBe("http://localhost:3000/");
    });
  });
});
