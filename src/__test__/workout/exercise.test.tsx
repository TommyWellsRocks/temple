import { test, expect } from "@playwright/test";
const it = test;
const describe = test.describe;

// RENDER
// GET
// ACT
// ASSERT

describe("Workout/[Program]/[Day]/[Exercise]", () => {
  test.beforeEach(
    async ({ page }) =>
      await page.goto("http://localhost:3000/workout/26/138/835"),
  );

  describe("Nav Section", () => {
    it("Renders navigation with back button and edit button", async ({
      page,
    }) => {
      const backButton = page.locator("#back-button");
      const header = page.locator("#page-title");
      const editButton = page.locator("#edit-exercise-button");

      await expect(backButton).toBeVisible();
      await expect(header).toBeVisible();
      await expect(editButton).toBeVisible();
    });

    it("Renders edit day popover onClick of edit button", async ({ page }) => {
      await page.locator("#edit-exercise-button").click();

      const popoverText = page.getByText(/Edit Exercise/i);
      const dayForm = page.getByPlaceholder(/Dumbbell Skullcrusher/i);
      const formButton = page.getByRole("button", { name: /Delete/i });

      expect(popoverText).toBeVisible();
      expect(dayForm).toBeVisible();
      expect(formButton).toBeVisible();
    });

    // ! THIS TEST FAILS A LOT
    it("Navigates to /workout/[Program]/[Day] onClick of back button", async ({
      page,
    }) => {
      await page.locator("#back-button").click();
      await page.waitForURL("http://localhost:3000/workout/26/138");

      expect(page.url()).toBe("http://localhost:3000/workout/26/138");
    });
  });

  describe("Sets Section", () => {
    it("Renders sets and edit set buttons", async ({ page }) => {
      await expect(page.locator("#set-row").first()).toBeVisible();
      await expect(page.locator("#add-set-button")).toBeVisible();
      await expect(page.locator("#delete-set-button")).toBeVisible();
    });

    it("Adds and deletes sets with set buttons", async ({ page }) => {
      const getSetCount = async () => await page.locator("#set-row").count();

      const initialCount = await getSetCount();
      await page.locator("#delete-set-button").click();
      const newCount = await getSetCount();
      expect(newCount === initialCount - 1);

      await page.locator("#add-set-button").click();
      expect(newCount + 1 === (await getSetCount()));
    });

    it("Changes following set values with input Change", async ({ page }) => {
      const firstSet = page.locator("#set-row").first();
      const firstReps = firstSet.locator("input").first();
      const firstWeight = firstSet.locator("input").last();
      const lastSet = page.locator("#set-row").last();
      const lastReps = lastSet.locator("input").first();
      const lastWeight = lastSet.locator("input").last();

      await firstReps.fill("3");
      await firstReps.blur();
      expect((await firstReps.inputValue()) === (await lastReps.inputValue()));

      await firstWeight.fill("5");
      await firstWeight.blur();
      expect(
        (await firstWeight.inputValue()) === (await lastWeight.inputValue()),
      );
    });
  });

  describe("About Exercise Section", () => {
    it("Renders notes tab, and updates on save", async ({ page }) => {
      const noteContent = "THIS IS A TEST NOTE.";
      const noteArea = page.locator("#notes");
      await noteArea.fill(noteContent);
      await page.getByRole("button", { name: /Save/i }).click();

      expect((await noteArea.inputValue()) === noteContent);
      expect(page.getByRole("button", { name: /Save/i })).toHaveCount(0);
    });

    it("Renders info tab, and searches Google and YouTube onClick", async ({
      page,
    }) => {
      await page.locator("#info-tab").click();
      await expect(
        page.getByRole("link", { name: /Search YouTube/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: /Search Google/i }),
      ).toBeVisible();
    });

    it("Renders muscle tab", async ({ page }) => {
      await page.locator("#muscles-tab").click();
      expect(page.locator("#muscles")).toHaveText(/Primary Muscle:/i);
    });

    it("Renders history tab", async ({ page }) => {
      await page.locator("#history-tab").click();
      await expect(page.locator("#history")).toBeVisible();
    });
  });

  describe("Action Buttons", () => {
    it("Renders log buttons and logs sets.", async ({ page }) => {
      // INIT BY DELETING ALL SETS AND ADDING BACK 4
      while (await page.locator("#set-row").count()) {
        await page.locator("#delete-set-button").click();
      }
      for (let i = 0; i < 4; i++) {
        await page.locator("#add-set-button").click();
      }

      const PRIMARY_COLOR = "rgb(102, 56, 254)";
      const firstSet = page.locator("#set-count").nth(0);
      const secondSet = page.locator("#set-count").nth(1);
      const lastSet = page.locator("#set-count").last();

      await page.locator("#log-set-button").click();
      expect(firstSet).not.toHaveCSS("background-color", PRIMARY_COLOR);
      expect(secondSet).toHaveCSS("background-color", PRIMARY_COLOR);
      expect(lastSet).toHaveCSS("background-color", PRIMARY_COLOR);

      await page.locator("#log-all-button").click();
      expect(firstSet).not.toHaveCSS("background-color", PRIMARY_COLOR);
      expect(secondSet).not.toHaveCSS("background-color", PRIMARY_COLOR);
      expect(lastSet).not.toHaveCSS("background-color", PRIMARY_COLOR);
    });

    // ! THIS TEST FAILS A LOT
    it("Navigates to day page onClick of done button", async ({ page }) => {
      // Log All Sets If Possible
      if ((await page.locator("#log-all-button").count()) === 1)
        await page.locator("#log-all-button").click();
      
      await page.locator("#done-button").click();
      await page.waitForURL("http://localhost:3000/workout/26/138");

      await expect(page).toHaveURL("http://localhost:3000/workout/26/138");
    });
  });
});
