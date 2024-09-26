import { test } from "@playwright/test";
const it = test;
const describe = test.describe;

const authFile = "playwright/.auth/user.json";

test("login", async ({ page }) => {
  await page.goto("http://localhost:3000/signin?return=%2Fworkout");

  const googleAuthButton = page.getByRole("button", {
    name: /Continue with Google/i,
  });
  await googleAuthButton.click();

  const emailInput = await page.waitForSelector('input[type="email"]');
  await emailInput.fill(process.env.TEST_EMAIL!);
  await page.click("#identifierNext");

  const passwordInput = await page.waitForSelector('input[type="password"]');
  await passwordInput.fill(process.env.TEST_EMAIL_PASSWORD!);
  await page.click("#passwordNext");

  await page.waitForURL("https://accounts.google.com/signin/oauth/**");
  await page.getByRole("button", { name: /Allow/i }).click();

  await page.waitForURL("http://localhost:3000/workout");

  await page.context().storageState({ path: authFile });
});
