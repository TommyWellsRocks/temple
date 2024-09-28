import { test, expect } from "@playwright/test";
import { createDay, generateRandomString } from "../helpers";
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
      // ! THIS TEST FAILS A LOT
      await page.locator("#back-button").click();
      await page.waitForURL("http://localhost:3000/workout");

      expect(page.url()).toBe("http://localhost:3000/workout");
    });
  });

  describe("Tabs Section", () => {
    describe("Tab Header Section", () => {
      it("Renders week tabs, week edit buttons, and day add button", async ({
        page,
      }) => {
        const deleteWeekButton = page.locator("#delete-week-button");
        const weekTab = page.locator("#week-tab").last();
        const addWeekButton = page.locator("#add-week-button");
        const addDayButton = page.locator("#add-day-button");

        await expect(deleteWeekButton).toBeVisible();
        await expect(weekTab).toBeVisible();
        await expect(addWeekButton).toBeVisible();
        await expect(addDayButton).toBeVisible();
      });

      it("Opens add day popover, onClick of add button", async ({ page }) => {
        await page.locator("#add-day-button").click();

        const popoverText = page.getByText(/Create Day/i);
        const dayForm = page.getByPlaceholder(/Leg day/i);
        const formButton = page.getByRole("button", { name: /Create/i });

        expect(popoverText).toBeVisible();
        expect(dayForm).toBeVisible();
        expect(formButton).toBeVisible();
      });
    });

    describe("Tab Weeks And Days Integration", () => {
      it("Adds day to latest week from add day popover", async ({ page }) => {
        const dayName = await createDay(page);

        await page.locator("#week-tab").last().click();

        await expect(page.locator("#day", { hasText: dayName })).toBeVisible();
      });

      it("Shows days for week tab", async ({ page }) => {
        await page.locator("#week-tab").first().click();

        const testDay = page.locator("#day", { hasText: "TEST DAY" });
        await expect(testDay).toBeVisible();
        await expect(testDay.getByRole("link")).toHaveAttribute(
          "href",
          "/workout/26/138",
        );
      });

      it("Adds week with previous days to new week, onClick of add week button", async ({
        page,
      }) => {
        // ! THIS KEEPS ADDING WEEKS, SO PLEASE CLEANUP
        await page.locator("#add-week-button").click();
       
        await page.locator("#week-tab").last().click();
        const testDay = page.locator("#day", { hasText: "TEST DAY" });
      
        await expect(testDay).toBeVisible();
        await expect(testDay.getByRole("link")).not.toHaveAttribute(
          "href",
          "/workout/26/138",
        );
      });

      it("Removes week, onClick of delete week button", async ({ page }) => {
        // Add initial week
        await page.locator("#add-week-button").click();
        // Get current count
        const preWeekCount = await page.locator("#week-tab").count();
        // Delete Week
        await page.locator("#delete-week-button").click();
        page.on("dialog", async (dialog) => await dialog.accept());
        // Get now current week count
        const postWeekCount = await page.locator("#week-tab").count();

        expect(preWeekCount < postWeekCount);
      });
    });

    describe("Tab Days Section", () => {
      it("Renders popover for edit day button", async ({ page }) => {
        // create day first
        const dayName = await createDay(page);

        // Test edit button
        await page
          .locator("#day", { hasText: dayName })
          .locator("#edit-day-button")
          .click();

        const popoverText = page.getByText(/Edit Program Day/i);
        const dayForm = page.getByPlaceholder(/Leg day/i);
        const formButton = page.getByRole("button", { name: /Delete/i });

        expect(popoverText).toBeVisible();
        expect(dayForm).toBeVisible();
        expect(formButton).toBeVisible();
      });

      it("Renames day from edit day button", async ({ page }) => {
        // create day first
        const dayName = await createDay(page);

        // Test rename day
        await page
          .locator("#day", { hasText: dayName })
          .locator("#edit-day-button")
          .click();

        const newDayName = generateRandomString(12);
        await page.getByPlaceholder(/Leg day/i).fill(newDayName);
        await page.getByRole("button", { name: /Save/i }).click();

        // Check first top days section
        await expect(
          page.locator("#day", { hasText: newDayName }),
        ).toBeVisible();
      });

      it("Deletes day from edit day button", async ({ page }) => {
        // create day first
        const dayName = await createDay(page);

        // Test rename day
        await page
          .locator("#day", { hasText: dayName })
          .locator("#edit-day-button")
          .click();
        await page.getByRole("button", { name: /Delete/i }).click();

        // Check not exists
        await expect(page.getByText(dayName)).toHaveCount(0);
      });

      it("Navigates to day onClick", async ({ page }) => {
        // ! THIS TEST FAILS A LOT
        // Existing Program = 26. Day = 138. Name = "TEST DAY"
        await page.locator("#day", { hasText: "TEST DAY" }).click();
        
        await page.waitForURL("http://localhost:3000/workout/26/138");

        expect(page.url()).toBe("http://localhost:3000/workout/26/138");
      });
    });
  });
});
