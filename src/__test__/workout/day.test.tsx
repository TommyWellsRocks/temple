import { test, expect } from "@playwright/test";
import { addExercise, generateRandomString } from "../helpers";
const it = test;
const describe = test.describe;

// RENDER
// GET
// ACT
// ASSERT

describe("Workout/[Program]/[Day]", () => {
  test.beforeEach(
    async ({ page }) => await page.goto("http://localhost:3000/workout/26/138"),
  );

  describe("Nav Section", () => {
    it("Renders navigation with back button and edit button", async ({
      page,
    }) => {
      const backButton = page.locator("#back-button");
      const header = page.locator("#page-title");
      const editButton = page.locator("#edit-day-button");

      await expect(backButton).toBeVisible();
      await expect(header).toBeVisible();
      await expect(editButton).toBeVisible();
    });

    it("Renders edit day popover onClick of edit button", async ({ page }) => {
      await page.locator("#edit-day-button").click();

      const popoverText = page.getByText(/Edit Day/i);
      const dayForm = page.getByPlaceholder(/Leg day/i);
      const formButton = page.getByRole("button", { name: /Delete/i });

      expect(popoverText).toBeVisible();
      expect(dayForm).toBeVisible();
      expect(formButton).toBeVisible();
    });

    // ! THIS TEST FAILS A LOT
    it("Navigates to /workout/[Program] onClick of back button", async ({
      page,
    }) => {
      await page.locator("#back-button").click();
      await page.waitForURL("http://localhost:3000/workout/26");

      expect(page.url()).toBe("http://localhost:3000/workout/26");
    });
  });

  describe("Muscle Section", () => {
    it("Renders muscles section header and muscles list", async ({ page }) => {
      await expect(page.getByText(/Today's Focus/i)).toBeVisible();
      await expect(page.locator("#muscle-percent-focus")).toBeVisible();
    });
  });

  describe("Exercise Section", () => {
    it("Renders exercise section header with count and add button", async ({
      page,
    }) => {
      const exerciseCount = await page.locator("#exercise").count();
      const headerText =
        exerciseCount === 1 ? "1 Exercise" : `${exerciseCount} Exercises`;
      await expect(page.getByText(headerText)).toBeVisible();
      await expect(page.locator("#add-exercise-button")).toBeVisible();
    });

    it("Renders popover for exercise add button", async ({ page }) => {
      await page.locator("#add-exercise-button").click();

      const popoverText = page.getByText(/Add Exercise/i);
      const exerciseForm = page.getByPlaceholder(/Filter Exercises/i);
      const exerciseItem = page.locator("#exercise-option").first();
      const formButton = page.getByRole("button", { name: /Next/i });

      expect(popoverText).toBeVisible();
      expect(exerciseForm).toBeVisible();
      expect(exerciseItem).toBeVisible();
      expect(formButton).toBeVisible();
    });

    it("Adds exercise from add button", async ({ page }) => {
      const exerciseName = await addExercise(page);

      await expect(
        page.locator("#exercise", { hasText: exerciseName }),
      ).toBeVisible();
    });

    it("Creates and adds custom exercise from add button", async ({ page }) => {
      await page.locator("#add-exercise-button").click();
      // Get empty results
      await page.getByPlaceholder("Filter Exercises...").fill("  ");
      // Open custom form
      await page.locator("#add-custom-exercise-button").click();

      // Create exercise
      const customName = generateRandomString(12);
      await page.getByPlaceholder("Seated Preacher Curl").fill(customName);
      await page.getByRole("button", { name: /Create/i }).click();

      // Search and add custom exercise
      await page.getByPlaceholder("Filter Exercises...").fill(customName);
      const exercise = page.getByRole("row", { name: customName });
      await exercise.getByRole("checkbox").click();

      // Check added
      await expect(
        page.locator("#exercise", { hasText: customName }),
      ).toBeVisible();
    });

    it("Renders exercise edit button popover", async ({ page }) => {
      // Add exercise first
      const exerciseName = await addExercise(page);

      // Test edit button
      await page
        .locator("#exercise", { hasText: exerciseName })
        .locator("#edit-exercise-button")
        .click();

      const popoverText = page.getByText(/Edit Exercise/i);
      const exerciseForm = page.getByPlaceholder(exerciseName);
      const formButton = page.getByRole("button", { name: /Delete/i });

      expect(popoverText).toBeVisible();
      expect(exerciseForm).toBeVisible();
      expect(formButton).toBeVisible();
    });

    it("Renames exercise from exercise edit button", async ({ page }) => {
      // create exercise first
      const exerciseName = await addExercise(page);

      // Test rename exercise
      await page
        .locator("#exercise", { hasText: exerciseName })
        .locator("#edit-exercise-button")
        .click();

      const newExerciseName = generateRandomString(12);
      await page.getByPlaceholder(exerciseName).fill(newExerciseName);
      const saveButton = page.getByRole("button", { name: /Save/i });
      await saveButton.click();

      // Check exercises section
      await expect(
        page.locator("#exercise", { hasText: newExerciseName }),
      ).toBeVisible();

      // Change it back
      await page.getByPlaceholder(exerciseName).fill("");
      await saveButton.click();
    });

    it("Deletes exercise from exercise edit button", async ({ page }) => {
      // create exercise first
      const exerciseName = await addExercise(page);

      // Test rename exercise
      await page
        .locator("#exercise", { hasText: exerciseName })
        .locator("#edit-exercise-button")
        .click();
      await page.getByRole("button", { name: /Delete/i }).click();

      // Check not exists
      await expect(page.getByText(exerciseName)).toHaveCount(0);
    });

    // ! THIS TEST FAILS A LOT
    it("Navigates to exercise onClick", async ({ page }) => {
      await page.locator("#day", { hasText: "Dumbbell Skullcrusher" }).click();
      await page.waitForURL("http://localhost:3000/workout/26/138/835");
      expect(page.url()).toBe("http://localhost:3000/workout/26/138/835");
    });
  });

  describe("Action Buttons", () => {
    // ! NEED TO SET UN-STARTED IN DB
    it("Renders, Starts, and Ends workout", async ({ page }) => {
      await page.locator("#start-workout-button").click();
      await page.locator("#end-workout-button").click();
      await page.getByRole("button", { name: /Log Workout/i }).click();
      
      await expect(page.locator("#start-workout-button")).toHaveCount(0)
      await expect(page.locator("#end-workout-button")).toHaveCount(0)
    });
  });
});
