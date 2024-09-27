import { test, expect } from "@playwright/test";
import { createProgram, generateRandomString } from "../helpers";
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

    it("Navigates to / onClick of back button", async ({ page }) => {
      await page.locator("#back-button").click();
      await page.waitForURL("http://localhost:3000/");

      expect(page.url()).toBe("http://localhost:3000/");
    });
  });

  describe("Header Section", () => {
    it("Renders header and add button", async ({ page }) => {
      const header = page.locator("#programs-header");
      const addButton = page.locator("#add-program-button");

      await expect(header).toBeVisible();
      await expect(addButton).toBeVisible();
    });

    it("Opens add program popover, onClick of add button", async ({ page }) => {
      await page.locator("#add-program-button").click();

      const popoverText = page.getByText(/Create Workout Program/i);
      const programForm = page.getByPlaceholder(/Squatober/i);
      const formButton = page.getByRole("button", { name: /Create/i });

      expect(popoverText).toBeVisible();
      expect(programForm).toBeVisible();
      expect(formButton).toBeVisible();
    });
  });

  describe("Header & Programs Section Integration", () => {
    it("Adds program to programs section from Add button", async ({ page }) => {
      // Create program
      const programName = await createProgram(page);

      // Check first top programs section
      const programs = page.locator("#program");
      await expect(programs.nth(0)).toContainText(programName);
    });
  });

  describe("Programs Section", () => {
    it("Renders edit popover onClick of program edit button", async ({ page }) => {
      // create program first
      const programName = await createProgram(page);

      // Test edit button
      await page.locator("#edit-program-button").nth(0).click();

      const popoverText = page.getByText(/Edit Workout Program/i);
      const programForm = page.getByText(programName);
      const formButton = page.getByRole("button", { name: /Delete/i });

      expect(popoverText).toBeVisible();
      expect(programForm).toBeVisible();
      expect(formButton).toBeVisible();
    });

    it("Renames program from program edit button", async ({ page }) => {
      // create program first
      await createProgram(page);

      // Test rename program
      await page.locator("#edit-program-button").nth(0).click();

      const newProgramName = generateRandomString(12);
      await page.getByPlaceholder(/Squatober/i).fill(newProgramName);
      await page.getByRole("button", { name: /Save/i }).click();

      // Check first top programs section
      const programs = page.locator("#program");
      await expect(programs.nth(0)).toContainText(newProgramName);
    });

    it("Deletes program from program edit button", async ({ page }) => {
      // create program first
      const programName = await createProgram(page);

      // Test delete program
      await page.locator("#edit-program-button").nth(0).click();
      await page.getByRole("button", { name: /Delete/i }).click();

      // Check first top programs section
      const programs = page.locator("#program");
      await expect(programs).not.toContainText(programName);
    });
  });
});
