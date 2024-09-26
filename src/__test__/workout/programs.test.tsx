import { test, expect } from "@playwright/test";
import { generateRandomString } from "../helpers";
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

  describe("Header Section", () => {
    it("Renders header and add button", async ({ page }) => {
      const header = page.locator("#programs-header");
      const addButton = page.locator("#add-button");

      await expect(header).toBeVisible();
      await expect(addButton).toBeVisible();
    });

    it("Opens add program popover, onClick of add button", async ({ page }) => {
      await page.locator("#add-button").click();

      const popoverText = page.getByText(/Create Workout Program/i);
      const programForm = page.getByPlaceholder(/Squatober/i);
      const formButton = page.getByRole("button", { name: /Create/i });

      expect(popoverText).toBeVisible();
      expect(programForm).toBeVisible();
      expect(formButton).toBeVisible();
    });
  });

  describe("Header & Programs Section Integration", () => {
    it("Header add button adds program to programs section", async ({
      page,
    }) => {
      await page.locator("#add-button").click();

      const testProgramName = generateRandomString(12);
      await page.getByPlaceholder(/Squatober/i).fill(testProgramName);
      await page.getByRole("button", { name: /Create/i }).click();

      // Check first top programs section
      const programs = page.locator("#program")
      await expect(programs.nth(0)).toContainText(testProgramName);
    });
  });
});
