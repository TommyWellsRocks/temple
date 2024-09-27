import { test, expect } from "@playwright/test";
const it = test;
const describe = test.describe;

// RENDER
// GET
// ACT
// ASSERT

describe("Workout/[Program]", () => {
  test.beforeEach(
    async ({ page }) => await page.goto("http://localhost:3000/workout/26"),
  );

  describe("Navigation", () => {
    it("Renders navigation with back button and edit button", async ({
      page,
    }) => {
      const backButton = page.locator("#back-button");
      const header = page.locator("#page-title");
      const editButton = page.locator("#edit-program-button");

      await expect(backButton).toBeVisible();
      await expect(header).toBeVisible();
      await expect(editButton).toBeVisible();
    });

    it("Renders edit program popover onClick of edit button", async ({
      page,
    }) => {
      await page.locator("#edit-program-button").click();

      const popoverText = page.getByText(/Edit Workout Program/i);
      const programForm = page.getByPlaceholder(/Squatober/i);
      const formButton = page.getByRole("button", { name: /Delete/i });

      expect(popoverText).toBeVisible();
      expect(programForm).toBeVisible();
      expect(formButton).toBeVisible();
    });

    it("Navigates to /workout onClick of back button", async ({ page }) => {
      await page.locator("#back-button").click();
      await page.waitForURL("http://localhost:3000/workout");

      expect(page.url()).toBe("http://localhost:3000/workout");
    });
  });
});
